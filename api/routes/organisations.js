const express = require('express');
const { models } = require('../models');

export const OrgRouter = express.Router();

OrgRouter.route('/:id/users').get(async (req, res) => {
  const orgId = req.params.id;
  try {
    const org = await models.organisation.findByPk(orgId, { include: [{ model: models.user, attributes: ['id', 'email', 'name', 'role'] }] });
    await res.json(org.users);
  } catch (err) {
    console.error(err);
    await res.status(500).json(err);
  }
});