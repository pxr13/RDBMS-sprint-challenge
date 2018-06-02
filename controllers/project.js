const code = require('../utils/statusCodes');

const query = require('../db/queries');

const getAllProjects = async (req, res) => {
  const projects = await query.getAllProjects();
  res.send(projects);
};

const getProjectById = async (req, res) => {
  const [project] = await query.getProjectById(req.params.id);

  if (project) {
    res.send(project);
    return;
  }

  res.status(code.USER_ERROR).send({ error: true, message: 'Must provide a valid project ID.' });
};

const createProject = async (req, res) => {
  if (!req.body.name) {
    res.status(code.USER_ERROR).send({ error: true, message: 'Must provide a project name.' });
    return;
  }

  const [projectId] = await query.createProject(req.body);

  res.send({ success: true, id: projectId });
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
};
