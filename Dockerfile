FROM httpd:latest

# Copy custom files into the image
COPY ./dist/docker-website /usr/local/apache2/htdocs/

# Optionally, copy additional configuration files
#COPY ./my-config.conf /usr/local/apache2/conf/

# Expose port 80 (default HTTP port)
EXPOSE 80