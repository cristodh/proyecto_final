import React, { useState } from 'react';
import "../RegisFormD/RegisFormD.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { Form } from 'react-router-dom';

export default function RegisFormD() {
  const [checkEducation, setCheckEducation] =useState(true);
  const [checkHealth, setCheckHealth] =useState(false);
  const [checkEnvironment, setCheckEnvironment] =useState(false);
  const [checkCommunityDevelopment, setCheckCommunityDevelopment] =useState(false);
  const [checkScienceandTechnology, setCheckScienceandTechnology] =useState(false);
  const [checkArtsandCulture, setCheckArtsandCulture] =useState(false);
  const [checkAnimalWelfare, setCheckAnimalWelfare] =useState(false);
  const [checkSportsandRecreation, setCheckSportsandRecreation] =useState(false);
  const [checkOther, setCheckOther] =useState(false);

  return (
    <form className="register-form-d">
      <div className="form-grid">
        <TextField label="Nombre" variant="outlined" />
        <TextField label="Apellidos" variant="outlined" />
        <TextField label="Correo electrónico" variant="outlined" />
        <TextField label="Teléfono" variant="outlined" />
        <TextField
          label="Fecha de nacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
        <TextField label="Cédula de identidad" variant="outlined" />
        <TextField label="Nacionalidad" variant="outlined" />
        <TextField label="Dirección" variant="outlined" />
        <FormControl>
          <InputLabel>Género</InputLabel>
          <Select defaultValue="">
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
            <MenuItem value="prefiero-no-decir">Prefiero no decir</MenuItem>
          </Select>
        </FormControl>
        <div className="interest-group">
          <label className="interest-label">Áreas de interés</label>
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={checkEducation} />} label="Educación" />
            <FormControlLabel control={<Checkbox checked={checkHealth} />} label="Salud" />
            <FormControlLabel control={<Checkbox checked={checkEnvironment} />} label="Medio ambiente" />
            <FormControlLabel control={<Checkbox checked={checkCommunityDevelopment} />} label="Desarrollo de la Comunidad" />
            <FormControlLabel control={<Checkbox checked={checkScienceandTechnology} />} label="Ciencia y Tecnología" />
            <FormControlLabel control={<Checkbox checked={checkArtsandCulture} />} label="Arte y cultura" />
            <FormControlLabel control={<Checkbox checked={checkAnimalWelfare} />} label="Protección Animal" />
            <FormControlLabel control={<Checkbox checked={checkSportsandRecreation} />} label="Deporte y Recreacion" />
            <FormControlLabel control={<Checkbox checked={checkOther} />} label="Otros" />
            {/* <TextField label="Otros" variant="outlined" */}
          </FormGroup>
        </div>
        <TextField label="Nombre de usuario" variant="outlined" />
        <TextField label="Contraseña" type="password" variant="outlined" />
        <TextField label="Confirmar contraseña" type="password" variant="outlined" />
      </div>
      <div className="submit-button">
        <Button variant="contained" color="primary">Crear Cuenta</Button>
      </div>
    </form>
  );
}

