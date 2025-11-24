// src/components/projects/ProjectTabs.jsx
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

/**
 * Simple controlled tabs component.
 * value: 0 = Seguidos, 1 = Publicados, 2 = Completados
 * onChange: (event, value) => {}
 */
export default function ProjectTabs({ value = 0, onChange }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs value={value} onChange={onChange} aria-label="project tabs">
        <Tab label="Proyectos Seguidos" />
        <Tab label="Proyectos Publicados" />
        <Tab label="Proyectos Completados" />
      </Tabs>
    </Box>
  );
}
