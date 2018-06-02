const query = require('../db/queries');

const getAllProjects = async (req, res) => {
  const projects = await query.getAllProjects();
  res.send(projects);
};

module.exports = {
  getAllProjects,
};
