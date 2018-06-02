const db = require('../knex');

const getAllProjects = () => db('project').select();

module.exports = {
  getAllProjects,
};
