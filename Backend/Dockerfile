FROM php:8.0-apache

# Install dependencies
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy application source
COPY src/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html/ 

# Expose port 80
EXPOSE 80