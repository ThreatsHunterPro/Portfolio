import { getProject } from "../../utils/api";
import { useFetch } from "../shared/useFetch";

export function useProject(slug) {
  const { data, loading, error, reload } = useFetch((signal) => getProject(slug, { signal }), [slug]);

  return {
    project: data?.data?.project || null,
    previous: data?.data?.previous || null,
    next: data?.data?.next || null,
    notFound: error?.status === 404,
    loading,
    error,
    reload,
  };
}
