const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Wrapper fetch : préfixe l'URL de l'API et normalise les erreurs
 */
export const apiFetch = async (path, { method = 'GET', body, signal } = {}) => {
  let res;
  try {
    res = await fetch(`${API_URL}/api/${path}`, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error("Impossible de joindre le serveur. Vérifiez que l'API est lancée.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data?.error?.message || `Erreur ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
};

export const getProjects = (options) => apiFetch('projects', options);
export const getProjectsMeta = (options) => apiFetch('projects/meta', options);
export const getProject = (slug, options) => apiFetch(`projects/${encodeURIComponent(slug)}`, options);
export const getProfile = (options) => apiFetch('profile', options);
export const sendContactMessage = (payload) => apiFetch('contact', { method: 'POST', body: payload });
