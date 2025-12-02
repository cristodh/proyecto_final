// src/components/ImpactChart.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Professional chart component using Recharts library
 * Accepts `data` array of {label, value} objects
 */
export default function ImpactChart({ data = [
  { label: "Sep", value: 30 },
  { label: "Oct", value: 50 },
  { label: "Nov", value: 80 },
  { label: "Dec", value: 40 },
  { label: "Ene", value: 60 },
  { label: "Feb", value: 20 }
] }) {
  return (
    <Box sx={{ width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="label" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2A9D8F"
            strokeWidth={2}
            fill="url(#colorGradient)"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
