FROM nginx:alpine

# Copy Default Configs
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

WORKDIR /var/www/html

EXPOSE 80 443