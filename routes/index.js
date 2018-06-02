const ProjectController = require('../controllers/project');

module.exports = (app) => {
  // Project
  app.get('/api/projects', ProjectController.getAllProjects);
  app.get('/api/projects/:id', ProjectController.getProjectById);
  app.post('/api/projects', ProjectController.createProject);
};
