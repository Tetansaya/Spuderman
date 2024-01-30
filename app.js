const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para manejar datos JSON en las solicitudes
app.use(bodyParser.json());

// Datos 
const animales = {
  lunes: ['León', 'Elefante', 'Jirafa'],
  martes: ['Delfín', 'Ballena', 'Tiburón'],
  miercoles: ['Águila', 'Búho', 'Pingüino'],
  jueves: ['Colibrí', 'Águila Real', 'Gaviota'],
  viernes: ['Iguana', 'Cobra', 'Tortuga'],
  sabado: ['Cocodrilo', 'Tortuga Marina', 'Anaconda'],
  domingo: ['Salamandra', 'Rana Flecha Azul', 'Ajolote'],
};

// Obtener todos los animales de un día
app.get('/animal/:dia', (req, res) => {
  const { dia } = req.params;

  if (animales[dia]) {
    res.json({ animalesDelDia: animales[dia] });
  } else {
    res.status(404).json({ error: 'Día no válido' });
  }
});

// Añadir un nuevo animal al día
app.post('/animal/:dia', (req, res) => {
  const { dia } = req.params;
  const { animal } = req.body;

  if (animales[dia]) {
    animales[dia].push(animal);
    res.json({ animalesDelDia: animales[dia] });
  } else {
    res.status(404).json({ error: 'Día no válido' });
  }
});

// Actualizar un animal de un día
app.put('/animal/:dia/:indice', (req, res) => {
  const { dia, indice } = req.params;
  const { animal } = req.body;

  if (animales[dia] && animales[dia][indice]) {
    animales[dia][indice] = animal;
    res.json({ animalesDelDia: animales[dia] });
  } else {
    res.status(404).json({ error: 'Día o índice no válido' });
  }
});

// Eliminar un animal de un día
app.delete('/animal/:dia/:indice', (req, res) => {
  const { dia, indice } = req.params;

  if (animales[dia] && animales[dia][indice]) {
    animales[dia].splice(indice, 1);
    res.json({ animalesDelDia: animales[dia] });
  } else {
    res.status(404).json({ error: 'Día o índice no válido' });
  }
});

// función para obtener todos los días disponibles
app.get('/dias', (req, res) => {
  const dias = Object.keys(animales);
  res.json({ diasDisponibles: dias });
});

// función para listar todos los animales aéreos
app.get('/animales-aereos', (req, res) => {
  const animalesAereos = [].concat(animales.miercoles, animales.jueves);
  res.json({ animalesAereos });
});

// función para listar todos los animales acuáticos
app.get('/animales-acuaticos', (req, res) => {
  const animalesAcuaticos = [].concat(animales.martes, animales.sabado);
  res.json({ animalesAcuaticos });
});

// función para listar todos los animales terrestres
app.get('/animales-terrestres', (req, res) => {
  const animalesTerrestres = [].concat(animales.lunes, animales.viernes, animales.domingo);
  res.json({ animalesTerrestres });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
animales del dia (Lunes): GET http://localhost:3000/animal/lunes

añadir un nuevo animal al dia (Lunes): POST http://localhost:3000/animal/lunes

actualizar un animal de un dia (Lunes)(Animal en posicion 0): PUT http://localhost:3000/animal/lunes/0 

eliminar un animal de un dia (Lunes)(Animal en la posicion 0): DELETE  http://localhost:3000/animal/lunes/0

todos los días disponibles: GET http://localhost:3000/dias

todos los animales aéreos: GET http://localhost:3000/animales-aereos

todos los animales acuáticos: GET http://localhost:3000/animales-acuaticos

todos los animales terrestres: GET http://localhost:3000/animales-terrestres
*/