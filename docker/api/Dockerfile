FROM phpdockerio/php:8.1-fpm
WORKDIR "/opt/app"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Update apt list, Install selected extensions and other stuff
RUN apt-get update; \
    apt-get -y --no-install-recommends install \
    git \ 
    php8.1-bcmath \ 
    php8.1-gd \ 
    php8.1-imagick \ 
    php8.1-mysql \ 
    php8.1-redis \ 
    php8.1-soap \ 
    php8.1-xdebug

# Install git
RUN apt-get -y install git

# Prune apt list
RUN apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# TimeZone 설정
ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

VOLUME [ "/opt/app" ]

ENTRYPOINT [ "/bin/sh", "/tmp/entrypoint.sh" ]
# CMD ["php", "-S" "0.0.0.0:8000", "-t", "public" ]