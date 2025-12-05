import React from "react";
import { Box } from "@mui/material";

import ExploreHero from "../components/ExploreHero";
import ExploreFilters from "../components/ExploreFilters";
import ProjectGrid from "../components/ProjectGrid";
import ExplorePagination from "../components/ExplorePagination";

export default function ExploreProjectsPage() {
  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 4 } }}>
      <ExploreHero />

      <Box display="flex" gap={4}>
        <ExploreFilters />

        <Box flex={1}>
          <ProjectGrid />
          <ExplorePagination />
        </Box>
      </Box>
    </Box>
  );
}
