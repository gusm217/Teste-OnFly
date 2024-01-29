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
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Despesa, {
      foreignKey: 'usuarioId',
      as: 'despesas',
    });
  };

  return Usuario;
};
