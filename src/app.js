require('dotenv').config();
const express = require('express');
const expensesRoutes = require('./api/routes/expensesRoutes');
const userRoutes = require('./api/routes/userRoutes');
const authRoute = require('./api/routes/authRoute');
const authMiddleware = require('./api/middlewares/authMiddleware')

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/expenses', authMiddleware, expensesRoutes);
app.use('/users', userRoutes);
app.use('/login', authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
