import React, { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  LegendItemIcon,
} from "./ChatContainerStyles";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { getTotalOfAReport } from "../utils/getTotals";

export default function ChartWrapper({ projects, reports }) {
  const [refinedProject, setRefinedProject] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const chartArr = () => {
      const newProject =
        projects &&
        projects.map((project) => {
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
        const obj = {
          value: getTotalOfAReport(reports, project.projectId),
          name: project.name,
        };
        return obj;
      });
      setChartData(data01);
      // return data01;
    }
  }, [refinedProject, reports]);

  return (
    <ChartContainer>
      <ChartLegend>
        {projects &&
          projects.map((project) => (
            <>
              <ChartLegendItem>
                <LegendItemIcon color="#A259FF">&nbsp;</LegendItemIcon>
                <span className="legend-item-text">{project.name}</span>
              </ChartLegendItem>
            </>
          ))}
      </ChartLegend>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          {/* <Legend verticalAlign="bottom" /> */}

          <Pie
            dataKey="value"
            isAnimationActive={false}
            // data={data01}
            data={chartData || []}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
