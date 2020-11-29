const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const user = sequelize.define('user', {
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
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'editor', 'viewer'),
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    read_latest_terms: {
      type: DataTypes.BOOLEAN,
      unique: false,
      defaultValue: false,
      // allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: (instanceOfUser) => {
        if (instanceOfUser.password) {
          const salt = bcrypt.genSaltSync();
          instanceOfUser.password = bcrypt.hashSync(instanceOfUser.password, salt); // eslint-disable-line  no-param-reassign, max-len
          instanceOfUser.uuid = uuidv4(); // eslint-disable-line  no-param-reassign, max-len
        }
      },
      beforeSave: (instanceOfUser) => {
        if (instanceOfUser.password) {
          const salt = bcrypt.genSaltSync();
          instanceOfUser.password = bcrypt.hashSync(instanceOfUser.password, salt); // eslint-disable-line  no-param-reassign, max-len
          instanceOfUser.uuid = uuidv4(); // eslint-disable-line  no-param-reassign, max-len
        }
      },
    },
  });

  // Model instanceMethods deprecated in v5
  // Must use es5 function definition see https://github.com/sequelize/sequelize/issues/8652
  user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return user;
};
