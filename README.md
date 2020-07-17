# Guatemala App
Laravel

Requerimientos:

- Tener instalado PHP
- Tener composer 

Para configurar la db:

1. Ir al archivo `.env`
2. Crear la db y ponerle "guateapi" (aqui tengo postgres pero puede ser cualquiera)
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=guateapi
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Para correrlo:

```
$: php artisian serve
```

Generar Dummy data para las promos:

```
$: php artisan db:seed 
```

Correr test cases:

```
$: composer test
```


### Postman
Hay un archivo de postman el cual se puede importar para probar el `login, register, CRUD promos`

