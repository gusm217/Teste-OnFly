const Sequelize = require('sequelize');
const numberFormat = require('number-format');

module.exports = (sequelize) => {
  const Despesa = sequelize.define('Despesa', {
		id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
			validate: {
        len: [0, 191],
      },
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id',
      },
    },
    value: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
			get() {
				return numberFormat.format(this.getDataValue('value'), {
					locale: 'pt-BR',
					currency: 'BRL',
				});
			},
    },
  });

  Despesa.associate = (models) => {
    Despesa.belongsTo(models.Usuario, { foreignKey: 'userId', as: 'usuarios' });
  };

  return Despesa;
};
