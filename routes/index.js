const ProjectController = require('../controllers/project');

module.exports = (app) => {
  // Project
  app.get('/api/projects', ProjectController.getAllProjects);
};
