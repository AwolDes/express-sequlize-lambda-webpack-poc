/* eslint-disable camelcase */
const applyExtraSetup = (sequelize) => {
  const {
    user,
    organisation,
  } = sequelize.models;

  user.belongsTo(organisation);
};

module.exports = { applyExtraSetup };
