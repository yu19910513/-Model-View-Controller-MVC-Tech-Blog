const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Com extends Model {}

Com.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      commentText: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id'
        }
      },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'com'
  }
);

module.exports = Com;
