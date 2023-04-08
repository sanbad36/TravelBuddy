import React, { useState, useEffect } from "react";
import {
  AreaChart,
  LineChart,
  BarChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];
// const data = [
//   { name: "January", Total: 21 },
//   { name: "February", Total: 18 },
//   { name: "march", Total: 20 },
//   { name: "april", Total: 30 },
//   // { name: "may", Total: 12 },
//   // { name: "june", Total: 23 },
//   // { name: "july", Total: 34 },
// ];

const Chart = ({
  aspect,
  title,
  type: Typer,
  typename: Typename,
  chartData: chartData,
}) => {
  return (
    <div className="chart">
      {" "}
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        {/* <PieChart width={730} height={250}>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart> */}
        <Typer
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8878d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid
            strokeDasharray="3 3"
            className="chartgrid"
            stroke="gray"
          />
          <Tooltip />
          <Typename
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="#8884d8"
          />
        </Typer>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
