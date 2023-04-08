import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import {
  AreaChart,
  LineChart,
  BarChart,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Featured from "../../components/featured/Featured";

import "./Statistics.scss";
import Chart from "../../components/chart/Chart";
const Statistics = (props) => {
  return (
    <div className="Statistics">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Featured />
          <Chart
            chartData={props.chartData}
            aspect={2 / 1}
            title="Total users in last six months"
            type={LineChart}
            typename={Line}
          />
        </div>
        <div className="charts">
          <Chart
            chartData={props.chartData1}
            aspect={2 / 1}
            title="Total tours in last six months"
            type={BarChart}
            typename={Bar}
          />
          <Featured />
        </div>
        <div className="charts">
          <Featured />

          <Chart
            chartData={props.chartData1}
            aspect={2 / 1}
            title="Total tours in last six months"
            type={AreaChart}
            typename={Area}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
