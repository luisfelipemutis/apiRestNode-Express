# Proyecto de aprendizaje: Node.js y Express

Este repositorio es un proyecto educativo para practicar cómo crear un servidor web y una API REST con Node.js y Express. Incluye ejemplos de rutas HTTP, lectura de parámetros, recepción de formularios y JSON, middleware, validación y operaciones CRUD sencillas sobre un archivo JSON.

## Tecnologías y herramientas

- **Node.js**: entorno que permite ejecutar JavaScript fuera del navegador. En este proyecto ejecuta el servidor y proporciona módulos integrados para trabajar con archivos y rutas del sistema.
- **Express 5**: framework web para Node.js. Se utiliza para crear el servidor, definir endpoints, leer parámetros de las solicitudes y enviar respuestas HTTP.
- **JavaScript con CommonJS**: el código del servidor usa `require()` para importar módulos y `module.exports` para compartir funciones entre archivos.
- **`body-parser`**: middleware que interpreta cuerpos de solicitudes JSON y datos de formularios URL-encoded para que las rutas puedan leerlos desde `req.body`.
- **`dotenv`**: carga variables definidas en un archivo `.env` a `process.env`. La aplicación usa `PORT` si está definido; de lo contrario, escucha en el puerto `3000`. El archivo `.env` es opcional y no se incluye una plantilla en el repositorio.
- **Módulos integrados de Node.js (`fs` y `path`)**: `fs` lee y escribe el archivo de usuarios; `path` construye la ruta a `users.json` de forma compatible con el sistema operativo.
- **Archivo JSON (`users.json`)**: almacenamiento local de ejemplo para practicar operaciones de lectura y escritura. No es una base de datos y no ofrece las garantías de concurrencia, integridad o escalabilidad.
- **HTML (`index.html`) y CSS (`style.css`)**: demostración independiente de tarjetas de producto adaptables. El CSS utiliza *Container Queries* para cambiar la disposición según el ancho del contenedor. Esta página no está conectada a la API ni se sirve desde Express; se puede abrir directamente en el navegador.
- **npm**: gestor de paquetes que instala las dependencias y ejecuta los scripts definidos en `package.json`.

## Estructura del proyecto

```text
.
├── app.js
├── functions/
│   └── validaciones.js
├── middlewares/
│   ├── errorHandle.js
│   └── loggers.js
├── users.json
├── index.html
├── style.css
└── package.json
```

- **`app.js`**: punto de entrada. Configura Express y los parsers, registra los middlewares y define las rutas.
- **`functions/validaciones.js`**: exporta funciones para validar correo, nombre, identificador y datos de usuario.
- **`middlewares/loggers.js`**: registra el método, la URL, la IP y el código de respuesta de cada solicitud, junto con su duración.
- **`middlewares/errorHandle.js`**: define una respuesta JSON para errores y añade el stack cuando `NODE_ENV` es `development`.
- **`users.json`**: datos iniciales de usuarios que las rutas CRUD leen y modifican.
- **`index.html` y `style.css`**: ejemplo separado de HTML y CSS, no forma parte del servidor Express.
- **`package.json`**: metadatos, dependencias y comandos npm del proyecto.

## Requisitos y ejecución

Necesitas Node.js y npm instalados. El comando de desarrollo usa `node --watch`, disponible en versiones actuales de Node.js.

```bash
npm install
npm run dev
```

El servidor muestra su dirección en la consola y, por defecto, queda disponible en `http://localhost:3000`. Para usar otro puerto, crea un archivo `.env` en la raíz:

```env
PORT=3005
NODE_ENV=development
```

Para iniciar el servidor sin el modo de observación:

```bash
npm start
```

Los scripts están definidos en `package.json`: `npm run dev` inicia `app.js` con reinicio al detectar cambios, y `npm start` inicia `app.js` normalmente.

## Rutas de ejemplo

