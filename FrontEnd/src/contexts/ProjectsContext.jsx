import { createContext } from "react";
import { useProjectsLogic } from "../hooks/projects/useProjectsLogic";

const ProjectsContext = createContext(null);

function ProjectsProvider({ children }) {
  const projectsData = useProjectsLogic();

  return (
    <ProjectsContext.Provider value={projectsData}>
      {children}
    </ProjectsContext.Provider>
  );
}

export { ProjectsContext, ProjectsProvider };
