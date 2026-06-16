require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs'); /* para leer archivos */
const path = require('path'); /* para la ruta de archivos*/
const userFindPath = path.join(__dirname, 'users.json'); /* ruta del archivo json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); /* uso de formularios */
const PORT = process.env.PORT || 3000;
const { userValido } = require("./functions/validaciones.js");

const { LoggerMiddleware } = require("./middlewares/loggers.js")
const { errorHandle } = require("./middlewares/errorHandle.js")

// se adicona el middle y handler para manejo de error.
app.use(LoggerMiddleware);
app.use(errorHandle);

app.get('/', (req, res) => {
    res.send(`
        <h1>Hola a mi API </h1>
        <h2> Esta API esta creada con Express</h2>
        <p> Este es mi primer proyecto con Express</p>`
    );
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(`El usuario es: ${id}`);
});
app.get('/search', (req, res) => {
    const terms = req.query.termino || 'No especificado';
    const categoria = req.query.categoria || 'Todas';
    res.send(`
        <h1> Resultados de la busqueda</h1>
        <p> Término: ${terms}</p>
        <p> Categoría: ${categoria}</p>`
    );
});
app.post('/form', (req, res) => {
    const nombre = req.body.nombre || 'Anónimo';
    const email = req.body.email || 'No especificado';
    res.json({
        message: `Hola ${nombre}, tu correo es ${email}`,
    });
});

app.post('/api/data', (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se recibieron datos' });
    }
    res.status(200).json({
        message: 'Datos recibidos correctamente',
        data: data,
    })

});

app.get('/users', (req, res) => {
    fs.readFile(userFindPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer archivo' })
        }
        const users = JSON.parse(data);
        res.json(users);
    })
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (!newUser || !newUser.name || !newUser.email) {
        return res.status(400).json({ error: "Faltan datos del usuario" });
    }
    fs.readFile(userFindPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer archivo' })
        }
        const users = JSON.parse(data);
        const validacion = userValido(newUser, users);
        if (!validacion.isValid) {
            return res.status(500).json({ error: validacion.errors });
        }
        users.push(newUser);
        fs.writeFile(userFindPath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo guardar el usuario' });
            }
            res.status(201).json({
                message: "Usuario creado correctamente",
            });
        });
    });
});
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;
    fs.readFile(userFindPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer archivo' });
        }
        let users = JSON.parse(data);
        const validacion = userValido(updatedUser, users, true);
        if (!validacion.isValid) {
            return res.status(500).json({ error: validacion.errors });
        }
        users = users.map(user => {
            return user.id === userId ? { ...user, ...updatedUser } : user;
        });
        fs.writeFile(userFindPath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo actualizar el usuario' });
            }
            res.json(updatedUser);
        });
    });
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    fs.readFile(userFindPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer archivo' });
        }
        let users = JSON.parse(data);
        users = users.filter(user => user.id !== userId);
        fs.writeFile(userFindPath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo eliminar el usuario' });
            }
            res.json({ message: "Usuario eliminado correctamente" });
        });
    });
})

app.get('/error', (req, res, next) => {
    next(new Error('Error de prueba...'))
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})