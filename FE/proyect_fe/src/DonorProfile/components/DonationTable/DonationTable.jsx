// components/DonationHistoryTable.jsx
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function DonationHistoryTable({ rows }) {
    return (
        <TableContainer
            sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
            }}
        >
            <Table>
                <TableHead sx={{ bgcolor: "background.default" }}>
                    <TableRow>
                        <TableCell>Proyecto</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                {rows.length === 0 && (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                                    No hay donaciones registradas.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            backgroundImage: `url(${row.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    />
                                    <Box>
                                        <Typography fontWeight="bold">{row.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {row.tag}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>

                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {row.date}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography fontWeight="bold">{row.amount}</Typography>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={row.status}
                                    color={
                                        row.status === "Financiado"
                                            ? "success"
                                            : row.status === "En Progreso"
                                            ? "warning"
                                            : "default"
                                    }
                                    variant="soft"
                                    size="small"
                                />
                            </TableCell>

                            <TableCell align="right">
                                <IconButton>
                                    <ReceiptLongIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
