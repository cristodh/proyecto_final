// src/ManagerProfile/components/ManagerMainPage/ProjectChart/ProjectChart.jsx
import React from "react";
import Box from "@mui/material/Box";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Professional bar chart component using Recharts library with orange theme
 * Accepts `data` array of {label, value} objects
 */
export default function ProjectChart({ data = [
  { label: "Sep", value: 30 },
  { label: "Oct", value: 50 },
  { label: "Nov", value: 80 },
  { label: "Dec", value: 40 },
  { label: "Ene", value: 60 },
  { label: "Feb", value: 20 }
] }) {
  return (
    <Box sx={{ width: "100%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="label" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #FF8C00',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(255,140,0,0.2)'
            }}
            cursor={{ fill: 'rgba(255,140,0,0.1)' }}
          />
          <Bar 
            dataKey="value" 
            fill="#FF8C00"
            radius={[4, 4, 0, 0]}
          >
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}