/* eslint-disable camelcase */

const db = require('../knex');

const getAllProjects = () => db('project').select();

const createProject = body => db('project').insert(body, 'id');

const getProjectById = id => db('project').where('id', id);

const getProjectActions = async (projectId) => {
  const actions = db('action').where('project_id', projectId);
  const formattedActions = actions.map(({ project_id, ...rest }) => rest);

  return formattedActions;
};

const getProjectContexts = async (projectId) => {
  const contextIds = await db('project_context')
    .where('project_id', projectId)
    .select('context_id');
  const formattedContextIds = contextIds.map(({ context_id }) => context_id);

  const contexts = await db('context').whereIn('id', formattedContextIds);

  return contexts;
};

const getFullProjectDataById = async (projectId) => {
  const [[project], actions, contexts] = await Promise.all([
    getProjectById(projectId),
    getProjectActions(projectId),
    getProjectContexts(projectId),
  ]);

  return { ...project, actions, contexts };
};

module.exports = {
  getAllProjects,
  getFullProjectDataById,
  createProject,
};
