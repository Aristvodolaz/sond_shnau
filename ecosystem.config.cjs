module.exports = {
  apps: [
    {
      name: 'fond-schnauzers',
      // Path to the built Nuxt server after running 'npm run build'
      script: './.output/server/index.mjs',
      
      // Cluster mode for better performance
      instances: 'max',
      exec_mode: 'cluster',
      
      // Environment variables
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      },
      
      // Auto restart configuration
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      
      // Advanced features
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
