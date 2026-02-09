# Phase 7: Deployment

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Deploy the FinTracker application to production environments with proper DevOps practices, monitoring, and maintenance procedures.

**Estimated Duration:** 1 week

---

## 7.1 Backend Deployment

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Environment variables documented

### Choose Hosting Provider

**Recommended Options:**
- **Laravel Forge** - Managed Laravel hosting (easiest)
- **DigitalOcean** - VPS with manual setup
- **AWS EC2** - Scalable cloud hosting
- **Heroku** - Quick deployment (hobby projects)

### Server Setup (for VPS/EC2)

#### Server Requirements
- **OS:** Ubuntu 22.04 LTS
- **PHP:** 8.2+
- **Web Server:** Nginx
- **Database:** MySQL 8.0+ or PostgreSQL 13+
- **Cache:** Redis 6.0+
- **Memory:** Minimum 1GB RAM (2GB+ recommended)

#### Initial Server Configuration
- [ ] Create server instance
- [ ] Set up SSH keys
- [ ] Configure firewall (UFW)
  ```bash
  sudo ufw allow 22     # SSH
  sudo ufw allow 80     # HTTP
  sudo ufw allow 443    # HTTPS
  sudo ufw enable
  ```
- [ ] Update system packages
  ```bash
  sudo apt update
  sudo apt upgrade -y
  ```

#### Install Required Software
- [ ] Install Nginx
  ```bash
  sudo apt install nginx -y
  ```
- [ ] Install PHP 8.2 and extensions
  ```bash
  sudo apt install php8.2-fpm php8.2-cli php8.2-mysql php8.2-pgsql \
    php8.2-redis php8.2-mbstring php8.2-xml php8.2-bcmath \
    php8.2-curl php8.2-zip php8.2-gd -y
  ```
- [ ] Install Composer
  ```bash
  curl -sS https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer
  ```
- [ ] Install MySQL or PostgreSQL
- [ ] Install Redis
  ```bash
  sudo apt install redis-server -y
  sudo systemctl enable redis-server
  ```
