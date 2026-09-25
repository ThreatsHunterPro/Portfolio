import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, '../../data');

export const paths = {
    projects: path.join(DATA_DIR, 'projects.json'),
    profile: path.join(DATA_DIR, 'profile.json'),
    messages: process.env.MESSAGES_FILE || path.join(DATA_DIR, 'messages.json'),
};
