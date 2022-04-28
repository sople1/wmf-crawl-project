#!/bin/sh

cd /opt/app
composer install
/usr/bin/php -S 0.0.0.0:8000 -t public