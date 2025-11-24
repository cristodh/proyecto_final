import React from "react";
import { TableRow, TableCell, Box, Typography, IconButton } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StatusChip from "./StatusChip";
import "./DonationRow.css";

export default function DonationRow({ project }) {
  return (
    <TableRow className="table-row">
      <TableCell>
        <Box className="project-cell">
          <Box
            className="project-img"
            style={{ backgroundImage: `url(${project.img})` }}
          />

          <Box>
            <Typography className="project-title">{project.title}</Typography>
            <Typography className="project-tag">{project.tag}</Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell className="cell-text">{project.date}</TableCell>

      <TableCell className="cell-amount">{project.amount}</TableCell>

      <TableCell>
        <StatusChip status={project.status} />
      </TableCell>

      <TableCell align="right">
        <IconButton className="receipt-btn">
          <ReceiptLongIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
