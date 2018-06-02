const db = require('../knex');

const getAllProjects = () => db('project').select();

const getProjectById = id => db('project').where('id', id);

const createProject = body => db('project').insert(body, 'id');

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
};
