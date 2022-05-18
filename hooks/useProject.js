import react, { useState, useEffect } from "react";
import axios from "axios";
export default function useUser() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/projects"
      );
      setProjects(res.data.data);
    };

    fetchProjects();
  }, []);

  return {
    projects,
  };
}
