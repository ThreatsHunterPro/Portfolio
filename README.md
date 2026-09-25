# 🚀 Portfolio - Thomas COLIN

Site vitrine de mon activité de prestataire, séparée en deux univers : **jeu vidéo** (Unreal / Unity) et **web** (full-stack).
Le projet reprend l'architecture d'**EcoRide** : un **monorepo** regroupant l'application cliente (Front-End) et une API (Back-End).

## 🛠️ Technologies utilisées

### Front-end
* React 19
* Vite
* Tailwind CSS
* Framer Motion
* React Router
* React Icons

### Back-end
* Node.js
* Express 5
* Express Rate Limit

### Tests
* Vitest
* Supertest

### Outils et Infrastructure
* Docker / Docker Compose
* NPM / Concurrently

## ✨ Fonctionnalités

* Thème sombre aux couleurs du logo (bleu nuit + dégradé cyan → bleu)
* Page d'accueil : hero, chiffres clés, choix du domaine, réalisations jeu vidéo puis web, compétences
* Une page par activité (`/jeux-video`, `/web`) : offres de prestation, stack, réalisations, demande de devis
* Liste des projets filtrable par **domaine**, **catégorie**, **technologie** et **recherche plein texte** (filtres partagés dans l'URL)
* Badge de contexte sur chaque projet : Prestation, Studio, Personnel, Formation (+ client)
* Page détaillée par projet : points clés, contenu, fiche projet, **galerie images / vidéos** avec visionneuse plein écran, projets précédent / suivant
* Page « À propos » : parcours, timeline, compétences
* Formulaire de contact avec type de demande (jeu vidéo / web / autre, pré-rempli via `?type=`), validé côté client **et** serveur, anti-spam
* Couverture générée automatiquement pour les projets sans image
* Responsive, animations au scroll et entre les pages, pages 404

## 🧱 Architecture du Projet

* **Racine (`/`)** : infrastructure globale (Docker Compose) et lancement simultané des deux applications.
* **Back-End (`/BackEnd`)** : API Express (routes déclaratives, controllers, services, erreurs typées, middlewares).
* **Front-End (`/FrontEnd`)** : application React (pages, sections, composants partagés, contextes et hooks).

```txt
BackEnd/
├── data/                 ← 📝 LE CONTENU DU SITE (projets + profil)
│   ├── projects.json
│   └── profile.json
└── src/
    ├── config/  controllers/  errors/  middlewares/  routes/  services/  utils/
FrontEnd/
├── public/projects/<slug>/   ← images et vidéos de chaque projet
└── src/
    ├── components/ (Layouts, Pages, Sections, Shared)
    ├── contexts/  hooks/  utils/
```

### API

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/projects` | Liste des projets publiés (`?domain=game\|web`, `?category=`, `?tech=`, `?search=`, `?featured=true`) |
| GET | `/api/projects/meta` | Nombre de projets par domaine, catégories, technologies |
| GET | `/api/projects/:slug` | Détail d'un projet + précédent / suivant dans le même domaine |
| GET | `/api/profile` | Informations personnelles, compétences, parcours |
| POST | `/api/contact` | Envoi d'un message (enregistré dans `BackEnd/data/messages.json`) |

## ➕ Ajouter / modifier un projet

1. Créer le dossier `FrontEnd/public/projects/<slug>/` et y déposer les images / vidéos.
2. Ajouter une entrée dans `BackEnd/data/projects.json` :

```json
{
  "id": 11,
  "slug": "mon-projet",
  "title": "Mon projet",
  "tagline": "Une phrase d'accroche",
  "summary": "Résumé affiché sur la carte (2-3 lignes).",
  "domain": "game",
  "category": "game",
  "context": "Prestation",
  "client": "Nom du studio",
  "year": 2026,
  "duration": "3 mois",
  "team": "Solo",
  "role": "Développeur",
  "status": "Terminé",
  "featured": false,
  "published": true,
  "technologies": ["C++", "Unreal Engine"],
  "cover": "/projects/mon-projet/cover.png",
  "highlights": ["Point clé 1", "Point clé 2"],
  "links": { "steam": "", "demo": "", "article": "", "github": "", "video": "", "docs": "" },
  "content": [
    { "heading": "Le projet", "paragraphs": ["..."], "list": ["..."] }
  ],
  "gallery": [
    { "type": "image", "src": "/projects/mon-projet/screen.png", "caption": "Légende" },
    { "type": "video", "src": "/projects/mon-projet/demo.mp4", "caption": "Légende" }
  ]
}
```

* `domain` : `game` ou `web` — détermine la page (Jeu vidéo / Web) où le projet apparaît
* `category` : `web`, `game`, `engine` ou `tool` (à étendre dans `FrontEnd/src/utils/categories.js`)
* `context` : `Prestation`, `Studio`, `Personnel` ou `Formation` ; `client` : optionnel, affiché à côté
* `featured: true` : le projet apparaît sur la page d'accueil
* `published: false` : brouillon, masqué du site
* `status` : `Terminé`, `En cours` ou `Prototype`
* `links` : `steam`, `demo`, `article`, `github`, `video`, `docs` — les liens vides sont automatiquement masqués

Le profil (nom, bio, réseaux sociaux, **offres de prestation** par domaine dans `services`, compétences, parcours, CV) se modifie dans `BackEnd/data/profile.json`.
Les couleurs du site se changent dans `FrontEnd/tailwind.config.js` (`colors.brand`, `colors.night`, dégradé `logo`).

## 💻 Prérequis

* Node.js (v22+ recommandé)
* Docker Desktop (optionnel)

## ⚙️ Variables d'environnement

`BackEnd/.env` (voir `.env.example`) :
```txt
API_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

`FrontEnd/.env` :
```txt
VITE_API_URL=http://localhost:3001
```

## 🚀 Procédures de Lancement

### Sans Docker
```txt
npm install
npm run dev
```
Front : http://localhost:5173 — API : http://localhost:3001

### Avec Docker
```txt
docker compose up --build
```
Front : http://localhost:8080 — API : http://localhost:3001

## 🧪 Tests

```txt
npm run test
```

## 🌍 Déploiement (Render)

Le fichier `render.yaml` décrit les deux services (Blueprint Render) :

| Service | Type | Dossier | Rôle |
|---|---|---|---|
| `portfolio-api` | Web Service Node (free) | `BackEnd` | API Express |
| `portfolio` | Static Site | `FrontEnd` | Site React (build Vite, publié depuis `dist`) |

1. Pousser le dépôt sur GitHub.
2. Render > **New > Blueprint** > choisir le dépôt : les deux services sont créés.
3. Renseigner les variables demandées :
   * `VITE_API_URL` (site) = URL de l'API, ex. `https://portfolio-api-xxxx.onrender.com`
   * `FRONTEND_URL` (API) = URL du site, ex. `https://portfolio-xxxx.onrender.com`
4. Relancer le déploiement du site (**Manual Deploy**) : `VITE_API_URL` est lu au moment du build.

⚠️ Offre gratuite :
* l'API se met en veille après 15 min sans visite : le premier chargement peut prendre ~30-50 s ;
* le disque n'est pas persistant : `messages.json` est perdu à chaque redémarrage. Les messages de contact restent visibles dans les **Logs** de l'API.
