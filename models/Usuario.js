const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
			unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Despesas, {
      foreignKey: 'userId',
      as: 'despesa',
    });
  };

  return Usuario;
};
