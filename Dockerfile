# Multi-stage Dockerfile for JunaiKey
# This is a placeholder - replace with your actual application build

# Build stage (placeholder for when you have an actual app)
FROM node:18-alpine AS builder

# Uncomment and customize when you have an actual application
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production

# Production stage
FROM nginx:alpine

# Copy static files and configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/html /usr/share/nginx/html

# Add health check endpoint as JSON
RUN mkdir -p /usr/share/nginx/html/health && \
    echo '{"status": "healthy", "service": "junaikey", "version": "1.0.0"}' > /usr/share/nginx/html/health/index.html

# Create non-root user for security
RUN addgroup -g 101 -S nginx && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Labels for better container management
LABEL maintainer="JunaiKey Team"
LABEL description="JunaiKey - AI Key Management & Deployment System"
LABEL version="1.0.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]