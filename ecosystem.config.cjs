const fs = require('fs')
const path = require('path')

/**
 * Load .env from project root so PM2 picks up S3_*, DB_*, etc.
 * Values from .env override defaults below.
 */
function loadDotEnv(filePath) {
  const out = {}
  if (!fs.existsSync(filePath)) return out
  let txt = fs.readFileSync(filePath, 'utf8')
  // UTF-8 BOM breaks first key name if file was saved from Windows editors
  if (txt.charCodeAt(0) === 0xfeff) {
    txt = txt.slice(1)
  }
  for (const line of txt.split(/\r?\n/)) {
    const s = line.trim()
    if (!s || s.startsWith('#')) continue
    const eq = s.indexOf('=')
    if (eq <= 0) continue
    const key = s.slice(0, eq).trim().replace(/\r/g, '')
    let val = s.slice(eq + 1).trim().replace(/\r/g, '')
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

const root = __dirname
const fileEnv = loadDotEnv(path.join(root, '.env'))

const defaults = {
  NODE_ENV: 'production',
  PORT: 3000,
  HOST: '0.0.0.0',
  RSS_FEED_URL: 'https://pet-help.ru/forum/feed.php?mode=topics_active',
}

/** Fallback if .env is missing (prefer setting everything in .env on the server) */
const legacyFallback = {
  ADMIN_USERNAME: 'fond_admin',
  ADMIN_PASSWORD: 'Schnauzer2026!SecurePass',
  DB_HOST: '155.212.216.148',
  DB_PORT: '5432',
  DB_NAME: 'fond_shnau',
  DB_USER: 'my_user',
  DB_PASSWORD: '123456',
  DB_SSL: 'false',
}

// PM2 applies env_production only with: pm2 start ecosystem.config.cjs --env production
// Without --env production, only `env` is used — duplicate merged vars so S3_* always load.
const mergedEnv = { ...defaults, ...legacyFallback, ...fileEnv }

module.exports = {
  apps: [
    {
      name: 'fond-schnauzers',
      cwd: root,
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',

      env: mergedEnv,
      env_production: mergedEnv,

      autorestart: true,
      watch: false,
      max_memory_restart: '1G',

      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,

      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,

      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
