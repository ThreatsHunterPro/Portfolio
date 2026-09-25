import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

let app;
let messagesFile;

beforeAll(async () => {
  // Les messages de test sont écrits dans un fichier temporaire
  messagesFile = path.join(os.tmpdir(), `portfolio-messages-${Date.now()}.json`);
  process.env.MESSAGES_FILE = messagesFile;
  process.env.NODE_ENV = 'test';
  app = (await import('./app.js')).default;
});

afterAll(async () => {
  await fs.rm(messagesFile, { force: true });
});

describe('API /api/projects', () => {
  test('liste les projets publiés, sans le contenu détaillé', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data.every((p) => p.published !== false)).toBe(true);
    expect(res.body.data[0].content).toBeUndefined();
  });

  test('retourne les métadonnées (catégories, technologies)', async () => {
    const res = await request(app).get('/api/projects/meta');
    expect(res.status).toBe(200);
    expect(res.body.data.total).toBeGreaterThan(0);
    expect(Array.isArray(res.body.data.technologies)).toBe(true);
  });

  test('retourne un projet par son slug avec ses voisins', async () => {
    const res = await request(app).get('/api/projects/ecoride');
    expect(res.status).toBe(200);
    expect(res.body.data.project.title).toBe('EcoRide');
    expect(res.body.data).toHaveProperty('next');
  });

  test('filtre par domaine et navigue au sein du même domaine', async () => {
    const web = await request(app).get('/api/projects?domain=web');
    expect(web.body.data.every((p) => p.domain === 'web')).toBe(true);

    const res = await request(app).get('/api/projects/ecoride');
    const neighbours = [res.body.data.previous, res.body.data.next].filter(Boolean).map((p) => p.slug);
    expect(neighbours.every((slug) => web.body.data.some((p) => p.slug === slug))).toBe(true);
  });

  test('chaque projet publié a un domaine valide', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.body.data.every((p) => ['web', 'game'].includes(p.domain))).toBe(true);
  });

  test('404 sur un slug inconnu', async () => {
    const res = await request(app).get('/api/projects/nope');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('API /api/contact', () => {
  test('refuse un message invalide', async () => {
    const res = await request(app).post('/api/contact').send({ name: 'J', email: 'x' });
    expect(res.status).toBe(400);
  });

  test('enregistre un message valide', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'Jean Dupont',
      email: 'jean@mail.fr',
      message: 'Bonjour, je souhaite échanger avec vous.',
    });
    expect(res.status).toBe(201);

    const saved = JSON.parse(await fs.readFile(messagesFile, 'utf-8'));
    expect(saved).toHaveLength(1);
    expect(saved[0].email).toBe('jean@mail.fr');
  });
});

describe('Routes inconnues', () => {
  test('404 JSON propre', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.body.error.name).toBe('NotFoundError');
  });
});
