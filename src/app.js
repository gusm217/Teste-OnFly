require('dotenv').config();
const express = require('express');
const despesasRoutes = require('./api/routes/despesasRoutes');
const userRoutes = require('./api/routes/userRoutes');
const authRoute = require('./api/routes/authRoute');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/expenses', despesasRoutes);
app.use('/users', userRoutes);
app.use('/login', authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
