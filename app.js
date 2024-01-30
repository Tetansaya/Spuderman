const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para manejar datos JSON en las solicitudes
app.use(bodyParser.json());

// Datos de ejemplo
const animales = {
  lunes: ['León', 'Elefante', 'Jirafa'],
  martes: ['Delfín', 'Ballena', 'Tiburón'],
  miercoles: ['Águila', 'Búho', 'Pingüino'],
  jueves: ['Colibrí', 'Águila Real', 'Gaviota'],
  viernes: ['Iguana', 'Cobra', 'Tortuga'],
  sabado: ['Cocodrilo', 'Tortuga Marina', 'Anaconda'],
  domingo: ['Salamandra', 'Rana Flecha Azul', 'Axolotl'],
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

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
