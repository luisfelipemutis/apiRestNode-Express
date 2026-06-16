# API REST Rick and Morty

Este proyecto es una API REST de aprendizaje construida con Node.js y Express. Está pensada como una explicación práctica de conceptos básicos y medios del desarrollo backend: rutas, parámetros, middlewares, validación, manejo de errores y persistencia simple en archivos JSON.

## ¿Qué contiene el proyecto?

La estructura principal es la siguiente:

- `apiRest/app.js`: archivo principal donde se crea el servidor Express, se registran los middlewares y se definen las rutas.
- `apiRest/users.json`: archivo que funciona como una base de datos simple para guardar usuarios.
- `apiRest/functions/validaciones.js`: contiene funciones para validar datos de usuarios.
- `apiRest/middlewares/loggers.js`: middleware que registra cada petición y su tiempo de respuesta.
- `apiRest/middlewares/errorHandle.js`: middleware para manejar errores de forma centralizada.
- `apiRest/index.html` y `apiRest/style.css`: demostración aparte de CSS moderno con container queries. No forman parte de la API, pero sí del material de práctica.
- `apiRest/.env` y `apiRest/.env-example`: archivos para configurar variables de entorno, como el puerto del servidor.

## ¿Cómo funciona?

1. El servidor se inicia desde `apiRest/app.js`.
2. Express recibe las peticiones HTTP.
3. `body-parser` permite leer datos enviados en JSON o formularios.
4. `LoggerMiddleware` registra cada petición que entra.
5. Las rutas responden según el método HTTP y la URL.
6. Para las rutas de usuarios, el servidor lee y escribe en `users.json` usando `fs`.
7. `userValido` verifica que los datos enviados tengan formato correcto.
8. `errorHandle` centraliza la respuesta cuando ocurre un error.

## Cómo ejecutar el proyecto

1. Entra en la carpeta del proyecto:

```bash
cd apiRest
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la carpeta `apiRest` si quieres definir un puerto personalizado. Puedes usar como base `.env-example`:

```env
PORT=3005
NODE_ENV=development
```

4. Inicia el servidor en modo normal:

```bash
npm start
```

5. O ejecútalo en modo desarrollo con recarga automática:

```bash
npm run dev
```

Por defecto la app escucha en `http://localhost:3000`, salvo que definas `PORT` en el archivo `.env`.

## Endpoints existentes

### `GET /`

Devuelve un mensaje HTML de bienvenida.

### `GET /users/:id`

Recibe un parámetro de ruta `id` y lo devuelve en la respuesta.

### `GET /search?termino=...&categoria=...`

Lee parámetros de consulta (`query`). Si no se envían, usa valores por defecto.

### `POST /form`

Recibe datos de formulario con `nombre` y `email`.

### `POST /api/data`

Recibe un objeto JSON arbitrario en el cuerpo de la petición.

### `GET /users`

Lee todos los usuarios guardados en `users.json` y los devuelve en formato JSON.

### `POST /users`

Crea un usuario nuevo. Valida que existan `name`, `email`, `nombre` e `id` según la lógica actual del proyecto.

### `PUT /users/:id`

Actualiza un usuario existente por su `id`.

### `DELETE /users/:id`

Elimina un usuario por su `id`.

### `GET /error`

Genera un error de prueba para comprobar el middleware de manejo de errores.

## Conceptos que enseña este proyecto

### 1. Node.js

Es el entorno que permite ejecutar JavaScript en el servidor.

### 2. Express

Es el framework que simplifica la creación de servidores web y APIs REST.

### 3. Rutas HTTP

Son los caminos que responde la API, por ejemplo `GET /users` o `POST /users`.

### 4. Métodos HTTP

El proyecto usa principalmente:

- `GET` para consultar información.
- `POST` para crear datos.
- `PUT` para actualizar datos.
- `DELETE` para eliminar datos.

### 5. Parámetros de ruta

Son valores que viajan dentro de la URL, por ejemplo `:id` en `/users/:id`.

### 6. Query params

Son parámetros que viajan después del signo `?`, por ejemplo `?termino=hola`.

### 7. Body de la petición

Es la información que se envía dentro de una solicitud `POST` o `PUT`, normalmente en JSON o formulario.

### 8. Middlewares

Son funciones que se ejecutan antes de llegar a la ruta final. Aquí se usan para registrar peticiones y manejar errores.

### 9. Validación de datos

Permite comprobar que los datos recibidos tengan el formato esperado antes de guardarlos.

### 10. Manejo de errores

Sirve para responder de forma controlada cuando algo falla, en lugar de dejar que el servidor se rompa.

### 11. Variables de entorno

Se usan para configurar datos como el puerto sin escribirlos directamente en el código.

### 12. Persistencia con archivos JSON

En vez de usar una base de datos real, este proyecto guarda la información en un archivo `.json`.

## Observaciones importantes

- Este proyecto es principalmente educativo.
- La lógica de usuarios es útil para aprender CRUD, pero todavía no usa base de datos.
- El archivo `index.html` con `style.css` es una demostración aparte de frontend y CSS avanzado.

## Resumen

Este proyecto sirve para aprender cómo se construye una API REST básica con Express, cómo se organizan sus partes y cómo se conectan rutas, validaciones, middlewares y archivos JSON en un flujo simple y entendible.
