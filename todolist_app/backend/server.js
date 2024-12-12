require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes'); // Importa las rutas
const uri = process.env.MONGODB_URI;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
// Rutas
app.use('/api/todos', todoRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Servidor en ejecución
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MongoDB URI:', uri);