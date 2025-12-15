// src/components/CampaignTable.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StatusChip from "../StatusChip/StatusChip";

const rows = [
  { name: 'Huerto Comunitario "El Sol"', manager: "Ana Torres", progress: "$4,500 / $5,000", status: "Activa", action: "Supervisar" },
  { name: 'Refugio Animal "Patitas"', manager: "Carlos Ruiz", progress: "$1,200 / $10,000", status: "Pendiente de Validación", action: "Validar Campaña" },
  { name: 'Murales para el Barrio', manager: "Sofía Gómez", progress: "$8,000 / $8,000", status: "Finalizada", action: "Ver Reporte" },
  { name: 'Biblioteca Móvil Infantil', manager: "Luis Fernández", progress: "$0 / $7,500", status: "Rechazada", action: "Ver Motivos" },
];

export default function CampaignTable() {
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: 1, borderColor: "custom.borderLight", overflow: "hidden", bgcolor: "custom.cardLight" }}>
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f9ff" }}>
              <TableCell>Nombre del Proyecto</TableCell>
              <TableCell>Gestor del Proyecto</TableCell>
              <TableCell>Progreso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} hover>
                <TableCell sx={{ fontWeight: 700 }}>{r.name}</TableCell>
                <TableCell>{r.manager}</TableCell>
                <TableCell>{r.progress}</TableCell>
                <TableCell><StatusChip status={r.status} /></TableCell>
                <TableCell align="right">
                  <Button size="small" variant="text" sx={{ color: "primary.main" }}>{r.action}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}