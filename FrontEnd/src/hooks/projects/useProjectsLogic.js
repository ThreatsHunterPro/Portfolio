import { useMemo } from "react";
import { getProjects, getProjectsMeta } from "../../utils/api";
import { useFetch } from "../shared/useFetch";

/**
 * Charge une seule fois la liste des projets + les métadonnées.
 * Le filtrage se fait ensuite côté client (instantané et animé).
 */
export function useProjectsLogic() {
  const { data, loading, error, reload } = useFetch((signal) =>
    Promise.all([getProjects({ signal }), getProjectsMeta({ signal })])
  );

  const projects = useMemo(() => data?.[0]?.data || [], [data]);
  const meta = data?.[1]?.data || { total: 0, domains: {}, categories: {}, technologies: [] };
  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);

  return {
    projects,
    featured,
    meta,
    loading,
    error,
    reload,
  };
}
