// import react, { useState, useEffect } from "react";
// import axios from "axios";
// export default function useUser() {
//   const [projects, setProjects] = useState([]);
//   const [singleProject, setSingleProject] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const res = await axios.get(
//         "http://178.63.13.157:8090/mock-api/api/projects"
//       );
//       setProjects(res.data.data);
//     };

//     fetchProjects();
//   }, [projects]);

//   // const handleProjectId = (id) => {
//   //   setProjectId(id);
//   // };

//   const handleFilter = (arr, id) => {
//     const record = arr.filter((item) => item.projectId === id);
//     setSingleProject(record);
//     return record;
//   };

//   return {
//     projects,
//     handleFilter,
//     singleProject,
//   };
// }

import react, { useState, useEffect } from "react";
import axios from "axios";
export default function useUser() {
  const [projects, setProjects] = useState([]);
  const [singleProject, setSingleProject] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/projects"
      );
      setProjects(res.data.data);
    };

    fetchProjects();
  }, [projects]);

  // const handleProjectId = (id) => {
  //   setProjectId(id);
  // };

  const handleFilter = (arr, id) => {
    const record = arr.filter((item) => item.projectId === id);
    setSingleProject(record);
    return record;
  };

  return {
    projects,
    handleFilter,
    singleProject,
  };
}
