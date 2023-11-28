import React from "react";

import { PieChart, Pie, ResponsiveContainer, Label } from "recharts";

interface PercentagePieChartProps {
  percentage: number;
  used: number;
  left: number;
}

export const PercentagePieChart = ({percentage, used, left}: PercentagePieChartProps) => {
  const data = [
    { name: "Used", value: used, fill: "#8884d8" },
    { name: "Left", value: left, fill: "#fff" },
  ];
  return (
    <ResponsiveContainer height={200} width="100%">
      <PieChart>
        <Pie 
          data={data}
          dataKey="value"
          activeIndex={0}
          innerRadius={50}
          outerRadius={80}
          startAngle={180}
          endAngle={0}
        >
          <Label value={`${percentage}%`} position="centerBottom" fill="#fff" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}