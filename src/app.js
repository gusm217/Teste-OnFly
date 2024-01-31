require('dotenv').config();
const express = require('express');
const despesasRoutes = require('./api/routes/despesasRoutes');
const userRoutes = require('./api/routes/userRoutes');
const authRoute = require('./api/routes/authRoute');

const app = express();
app.use(express.json());

app.use('/despesas', despesasRoutes);
app.use('/usuarios', userRoutes);
app.use('/login', authRoute);


module.exports = app;
