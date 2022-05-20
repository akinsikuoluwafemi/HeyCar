import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [allProjects, setAllProjects] = useState([]);
  const [allProjectsCopy, setAllProjectsCopy] = useState(allProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/projects"
      );
      setAllProjects(res.data.data);
      setAllProjectsCopy(res.data.data);
    };

    fetchProjects();
  }, []);

  // alert(JSON.stringify(allProjects));

  return (
    <ProjectContext.Provider
      value={{
        allProjects,
        setAllProjects,
        allProjectsCopy,
        setAllProjectsCopy,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default function useProjects() {
  return useContext(ProjectContext);
}
