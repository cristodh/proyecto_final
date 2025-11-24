// components/DonationFilters.jsx
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DonationFilters() {
    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            <TextField
                placeholder="Buscar por proyecto..."
                fullWidth
                sx={{ flex: "1 1 250px" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                sx={{ height: 40 }}
            >
                Estado
            </Button>

            <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                sx={{ height: 40 }}
            >
                Fecha
            </Button>
        </Box>
    );
}
