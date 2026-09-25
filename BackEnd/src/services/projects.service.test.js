import { describe, test, expect } from 'vitest';
import { filterProjects } from './projects.service.js';

const projects = [
  { slug: 'a', title: 'EcoRide', domain: 'web', category: 'web', featured: true, technologies: ['React', 'Node.js'] },
  { slug: 'b', title: 'Unireal', domain: 'game', category: 'engine', technologies: ['C++', 'OpenGL'], tagline: 'Moteur de jeu' },
  { slug: 'c', title: 'SpykerGear', domain: 'game', category: 'game', technologies: ['C++', 'Unreal Engine'] },
];

describe('filterProjects', () => {
  test('sans filtre, retourne tout', () => {
    expect(filterProjects(projects)).toHaveLength(3);
  });

  test('filtre par domaine (web / jeu vidéo)', () => {
    expect(filterProjects(projects, { domain: 'game' }).map((p) => p.slug)).toEqual(['b', 'c']);
    expect(filterProjects(projects, { domain: 'web' }).map((p) => p.slug)).toEqual(['a']);
  });

  test('filtre par catégorie ("all" = pas de filtre)', () => {
    expect(filterProjects(projects, { category: 'game' }).map((p) => p.slug)).toEqual(['c']);
    expect(filterProjects(projects, { category: 'all' })).toHaveLength(3);
  });

  test('filtre par technologie sans tenir compte de la casse', () => {
    expect(filterProjects(projects, { tech: 'c++' }).map((p) => p.slug)).toEqual(['b', 'c']);
  });

  test('recherche plein texte insensible aux accents', () => {
    expect(filterProjects(projects, { search: 'moteur' }).map((p) => p.slug)).toEqual(['b']);
    expect(filterProjects(projects, { search: 'ecorìde' }).map((p) => p.slug)).toEqual(['a']);
  });

  test('ne garde que les projets mis en avant', () => {
    expect(filterProjects(projects, { featured: 'true' }).map((p) => p.slug)).toEqual(['a']);
  });
});
