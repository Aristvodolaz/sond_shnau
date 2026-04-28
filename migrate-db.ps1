<#
.SYNOPSIS
Скрипт для полной миграции базы данных PostgreSQL на другой сервер.

.DESCRIPTION
Скрипт экспортирует данные из исходной базы (по умолчанию локальной)
и импортирует их на новый (целевой) сервер.

Инструкция:
1. Заполните данные целевого сервера (TARGET_*) ниже.
2. Проверьте данные исходного сервера (SOURCE_*).
3. Запустите скрипт: .\migrate-db.ps1
#>

$ErrorActionPreference = "Stop"

# ==========================================
# 1. НАСТРОЙКИ ИСХОДНОГО СЕРВЕРА (ОТКУДА)
# ==========================================
$SOURCE_HOST = "127.0.0.1"
$SOURCE_PORT = "5432"
$SOURCE_DB   = "fond_shnau"
$SOURCE_USER = "postgres"
$SOURCE_PASS = "postgres"

# ==========================================
# 2. НАСТРОЙКИ ЦЕЛЕВОГО СЕРВЕРА (КУДА)
# ==========================================
$TARGET_HOST = "IP_АДРЕС_ИЛИ_ДОМЕН_НОВОГО_СЕРВЕРА" # <-- ВПИШИТЕ IP НОВОГО СЕРВЕРА
$TARGET_PORT = "5432"
$TARGET_DB   = "fond_shnau"
$TARGET_USER = "postgres"                # <-- ВПИШИТЕ ИМЯ ПОЛЬЗОВАТЕЛЯ НА НОВОМ СЕРВЕРЕ
$TARGET_PASS = "ПАРОЛЬ_ОТ_НОВОГО_СЕРВЕРА" # <-- ВПИШИТЕ ПАРОЛЬ ОТ НОВОГО СЕРВЕРА

# Папка для сохранения резервных копий
$WORK_DIR = ".\pg-migration-backups"

# ==========================================
# ЗАЩИТА ОТ СЛУЧАЙНОГО ЗАПУСКА
# ==========================================
if ($TARGET_HOST -eq "IP_АДРЕС_ИЛИ_ДОМЕН_НОВОГО_СЕРВЕРА" -or $TARGET_PASS -eq "ПАРОЛЬ_ОТ_НОВОГО_СЕРВЕРА") {
    Write-Host "ОШИБКА: Вы не указали данные целевого сервера!" -ForegroundColor Red
    Write-Host "Откройте файл migrate-db.ps1 в редакторе и заполните переменные `$TARGET_HOST, `$TARGET_USER и `$TARGET_PASS." -ForegroundColor Yellow
    exit 1
}

# ==========================================
# ФУНКЦИИ
# ==========================================
function Test-CommandExists {
    param([string]$CommandName)
    if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
        Write-Host "ОШИБКА: Не найдена утилита '$CommandName'." -ForegroundColor Red
        Write-Host "Убедитесь, что PostgreSQL установлен и его папка bin (например, C:\Program Files\PostgreSQL\16\bin) добавлена в системную переменную PATH." -ForegroundColor Yellow
        exit 1
    }
}

function Invoke-PgCommand {
    param(
        [string]$Executable,
        [string[]]$Arguments,
        [string]$Password
    )
    $old = $env:PGPASSWORD
    try {
        $env:PGPASSWORD = $Password
        & $Executable @Arguments
        if ($LASTEXITCODE -ne 0) {
            throw "Команда завершилась с ошибкой: $Executable $($Arguments -join ' ')"
        }
    }
    finally {
        $env:PGPASSWORD = $old
    }
}

# Проверка наличия утилит
Write-Host "== Проверка необходимых утилит PostgreSQL ==" -ForegroundColor Cyan
Test-CommandExists "psql"
Test-CommandExists "pg_dump"
Test-CommandExists "pg_dumpall"
Test-CommandExists "pg_restore"

# Создание папки для дампов
if (-not (Test-Path $WORK_DIR)) {
    New-Item -ItemType Directory -Force -Path $WORK_DIR | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$globalsFile = Join-Path $WORK_DIR "globals_$timestamp.sql"
$dbDumpFile = Join-Path $WORK_DIR "db_$($SOURCE_DB)_$timestamp.dump"

try {
    Write-Host "`n[1/4] Экспорт ролей и пользователей с исходного сервера..." -ForegroundColor Cyan
    Invoke-PgCommand -Executable "pg_dumpall" -Password $SOURCE_PASS -Arguments @(
        "-h", $SOURCE_HOST, "-p", $SOURCE_PORT, "-U", $SOURCE_USER,
        "--globals-only",
        "-f", $globalsFile
    )
    Write-Host "Успешно: $globalsFile" -ForegroundColor Green

    Write-Host "`n[2/4] Экспорт базы данных '$SOURCE_DB' с исходного сервера..." -ForegroundColor Cyan
    Invoke-PgCommand -Executable "pg_dump" -Password $SOURCE_PASS -Arguments @(
        "-h", $SOURCE_HOST, "-p", $SOURCE_PORT, "-U", $SOURCE_USER,
        "-d", $SOURCE_DB,
        "--format=custom",
        "--blobs",
        "-f", $dbDumpFile
    )
    Write-Host "Успешно: $dbDumpFile" -ForegroundColor Green

    Write-Host "`n[3/4] Восстановление ролей на целевом сервере..." -ForegroundColor Cyan
    Invoke-PgCommand -Executable "psql" -Password $TARGET_PASS -Arguments @(
        "-h", $TARGET_HOST, "-p", $TARGET_PORT, "-U", $TARGET_USER,
        "-d", "postgres",
        "-f", $globalsFile
    )
    Write-Host "Успешно." -ForegroundColor Green

    Write-Host "`n[4/4] Восстановление данных в базу '$TARGET_DB' на целевом сервере..." -ForegroundColor Cyan
    # Создаем базу, если её нет (ошибки игнорируем, если уже есть)
    $createDbSql = "SELECT 'CREATE DATABASE $TARGET_DB' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$TARGET_DB')\gexec"
    Invoke-PgCommand -Executable "psql" -Password $TARGET_PASS -Arguments @(
        "-h", $TARGET_HOST, "-p", $TARGET_PORT, "-U", $TARGET_USER,
        "-d", "postgres",
        "-c", $createDbSql
    )

    Invoke-PgCommand -Executable "pg_restore" -Password $TARGET_PASS -Arguments @(
        "-h", $TARGET_HOST, "-p", $TARGET_PORT, "-U", $TARGET_USER,
        "-d", $TARGET_DB,
        "--clean",       # Очистить объекты перед созданием
        "--if-exists",   # Не выдавать ошибки при очистке несуществующих объектов
        "--no-owner",    # Игнорировать изначальных владельцев
        "--jobs=4",      # В 4 потока для скорости
        $dbDumpFile
    )
    Write-Host "Успешно." -ForegroundColor Green

    Write-Host "`n== МИГРАЦИЯ УСПЕШНО ЗАВЕРШЕНА! ==" -ForegroundColor Magenta
    Write-Host "Теперь вы можете поменять доступы к БД в вашем .env файле на новые." -ForegroundColor Yellow
}
catch {
    Write-Host "`n[ОШИБКА] Произошла ошибка во время миграции:`n$($_)" -ForegroundColor Red
    exit 1
}
