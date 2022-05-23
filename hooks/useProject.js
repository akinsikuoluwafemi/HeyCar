import react, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUser() {
  const [projects, setProjects] = useState([]);
  const [singleProject, setSingleProject] = useState([]);
  const [isError, setIsError] = useState(false);

  const notify = (errorMessage) => toast.error(errorMessage);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/projects"
      );
      setIsError(false);
      setProjects(res.data.data);
    } catch (err) {
      console.error(err.message);
      setIsError(true);
      notify("An error occurred");
    }
  };

  const handleFilter = (arr, id) => {
    const record = arr.filter((item) => item.projectId === id);
    setSingleProject(record);
    return record;
  };

  return {
    projects,
    handleFilter,
    singleProject,
    fetchProjects,
    isError,
    setIsError,
  };
}
