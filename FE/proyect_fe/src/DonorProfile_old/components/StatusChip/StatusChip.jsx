import React from "react";
import { Chip } from "@mui/material";
import "./StatusChip.css";

export default function StatusChip({ status }) {
  const colors = {
    Financiado: "success-chip",
    "En Progreso": "warning-chip",
  };

  return <Chip label={status} className={colors[status]} />;
}