| Método | Ruta | Qué permite practicar |
|---|---|---|
| `GET` | `/` | Responder con contenido HTML. |
| `GET` | `/users/:id` | Leer un parámetro de ruta (`req.params.id`). |
| `GET` | `/search?termino=...&categoria=...` | Leer parámetros de consulta (`req.query`). |
| `POST` | `/form` | Recibir campos de un formulario o JSON y responder en JSON. |
| `POST` | `/api/data` | Recibir un objeto JSON; responde con `400` si el cuerpo está vacío. |
| `GET` | `/users` | Leer y devolver la lista de `users.json`. |
| `POST` | `/users` | Validar y añadir un usuario a `users.json`. |
| `PUT` | `/users/:id` | Validar y actualizar un usuario. |
| `DELETE` | `/users/:id` | Eliminar de la lista el usuario cuyo identificador coincide. |
| `GET` | `/error` | Provocar un error para practicar el flujo de errores. |

Las rutas de usuarios son una práctica de CRUD: **Create** (crear), **Read** (leer), **Update** (actualizar) y **Delete** (eliminar). Por ejemplo, puedes probar las lecturas con:

```bash
curl http://localhost:3000/users
curl http://localhost:3000/users/5
curl "http://localhost:3000/search?termino=node&categoria=backend"
```

Para crear un usuario, envía JSON con los campos que actualmente requieren las validaciones (`name`, `nombre`, `email` e `id`):

```bash
curl.exe -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"id":6,"name":"Ana","nombre":"Ana Pérez","email":"ana@example.com"}'
```

En PowerShell, `curl.exe` evita la colisión con el alias `curl` de `Invoke-WebRequest`. También puedes usar una herramienta como Postman o Insomnia para enviar solicitudes.

## Conceptos que puedes aprender

1. **Servidor y API REST**: el servidor recibe solicitudes HTTP y responde a través de rutas organizadas por recursos y métodos.
2. **Métodos HTTP**: `GET` consulta, `POST` crea o envía datos, `PUT` actualiza y `DELETE` elimina.
3. **Parámetros de ruta y de consulta**: `:id` en `/users/:id` es un parámetro de ruta; `termino` y `categoria` después de `?` son parámetros de consulta.
4. **Cuerpo de una solicitud**: `req.body` contiene los datos enviados en JSON o en un formulario, una vez interpretados por los parsers.
5. **Middleware**: una función como `LoggerMiddleware` puede observar solicitudes y respuestas antes o después de ejecutar la ruta.
6. **Validación**: las funciones de `validaciones.js` comprueban campos antes de guardar o actualizar usuarios.
7. **Errores HTTP**: las rutas pueden responder con códigos como `400` o `500`; `errorHandle.js` muestra una forma de centralizar las respuestas de error.
8. **Persistencia**: `fs` permite leer y escribir datos, aunque en una aplicación real normalmente se usaría una base de datos.
9. **Configuración**: `dotenv` permite cambiar el puerto con variables de entorno sin modificar el código.
10. **Diseño adaptable**: `style.css` muestra cómo las *Container Queries* adaptan una tarjeta según el espacio disponible.

## Límites actuales del ejemplo

- La API es para aprendizaje: guardar JSON directamente no es adecuado para producción ni para varias escrituras simultáneas.
- La validación de creación comprueba `name` en la ruta y `nombre` en el validador; por eso actualmente se necesitan ambos campos.
- El middleware de errores está registrado antes de las rutas. En Express, para manejar errores que se propaguen desde las rutas, normalmente se registra después de ellas.
- El script `test` de `package.json` es solo un marcador y no ejecuta pruebas automatizadas todavía.
- La página HTML/CSS es independiente de la API y su imagen de producto requiere conexión a Internet.

## Propósito

El objetivo es aprender, mediante ejemplos pequeños, cómo iniciar un proyecto de Node.js con Express y cómo se relacionan rutas, solicitudes HTTP, middleware, validación y persistencia básica. La estructura y las implementaciones pueden ampliarse gradualmente con pruebas, una base de datos y validaciones más completas.
