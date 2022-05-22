import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  LegendItemIcon,
} from "./ChatContainerStyles";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useCharts from "../hooks/useCharts";
import { MainContentFooter } from "./HomePageStyles";
import { getTotal } from "../utils/getTotals";
import { numberWithCommas } from "../utils/getCommas";

export default function ChartWrapper({ projects, reports, isFiltered }) {
  const { dynamicChartData } = useCharts(projects, reports);

  const RADIAN = Math.PI / 180;
  const allTotal = getTotal(reports);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <ChartContainer>
      <ChartLegend>
        {projects?.map((project) => {
          return (
            <>
              <ChartLegendItem>
                {dynamicChartData?.map((item) => {
                  return item?.data01?.map((data) => {
                    if (data.name === project.name) {
                      return <LegendItemIcon color={data.fill} />;
                    }
                  });
                })}

                <span className="legend-item-text">{project.name}</span>
              </ChartLegendItem>
            </>
          );
        })}
      </ChartLegend>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          {dynamicChartData?.map((s) => {
            return (
              <>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={s.data01}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={!isFiltered ? renderCustomizedLabel : null}
                  labelLine={false}
                  fill="#fff"
                />
              </>
            );
          })}

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ChartLegend start>
        Project Total: &nbsp;{" "}
        <span>{allTotal && numberWithCommas(allTotal)} USD</span>
      </ChartLegend>
    </ChartContainer>
  );
}
