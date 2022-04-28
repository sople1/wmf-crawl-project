FROM phpdockerio/php80-fpm:latest
WORKDIR "/opt/app"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Update apt list
RUN echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu focal main" > /etc/apt/sources.list.d/ondrej-php.list \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4F4EA0AAE5267A6C \
    && apt-get update

# Install selected extensions and other stuff
RUN apt-get -y --no-install-recommends install php8.0-mysql php8.0-redis php8.0-xdebug php8.0-gd php8.0-imagick php8.0-soap php8.0-bcmath

# Install git
RUN apt-get -y install git

# Prune apt list
RUN apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# TimeZone 설정
ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# ENTRYPOINT [ "/bin/sh", "/tmp/entrypoint.sh" ]
CMD ["/usr/sbin/php", "-S" "0.0.0.0:8000", "-t", "public" ]