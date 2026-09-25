import rules from "../config/rules.js";

/**
 * Vérifie si une chaîne est un email valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
};

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Valide le payload du formulaire de contact
 * @returns {{ errors: string[], data: object }}
 */
export const validateContactPayload = (payload = {}) => {
  const { contact } = rules;
  const data = {
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    requestType: clean(payload.requestType) || 'other',
    subject: clean(payload.subject),
    message: clean(payload.message),
  };
  const errors = [];

  if (!contact.requestTypes.includes(data.requestType)) {
    errors.push("Le type de demande est invalide.");
  }

  if (data.name.length < contact.nameMinLength || data.name.length > contact.nameMaxLength) {
    errors.push(`Le nom doit contenir entre ${contact.nameMinLength} et ${contact.nameMaxLength} caractères.`);
  }
  if (!isValidEmail(data.email)) {
    errors.push("L'adresse email est invalide.");
  }
  if (data.subject.length > contact.subjectMaxLength) {
    errors.push(`Le sujet ne doit pas dépasser ${contact.subjectMaxLength} caractères.`);
  }
  if (data.message.length < contact.messageMinLength || data.message.length > contact.messageMaxLength) {
    errors.push(`Le message doit contenir entre ${contact.messageMinLength} et ${contact.messageMaxLength} caractères.`);
  }

  return { errors, data };
};
