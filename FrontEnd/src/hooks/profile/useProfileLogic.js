import { getProfile } from "../../utils/api";
import { useFetch } from "../shared/useFetch";

export function useProfileLogic() {
  const { data, loading, error, reload } = useFetch((signal) => getProfile({ signal }));

  const profile = data?.data || null;
  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "";

  return {
    profile,
    fullName,
    loading,
    error,
    reload,
  };
}