- [ ] Install Node.js (for asset compilation)
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install nodejs -y
  ```

### Application Deployment

#### Clone Repository
- [ ] Set up SSH key for GitHub
- [ ] Clone repository to server
  ```bash
  cd /var/www
  sudo git clone git@github.com:username/fintracker-backend.git
  sudo chown -R www-data:www-data fintracker-backend
  ```

#### Install Dependencies
- [ ] Install PHP dependencies
  ```bash
  cd /var/www/fintracker-backend
  composer install --optimize-autoloader --no-dev
  ```
- [ ] Install Node dependencies (if needed for asset compilation)
  ```bash
  npm ci --production
  ```

#### Configure Environment
- [ ] Create `.env` file from `.env.example`
- [ ] Set production environment variables:
  ```bash
  APP_ENV=production
  APP_DEBUG=false
  APP_URL=https://yourdomain.com
  
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_DATABASE=fintracker
  DB_USERNAME=your_db_user
  DB_PASSWORD=strong_password
  
  REDIS_HOST=127.0.0.1
  CACHE_DRIVER=redis
  SESSION_DRIVER=redis
  QUEUE_CONNECTION=redis
  ```
- [ ] Generate application key
  ```bash
  php artisan key:generate
  ```

#### Database Setup
- [ ] Create production database
  ```sql
  CREATE DATABASE fintracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER 'fintracker_user'@'localhost' IDENTIFIED BY 'strong_password';
  GRANT ALL PRIVILEGES ON fintracker.* TO 'fintracker_user'@'localhost';
  FLUSH PRIVILEGES;
  ```
- [ ] Run migrations
  ```bash
  php artisan migrate --force
  ```
- [ ] Seed initial data
  ```bash
  php artisan db:seed --class=CategorySeeder --force
  ```

#### Optimize Application
- [ ] Cache configuration
  ```bash
  php artisan config:cache
  ```
- [ ] Cache routes
  ```bash
  php artisan route:cache
  ```
- [ ] Cache views
  ```bash
  php artisan view:cache
  ```
- [ ] Optimize autoloader
  ```bash
  composer dump-autoload --optimize
  ```

#### Configure Nginx
- [ ] Create Nginx configuration
  ```nginx
  server {
      listen 80;
      server_name api.yourdomain.com;
      root /var/www/fintracker-backend/public;
  
      add_header X-Frame-Options "SAMEORIGIN";
      add_header X-Content-Type-Options "nosniff";
  
      index index.php;
  
      charset utf-8;
  
      location / {
          try_files $uri $uri/ /index.php?$query_string;
      }
  
      location = /favicon.ico { access_log off; log_not_found off; }
      location = /robots.txt  { access_log off; log_not_found off; }
  
      error_page 404 /index.php;
  
      location ~ \.php$ {
          fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
          fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
          include fastcgi_params;
      }
  
      location ~ /\.(?!well-known).* {
          deny all;
      }
  }
  ```
- [ ] Enable site configuration
  ```bash
  sudo ln -s /etc/nginx/sites-available/fintracker-api /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
  ```

#### Set Up SSL/HTTPS
- [ ] Install Certbot
  ```bash
  sudo apt install certbot python3-certbot-nginx -y
  ```
- [ ] Obtain SSL certificate
  ```bash
  sudo certbot --nginx -d api.yourdomain.com
  ```
- [ ] Set up auto-renewal
  ```bash
  sudo certbot renew --dry-run
  ```

#### Configure Queue Workers
- [ ] Create supervisor configuration
  ```ini
  [program:fintracker-worker]
  process_name=%(program_name)s_%(process_num)02d
  command=php /var/www/fintracker-backend/artisan queue:work redis --sleep=3 --tries=3
  autostart=true
  autorestart=true
  user=www-data
  numprocs=2
  redirect_stderr=true
  stdout_logfile=/var/www/fintracker-backend/storage/logs/worker.log
  ```
- [ ] Start supervisor
  ```bash
  sudo supervisorctl reread
  sudo supervisorctl update
  sudo supervisorctl start fintracker-worker:*
  ```

#### Configure Scheduled Tasks
- [ ] Set up cron job for Laravel scheduler
  ```bash
  sudo crontab -e -u www-data
  ```
  Add:
  ```
  * * * * * cd /var/www/fintracker-backend && php artisan schedule:run >> /dev/null 2>&1
  ```

### Monitoring & Logging

#### Laravel Telescope (Development/Staging Only)
- [ ] Disable Telescope in production (or protect with auth)
- [ ] Configure Telescope to prune old entries

#### Application Logging
- [ ] Configure log channels in `config/logging.php`
- [ ] Set up log rotation
- [ ] Monitor error logs

#### Server Monitoring
- [ ] Set up server monitoring (DigitalOcean Monitoring, AWS CloudWatch, etc.)
- [ ] Monitor CPU, memory, disk usage
- [ ] Set up alerts for high resource usage

#### Error Tracking
- [ ] Install Sentry (optional)
  ```bash
  composer require sentry/sentry-laravel
  ```
- [ ] Configure Sentry DSN in `.env`
- [ ] Test error reporting

### Backup Strategy

#### Database Backups
- [ ] Set up automated daily backups
- [ ] Store backups off-site (S3, BackBlaze)
- [ ] Test backup restoration
- [ ] Create backup script:
  ```bash
  #!/bin/bash
  mysqldump -u username -p password fintracker > backup-$(date +%Y%m%d).sql
  ```
- [ ] Add to cron for daily execution

#### Code Backups
- [ ] Ensure code is in Git (already done)
- [ ] Tag releases
- [ ] Keep backup of `.env` file securely

---

## 7.2 Frontend Deployment

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] API endpoints updated for production

### Choose Hosting Provider

**Recommended Options:**
- **Vercel** - Best for React/Vite (recommended)
- **Netlify** - Alternative, also excellent
- **AWS S3 + CloudFront** - For custom infrastructure
- **DigitalOcean App Platform** - Managed platform

### Build Configuration

#### Update Environment Variables
- [ ] Create `.env.production` file
  ```bash
  VITE_API_BASE_URL=https://api.yourdomain.com/api
  VITE_APP_NAME=FinTracker
  ```

#### Build Production Bundle
- [ ] Run production build
  ```bash
  npm run build
  ```
- [ ] Verify build output in `dist/` folder
- [ ] Test build locally:
  ```bash
  npm run preview
  ```

### Deployment to Vercel

#### Initial Setup
- [ ] Install Vercel CLI
  ```bash
  npm install -g vercel
  ```
- [ ] Link project
  ```bash
  vercel link
  ```

#### Configure Vercel
- [ ] Create `vercel.json` configuration
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
  ```

