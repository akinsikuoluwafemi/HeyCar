import React, { useState, useEffect } from "react";
import { getTotal, getTotalOfAReport } from "../utils/getTotals";

export default function useCharts(projects, reports) {
  const [refinedProject, setRefinedProject] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [dynamicChartData, setDynamicChartData] = useState([]);
  const colorsArr = ["#A259FF", "#F24E1E", "#FFC107", "#6497B1", "#1BC5BD"];

  const allTotal = getTotal(reports);

  useEffect(() => {
    const chartArr = () => {
      const newProject = projects?.map((project) => {
        const obj = {
          name: project.name,
          projectId: project.projectId,
        };
        return obj;
      });
      setRefinedProject(newProject);
    };
    chartArr();
  }, [projects]);

  // getTotalOfAReport(reports, project.projectId);

  useEffect(() => {
    if (refinedProject) {
      const data01 = refinedProject.map((project) => {
        const randomColor =
          colorsArr[Math.floor(Math.random() * colorsArr.length)];

        const obj = {
          value:
            Math.round(
              (getTotalOfAReport(reports, project.projectId) / allTotal) * 100
            ) || 0,
          name: project.name,
          fill: randomColor,
        };
        return obj;
      });
      setChartData({ data01 });
      // return data01;
    }
  }, [refinedProject, reports]);

  useEffect(() => {
    if (chartData) {
      setDynamicChartData([chartData]);
    }
  }, [chartData]);

  return {
    dynamicChartData,
  };
}
