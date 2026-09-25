import { createContext } from "react";
import { useProfileLogic } from "../hooks/profile/useProfileLogic";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const profileData = useProfileLogic();

  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