#### Deploy
- [ ] Deploy to production
  ```bash
  vercel --prod
  ```
- [ ] Configure custom domain
- [ ] Verify deployment
- [ ] Test all functionality

### Deployment to Netlify

#### Initial Setup
- [ ] Install Netlify CLI
  ```bash
  npm install -g netlify-cli
  ```
- [ ] Login to Netlify
  ```bash
  netlify login
  ```

#### Configure Netlify
- [ ] Create `netlify.toml`
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  
  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-XSS-Protection = "1; mode=block"
      X-Content-Type-Options = "nosniff"
  ```

#### Deploy
- [ ] Initialize Netlify
  ```bash
  netlify init
  ```
- [ ] Deploy
  ```bash
  netlify deploy --prod
  ```
- [ ] Configure custom domain
- [ ] Enable HTTPS

### CDN Configuration
- [ ] Configure CDN for static assets
- [ ] Set cache headers for assets
- [ ] Enable compression (gzip/brotli)

### Security Headers
- [ ] Configure Content Security Policy (CSP)
- [ ] Set X-Frame-Options
- [ ] Set X-Content-Type-Options
- [ ] Enable HTTPS enforcement

---

## 7.3 DevOps & CI/CD

### GitHub Actions Workflows

#### Backend CI/CD
**File:** `.github/workflows/backend-deploy.yml`

```yaml
name: Backend Deploy

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.2
      - name: Install Dependencies
        run: |
          cd backend
          composer install
      - name: Run Tests
        run: |
          cd backend
          php artisan test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/fintracker-backend
            git pull origin main
            composer install --no-dev --optimize-autoloader
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            sudo systemctl reload php8.2-fpm
```

#### Frontend CI/CD
**File:** `.github/workflows/frontend-deploy.yml`

```yaml
name: Frontend Deploy

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: |
          cd frontend
          npm ci
      - name: Run Tests
        run: |
          cd frontend
          npm test
      - name: Build
        run: |
          cd frontend
          npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Tasks:**
- [ ] Create workflow files
- [ ] Configure secrets in GitHub
- [ ] Test automated deployments
- [ ] Set up deployment notifications

### Environment Management
- [ ] Set up staging environment
- [ ] Configure environment-specific variables
- [ ] Test staging before production
- [ ] Implement blue-green deployments (optional)

### Database Migration Strategy
- [ ] Always backup before migrations
- [ ] Test migrations on staging first
- [ ] Run migrations as part of deployment
- [ ] Have rollback plan ready

---

## 7.4 Domain & DNS Configuration

### Domain Setup
- [ ] Purchase domain (if needed)
- [ ] Configure DNS records:
  ```
  A     @               -> Frontend IP (or CNAME to Vercel)
  CNAME api             -> Backend server IP
  CNAME www             -> Frontend (redirect to apex)
  ```
- [ ] Wait for DNS propagation (up to 48 hours)

### SSL Certificates
- [ ] Configure SSL for backend (Certbot)
- [ ] Configure SSL for frontend (automatic with Vercel/Netlify)
- [ ] Enforce HTTPS redirect
- [ ] Test SSL configuration (SSL Labs)

---

## 7.5 Post-Deployment

### Health Checks
- [ ] Set up endpoint health checks
- [ ] Monitor uptime (UptimeRobot, Pingdom)
- [ ] Set up alerts for downtime

### Performance Monitoring
- [ ] Monitor API response times
- [ ] Monitor page load times
- [ ] Track Core Web Vitals
- [ ] Set up performance budgets

### User Monitoring
- [ ] Set up Google Analytics or alternative
- [ ] Track user flows
- [ ] Monitor error rates
- [ ] Collect user feedback

### Documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document rollback procedures
- [ ] Update README with production URLs

---

## 🎯 Phase 7 Completion Criteria

- ✅ Backend deployed and accessible
- ✅ Frontend deployed and accessible
- ✅ Database configured and migrated
- ✅ SSL certificates installed
- ✅ Domain configured correctly
- ✅ Queue workers running
- ✅ Scheduled tasks configured
- ✅ Backups automated
- ✅ Monitoring and logging set up
- ✅ CI/CD pipeline functional
- ✅ Health checks passing
- ✅ Performance targets met
- ✅ Documentation complete

---

[← Previous: Phase 6 Testing](08-phase6-testing.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 8 Enhancements →](10-phase8-enhancements.md)
