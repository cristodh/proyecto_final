// src/components/DonorForm.jsx
import React, { useState } from "react";
import { Box, Button, Grid, Typography, TextField, MenuItem } from "@mui/material";
import TermsCheckbox from "../TermsCheckbox/TermsCheckbox";
import { postData } from "../../services/fetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DonorForm() {
    const navigate = useNavigate();

    // Regex para validar contraseña segura
    const regex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]).{8,}$/;

    // Estado del formulario
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        goverment_ID: "",
        nationality: "",
        address: "",
        gender: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    // aqui se evita que la pagina se recargue
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos (idéntica a tu versión)
        if (
            formData.first_name.trim() === "" ||
            formData.last_name.trim() === "" ||
            formData.email.trim() === "" ||
            formData.phone_number.trim() === "" ||
            formData.date_of_birth.trim() === "" ||
            formData.goverment_ID.trim() === "" ||
            formData.nationality.trim() === "" ||
            formData.address.trim() === "" ||
            formData.gender.trim() === "" ||
            formData.username.trim() === "" ||
            formData.password.trim() === "" ||
            formData.confirmPassword.trim() === ""
        ) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        if (!regex.test(formData.password)) {
            toast.error(
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
            );
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        console.log("Datos del formulario:", formData);
        const response = await postData("user/new_users/", formData);

        console.log(response);
        if (!response.ok) {
            if (response.username) {
                console.log(`response de error ${response.username}`);
                toast.error("El nombre de usuario ya esta en uso, elije otro");
                return;
            }
            if (response.email) {
                toast.error("El correo electrónico ya está en uso, elije otro");
                return;
            }
            toast.error("Error en el registro. Por favor, inténtalo de nuevo.");
            return;
        }
        if(response.ok){
            toast.success("Registro exitoso");
            setTimeout(() => {
                navigate("/auth-user");
            }, 1000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Box maxWidth="700px" mx="auto" mt={6} px={2}>
            <form onSubmit={handleSubmit}>
                {/* Título */}
                <Box textAlign="center" mb={4}>
                    <Typography fontSize="2.2rem" fontWeight={900} color="#0d1b12">
                        Registro de Donante
                    </Typography>
                    <Typography color="#4c9a66">
                        Únete a nuestra comunidad y apoya proyectos que transforman vidas.
                    </Typography>
                </Box>

                {/* Grid del formulario */}
                <Grid container spacing={3}>
                    {/* Nombre */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            placeholder="Tu nombre"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Apellidos */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Apellidos"
                            placeholder="Tus apellidos"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            placeholder="tunombre@ejemplo.com"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Teléfono */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            placeholder="Tu número de teléfono"
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Fecha de nacimiento */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fecha de nacimiento"
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* Cédula */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Cédula de identidad"
                            placeholder="Tu número de cédula"
                            name="goverment_ID"
                            value={formData.goverment_ID}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Nacionalidad */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nacionalidad"
                            placeholder="Tu nacionalidad"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Dirección */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            placeholder="Tu dirección"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Género (Select) */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="" disabled >Selecciona una opción</MenuItem>
                            <MenuItem value="Femenino" selected>Femenino</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Otro">Otro</MenuItem>
                            <MenuItem value="Prefiero no decirlo">Prefiero no decirlo</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Username */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre de usuario"
                            placeholder="Elige un nombre de usuario"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Contraseña */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contraseña"
                            placeholder="Crea una contraseña segura"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Confirmar contraseña */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirmar contraseña"
                            placeholder="Vuelve a escribir la contraseña"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Botón */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                background: "#179e44",
                                height: "52px",
                                mt: 2,
                                fontWeight: 700,
                                textTransform: "none",
                                "&:hover": { background: "#128638" },
                            }}
                        >
                            Crear mi cuenta
                        </Button>

                        <Typography textAlign="center" mt={2} color="#4c9a66">
                            ¿Ya tienes una cuenta?{" "}
                            <strong style={{ color: "#179e44", cursor: "pointer" }}>
                                Inicia sesión
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>

                <ToastContainer closeButton draggable autoClose={1300} />
            </form>
        </Box>
    );
}
