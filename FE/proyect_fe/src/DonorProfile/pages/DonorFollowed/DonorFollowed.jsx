// src/pages/FollowedProjectsPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProjectTabs from "../../components/ProjectTabs/ProjectTabs";
import ProjectsGrid from "../../components/ProjectsGrid/ProjectsGrid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/**
 * Page integrated in the dashboard layout.
 * Uses Sidebar and Header already present in the app
 */
export default function DonorFollowed() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // tab 0 = Seguidos, 1 = Publicados, 2 = Completados
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_, newValue) => setTab(newValue);

  // sample data (copy images/urls from your HTML)
  const allProjects = React.useMemo(() => ({
    followed: [
      {
        id: "p1",
        title: "Reforestación del Parque Central",
        org: "Asociación Verde Urbano",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW2Z8RgBvFDlmzuvl9_-PgEwECT3yIlFhBhv1HQGQpywgPlQtOKpSaKelrIGyb4X0O0IdjX7wgZiN00uY6LIwXmM2R_WU8-ZyPsNrMjnA6EJC1DRdo6kIcbBfX0_nncxkQQ3bWZNnwLIGW_YlsT-cg15wRa8v0v7fAcrWIbWzOViUgbThptUo1M5teIz6CfLgjH24_64pqIm48H-gzWKMfflcCYbwEjczY-ICk0clbvsUQgy9FGe4KAajXlDqurNst27IZH7k4Qio",
        status: "En Progreso",
        eta: "Finaliza en 15 días"
      },
      {
        id: "p2",
        title: "Kits Escolares para Todos",
        org: "Fundación Educar es Futuro",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKYjTY5VHCM4_uq8-V-6mNo_XHPv1ZMr9dkZebt0s6A-t-FRfpWkOkVi3OIn5jHx2qcOLSVAC_1wv1Pz3ZJ8MrilpgDUER1NBvZl12VSJ7NQEzoXm9-KaKEdx8FdJVux34eti4cRc_rw9arrSmOFRiVaPMihhKI97siXOBeprCa-sCUw9ij0NT8q6sKLwnhuh2GumId4OEekFjPA-XrLLobWYL_lz2ST4GC16Sk9UDWaxivBMxuMO2_bydSNblPgthLL6DTLEZIw4",
        status: "Financiado",
        eta: "Campaña finalizada"
      },
      {
        id: "p3",
        title: "Clases de Arte para Mayores",
        org: 'Colectivo "Pinceles de Vida"',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsSPsNC8cZ0QNdsqae5gJxbfW6lm8Kd5UrJIIzi6dpK64w07WYJSmozP5XAuP2hmQAjjrbGUTswh91ScL0hlCic-cCgRF98S8aaXPM6qjOZG8r6zCW0828U3WJJimNKrWWCgQ6J0bQrSxI5rqO14VY1m-RmYcPFNQHDL98tQ6d5VNXBOVq76uucBt0U9j9eKVW_0s7JEvryIJ51rcEn_OoNuMuWlVfpf7vQcvDf8gIi-SM3zgxbXutP8xd4KuzSdOPq5rb1OLkojQ",
        status: "Nueva Meta",
        eta: "Finaliza en 28 días"
      }
    ],
    published: [
      {
        id: "pub1",
        title: "Proyecto Comunitario X",
        org: "Colectivo Local",
        image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=60",
        status: "En Progreso",
        eta: "Finaliza en 7 días"
      }
    ],
    completed: [
      {
        id: "c1",
        title: "Refugio \"Patitas Felices\"",
        org: "Amigos de los Animales",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvNqGifh0JkekdXwyfOI3gSW1jfzefYlMP_vYlixsH7wBrGl0aUR6Y36NuSYsTQDWr0I0yNVxqMxd_cLxLOULOQfbdZwKFs7deYDVaLU_ZS5frBDiOd2491SnBDay3xCrk54d0xM9lcUJoYttvovxfgpn9Wh6jSVCEkAdo-5jWpJ6pWK9LUlzVug5-F10Maqr06-lOFn6LF6nYQBQ1jbFYqbsYTPCjUc-fbuEuhNFszr2BCmRNo5nRDmtVUul5aKpSt1EVaTe81K0",
        status: "Financiado",
        eta: "Campaña finalizada"
      }
    ]
  }), []);

  const [favorites, setFavorites] = React.useState(() => new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const projectsToShow = tab === 0 ? allProjects.followed : tab === 1 ? allProjects.published : allProjects.completed;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Proyectos Seguidos</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Mantente al día con el progreso y las actualizaciones de los proyectos que te interesan.
              </Typography>

              <ProjectTabs value={tab} onChange={handleTabChange} />

              <Box sx={{ mt: 2 }}>
                <ProjectsGrid
                  projects={projectsToShow.map((p) => ({
                    ...p,
                    favorite: favorites.has(p.id),
                    onPrimary: (id) => { console.log("view updates", id); },
                    primaryLabel: (p.status === "Financiado" || p.status === "Finalizada") ? "Ver Impacto" : "Ver Actualizaciones"
                  }))}
                  onToggleFavorite={toggleFavorite}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Right column: reuse sticky utilities or extra cards */}
              <Box sx={{ position: mdUp ? "sticky" : "static", top: 96, display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Acciones rápidas</Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button size="small">Explorar más</Button>
                    <Button size="small">Crear proyecto</Button>
                  </Box>
                </Box>

                <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Filtro</Typography>
                  <Typography variant="body2" color="text.secondary">Filtra por estado, organización o fecha.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
