# Database Setup Guide

## Issue: Connection Timeout Error

If you're seeing `connect ETIMEDOUT` errors, it means the application cannot reach the PostgreSQL database.

## Quick Solution: Local PostgreSQL with Docker

The easiest way to get started is using Docker:

```bash
# Start PostgreSQL container
docker run --name fond-postgres \
  -e POSTGRES_DB=fond_shnau \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

Your `.env` file is already configured for localhost by default.

## Alternative: Local PostgreSQL Installation

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Install and set password for `postgres` user
3. Create database: `CREATE DATABASE fond_shnau;`

### macOS (with Homebrew)
```bash
brew install postgresql@16
brew services start postgresql@16
createdb fond_shnau
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb fond_shnau
```

## Configuration

Database settings are in `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fond_shnau
DB_USER=postgres
DB_PASSWORD=postgres
DB_SSL=false
```

## Remote Database Connection

If you need to connect to the remote database at `155.212.216.148`:

1. **Verify server is reachable:**
   ```bash
   # Test connection (should respond in <1 second if reachable)
   telnet 155.212.216.148 5432
   # or
   nc -zv 155.212.216.148 5432
   ```

2. **Check with database administrator:**
   - Is the server running?
   - Is your IP whitelisted in firewall?
   - Is your IP allowed in `pg_hba.conf`?
   - Are the credentials correct?

3. **Update `.env` file:**
   ```env
   DB_HOST=155.212.216.148
   DB_PORT=5432
   DB_NAME=fond_shnau
   DB_USER=my_user
   DB_PASSWORD=123456
   DB_SSL=false  # or true if SSL is required
   ```

## Initialize Database Tables

Once connected, run migrations to create tables:

```bash
# This will be implemented in the next step
npm run db:init
```

## Troubleshooting

### Error: `ETIMEDOUT`
- Database server is not reachable
- Check network/firewall settings
- Verify the server IP and port are correct

### Error: `ECONNREFUSED`
- PostgreSQL is not running on the target host
- Check if the service is started
- Verify the port number (default: 5432)

### Error: `password authentication failed`
- Username or password is incorrect
- Check your `.env` file credentials

### Error: `database "fond_shnau" does not exist`
- Create the database first:
  ```sql
  CREATE DATABASE fond_shnau;
  ```

## Next Steps

After setting up the database:
1. Restart your dev server: `npm run dev`
2. The application will automatically create tables on first connection
3. You can migrate data from JSON files if needed
