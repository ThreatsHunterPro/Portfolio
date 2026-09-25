import { readJson } from "../utils/jsonStore.js";
import { paths } from "../config/paths.js";

const getProfile = async (req, res, next) => {
  try {
    const profile = await readJson(paths.profile);
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export default {
  getProfile,
};
