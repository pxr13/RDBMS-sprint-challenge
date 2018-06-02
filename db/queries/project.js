const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const db = require('knex')(configuration);

const getAllProjects = () => db('project').select();

module.exports = {
  getAllProjects,
};
