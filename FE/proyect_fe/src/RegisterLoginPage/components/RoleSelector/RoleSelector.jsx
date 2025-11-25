// components/RoleSelector.jsx
import { Box, Card, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useNavigate } from "react-router-dom";
const roles = [
  {
    label: "Donante",
    desc: "Apoya proyectos que transforman comunidades.",
    icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: "primary.main" }} />,
  },
  {
    label: "Gestor de Proyectos",
    desc: "Crea iniciativas y conecta con financiamiento.",
    icon: <LightbulbIcon sx={{ fontSize: 40, color: "accent.main" }} />,
  },
];

export default function RoleSelector() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3}>
      {roles.map((role) => (
        <Card
          key={role.label}
          onClick={() =>
            navigate(
              role.label === "Donante" ? "/register-donor" : "/register-manager"
            )
          }
          variant="outlined"
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            transition: "0.2s",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.main + 05",
            },
            cursor: "pointer",
          }}
        >
          {role.icon}
          <Typography fontWeight={700} mt={1}>
            {role.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role.desc}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
