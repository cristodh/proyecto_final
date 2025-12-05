// src/components/donations/DonationTable.jsx
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * DonationTable shows a table on md+ and stacked cards on small screens.
 * donations: array of { id, date, project, amount, currency, status }
 */
export default function DonationTable({ donations = [] }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const statusColor = (s) => {
    if (!s) return "default";
    const key = s.toLowerCase();
    if (key.includes("complet")) return "success";
    if (key.includes("proceso")) return "warning";
    if (key.includes("cancel")) return "default";
    return "default";
  };

  if (!donations.length) {
    return <Typography color="text.secondary">No hay donaciones para mostrar.</Typography>;
  }

  if (mdUp) {
    return (
      <TableContainer component={Paper} sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f9ff" }}>
              <TableCell>Fecha</TableCell>
              <TableCell>Proyecto</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((d) => (
              <TableRow key={d.id} hover>
                <TableCell sx={{ width: 180 }}>{d.date}</TableCell>
                <TableCell>
                  <Box component="a" href="#" sx={{ color: "text.primary", textDecoration: "none", "&:hover": { color: "primary.main", textDecoration: "underline" } }}>
                    {d.project}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {d.currency ?? "₡"}{d.amount.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Chip label={d.status} color={statusColor(d.status)} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Small screens: stacked rows
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {donations.map((d) => (
        <Paper key={d.id} sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="caption" color="text.secondary">{d.date}</Typography>
              <Box component="div" sx={{ mt: 0.5 }}>
                <Box component="a" href="#" sx={{ fontWeight: 700, color: "text.primary", textDecoration: "none", "&:hover": { color: "primary.main" } }}>
                  {d.project}
                </Box>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontWeight: 700 }}>{d.currency ?? "₡"}{d.amount.toLocaleString()}</Typography>
              <Chip label={d.status} color={statusColor(d.status)} size="small" sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
