const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Asegúrate de que el cuerpo de las solicitudes se pueda analizar como JSON

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Martina123',
  database: 'Comerciando'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para verificar la conexión
app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send(`La solución es: ${results[0].solution}`);
  });
});

// Ruta para obtener todos los ítems (GET /items)
//http://localhost:3000/items
app.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error('Error al obtener los ítems: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results); // Enviar los resultados como respuesta en formato JSON
  });
});

// Ruta para agregar un ítem (POST /items)
app.post('/items', (req, res) => {
  const newItem = req.body; // Obtener el nuevo ítem desde el cuerpo de la solicitud
  const query = 'INSERT INTO items (name) VALUES (?)'; // Asegúrate de ajustar el SQL según tu estructura de tabla
  connection.query(query, [newItem.name], (err, result) => {
    if (err) {
      console.error('Error al agregar un ítem: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newItem }); // Responder con el nuevo ítem agregado
  });
});
// ---------------- Rutas para Usuarios ----------------

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM Usuario', (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un usuario (POST /usuarios)
app.post('/usuarios', (req, res) => {
  const newUser = req.body;
  const query = 'INSERT INTO Usuario (nombre_usuario, contraseña, rol) VALUES (?, ?, ?)';
  connection.query(query, [newUser.nombre_usuario, newUser.contraseña, newUser.rol], (err, result) => {
    if (err) {
      console.error('Error al agregar un usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newUser });
  });
});


// ---------------- Rutas para Categorías ----------------

// Ruta para obtener todas las categorías
app.get('/categorias', (req, res) => {
  connection.query('SELECT * FROM Categorias', (err, results) => {
    if (err) {
      console.error('Error al obtener las categorías: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar una categoría (POST /categorias)
app.post('/categorias', (req, res) => {
  const newCategory = req.body;
  const query = 'INSERT INTO Categorias (nombre) VALUES (?)';
  connection.query(query, [newCategory.nombre], (err, result) => {
    if (err) {
      console.error('Error al agregar una categoría: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newCategory });
  });
});
// ---------------- Rutas para Productos ----------------

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM Productos', (err, results) => {
    if (err) {
      console.error('Error al obtener los productos: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un producto (POST /productos)
app.post('/productos', (req, res) => {
  const newProduct = req.body;
  const query = 'INSERT INTO Productos (nombre, descripcion, precio, categoria_id, fecha_publicacion) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [newProduct.nombre, newProduct.descripcion, newProduct.precio, newProduct.categoria_id, newProduct.fecha_publicacion], (err, result) => {
    if (err) {
      console.error('Error al agregar un producto: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newProduct });
  });
});
// Ruta para agregar un producto (POST /productos)
app.post('/productos', (req, res) => {
  const newProduct = req.body;
  const query = 'INSERT INTO Productos (nombre, descripcion, precio, categoria_id, fecha_publicacion) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [newProduct.nombre, newProduct.descripcion, newProduct.precio, newProduct.categoria_id, newProduct.fecha_publicacion], (err, result) => {
    if (err) {
      console.error('Error al agregar un producto: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newProduct });
  });
});

// ---------------- Rutas para PublicarProductos ----------------

// Ruta para obtener todas las publicaciones
app.get('/publicaciones', (req, res) => {
  connection.query('SELECT * FROM PublicarProductos', (err, results) => {
    if (err) {
      console.error('Error al obtener las publicaciones: ', err);
      res.status(500).send('Error en el servidor');
      return;
 }
    res.json(results);
  });
});

// Ruta para agregar una publicación (POST /publicaciones)
app.post('/publicaciones', (req, res) => {
  const newPublication = req.body;
  const query = 'INSERT INTO PublicarProductos (producto_id, usuario_id, estado, fecha_publicacion, imagen_url) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [newPublication.producto_id, newPublication.usuario_id, newPublication.estado, newPublication.fecha_publicacion, newPublication.imagen_url], (err, result) => {
    if (err) {
      console.error('Error al agregar una publicación: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newPublication });
  });
});

// Ruta para obtener toda la información personal
app.get('/informacion-personal', (req, res) => {
  connection.query('SELECT * FROM InformacionPersonal', (err, results) => {
    if (err) {
      console.error('Error al obtener la información personal: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar información personal (POST /informacion-personal)
app.post('/informacion-personal', (req, res) => {
  const newInfo = req.body;
  const query = 'INSERT INTO InformacionPersonal (usuario_id, nombre, direccion, correo_electronico, telefono) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [newInfo.usuario_id, newInfo.nombre, newInfo.direccion, newInfo.correo_electronico, newInfo.telefono], (err, result) => {
    if (err) {
      console.error('Error al agregar información personal: ', err);
      res.status(500).send('Error en el servidor');
 return;
    }
    res.status(201).json({ id: result.insertId, ...newInfo });
  });
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
