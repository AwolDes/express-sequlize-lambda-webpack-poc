const { v4: uuid } = require('uuid');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const org = sequelize.define('organisation', {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    uuid: {
      // primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    is_paying: {
      type: DataTypes.BOOLEAN,
      unique: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    is_root_org: {
      type: DataTypes.BOOLEAN,
      unique: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      unique: false,
    },
    admin_name: {
      type: DataTypes.STRING,
      unique: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: false,
    },
  }, {
    classMethods: {},
  });

  // eslint-disable-next-line no-return-assign,no-param-reassign
  org.beforeCreate(organisation => organisation.uuid = uuid());

  return org;
};
