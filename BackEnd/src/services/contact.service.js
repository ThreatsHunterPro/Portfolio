import crypto from 'crypto';
import { readJson, writeJson } from "../utils/jsonStore.js";
import { paths } from "../config/paths.js";
import { validateContactPayload } from "../utils/validators.js";
import { ValidationError } from "../errors/index.error.js";
import { colors } from "../utils/colors.js";

const saveMessage = async (payload) => {
  // Honeypot anti-spam : un bot remplit le champ caché, on fait comme si tout allait bien
  if (payload?.website) return { id: 'ignored' };

  const { errors, data } = validateContactPayload(payload);
  if (errors.length) throw new ValidationError(errors.join(' '));

  const message = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };

  const messages = await readJson(paths.messages, []);
  messages.push(message);
  await writeJson(paths.messages, messages);

  if (process.env.NODE_ENV !== 'test') {
    console.log(`${colors.green}✉️  Nouveau message de ${message.name} <${message.email}>${colors.reset}`);
  }
  return message;
};

export default {
  saveMessage,
};
