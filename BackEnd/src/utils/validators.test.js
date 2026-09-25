import { describe, test, expect } from 'vitest';
import { isValidEmail, validateContactPayload } from './validators.js';

describe('isValidEmail', () => {
  test('accepte une adresse valide', () => {
    expect(isValidEmail('jean.dupont@mail.fr')).toBe(true);
  });

  test('refuse une adresse invalide ou absente', () => {
    expect(isValidEmail('jean.dupont')).toBe(false);
    expect(isValidEmail('jean@mail')).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});

describe('validateContactPayload', () => {
  const valid = {
    name: '  Jean Dupont ',
    email: 'Jean@Mail.FR',
    subject: 'Collaboration',
    message: 'Bonjour, votre portfolio est top !',
  };

  test('nettoie et valide un payload correct', () => {
    const { errors, data } = validateContactPayload(valid);
    expect(errors).toHaveLength(0);
    expect(data.name).toBe('Jean Dupont');
    expect(data.email).toBe('jean@mail.fr');
  });

  test('retourne une erreur par champ invalide', () => {
    const { errors } = validateContactPayload({ name: 'J', email: 'nope', message: 'court' });
    expect(errors).toHaveLength(3);
  });

  test('type de demande : "other" par défaut, refusé si inconnu', () => {
    expect(validateContactPayload(valid).data.requestType).toBe('other');
    expect(validateContactPayload({ ...valid, requestType: 'game' }).errors).toHaveLength(0);
    expect(validateContactPayload({ ...valid, requestType: 'hack' }).errors).toHaveLength(1);
  });

  test('gère un payload vide', () => {
    const { errors } = validateContactPayload();
    expect(errors.length).toBeGreaterThan(0);
  });
});
