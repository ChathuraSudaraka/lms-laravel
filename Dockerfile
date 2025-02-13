# Build stage for PHP dependencies
FROM composer:latest AS composer-build

WORKDIR /app
COPY composer.* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize

# Build stage for Node.js frontend
FROM node:20 AS node-build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
COPY --from=composer-build /app/vendor ./vendor
RUN npm run build

# Production stage
FROM php:8.2-apache

# Install PHP extensions and other dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# Copy application files
WORKDIR /var/www/html
COPY --chown=www-data:www-data . .
COPY --from=composer-build --chown=www-data:www-data /app/vendor ./vendor
COPY --from=node-build --chown=www-data:www-data /app/public/build ./public/build

# Set permissions
RUN chmod -R 775 storage bootstrap/cache

# Copy environment file
COPY .env.example .env

# Generate application key
RUN php artisan key:generate

# run migrate to create sqlitedb
RUN php artisan migrate --force

# Set production environment
ENV APP_ENV=production
ENV APP_DEBUG=false

# Expose port 80
EXPOSE 80