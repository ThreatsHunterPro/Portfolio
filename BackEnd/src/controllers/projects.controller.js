import projectsService from "../services/projects.service.js";

const getProjects = async (req, res, next) => {
  try {
    const { domain, category, tech, search, featured } = req.query;
    const projects = await projectsService.findAll({ domain, category, tech, search, featured });

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

const getProjectsMeta = async (req, res, next) => {
  try {
    const meta = await projectsService.getMeta();
    res.status(200).json({ success: true, data: meta });
  } catch (err) {
    next(err);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const result = await projectsService.findBySlug(req.params.slug);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default {
  getProjects,
  getProjectsMeta,
  getProjectBySlug,
};
