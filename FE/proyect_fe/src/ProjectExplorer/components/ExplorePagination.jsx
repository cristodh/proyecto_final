import React from "react";
import { Box, Pagination } from "@mui/material";

export default function ExplorePagination() {
  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Pagination count={10} color="primary" />
    </Box>
  );
}
