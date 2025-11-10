import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";

/**
 * Props:
 * - type: "line" | "bar"
 * - data: array of objects [{name: "label", value1: 10, value2: 20}]
 * - dataKeys: array of keys to plot ["value1", "value2"]
 * - colors: array of colors for each line/bar
 * - xKey: key to use for X-axis
 */
const Charts = ({ type = "line", data = [], dataKeys = [], colors = [], xKey = "name" }) => {
  if (!data || data.length === 0 || !dataKeys || dataKeys.length === 0) {
    return <p className="text-gray-500">No data available for chart.</p>;
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, idx) => (
            <Line key={key} type="monotone" dataKey={key} stroke={colors[idx] || "#8884d8"} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, idx) => (
            <Bar key={key} dataKey={key} fill={colors[idx] || "#8884d8"} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return <p className="text-red-500">Invalid chart type: {type}</p>;
};

export default Charts;
