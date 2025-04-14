#!/bin/sh

# Instalar dependencias si no existen
if [ ! -d "vendor" ]; then
    composer install
fi

sleep 3

# Generar la clave de Laravel
php artisan key:generate

php artisan migrate:fresh --seed

# Iniciar el servidor
php artisan serve --host=0.0.0.0