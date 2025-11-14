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
  const [checkEducation, setCheckEducation] = useState(false);
  const [checkHealth, setCheckHealth] = useState(false);
  const [checkEnvironment, setCheckEnvironment] = useState(false);
  const [checkCommunityDevelopment, setCheckCommunityDevelopment] = useState(false);
  const [checkScienceandTechnology, setCheckScienceandTechnology] = useState(false);
  const [checkArtsandCulture, setCheckArtsandCulture] = useState(false);
  const [checkAnimalWelfare, setCheckAnimalWelfare] = useState(false);
  const [checkSportsandRecreation, setCheckSportsandRecreation] = useState(false);
  const [checkOther, setCheckOther] = useState(false);
  const [interests, setInterests] = useState([]);
  const interestArray = []

  const addInterest = (interest) => {
    interestArray.push(interest);
    setInterests([...interestArray, interest]);
    console.log(interestArray);
  }

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
            <FormControlLabel control={<Checkbox
              onClick={() => {
                setCheckEducation(!checkEducation);
                addInterest("Education")
              }}
              checked={checkEducation}

            />} label="Educación" />
            <FormControlLabel control={<Checkbox 
            onClick={()=>{
              setCheckHealth(!checkHealth);
              addInterest("Health")
            }}
            checked={checkHealth} 
            />} label="Salud" />
            <FormControlLabel control={<Checkbox
             checked={checkEnvironment} 
              onClick={()=>{
                setCheckEnvironment(!checkEnvironment);
                addInterest("Environment")
              }}
             />} label="Medio ambiente" />
            <FormControlLabel control={<Checkbox 
            checked={checkCommunityDevelopment}
            onClick={()=>{
              setCheckCommunityDevelopment(!checkCommunityDevelopment);
              addInterest("Community Development")
            }}
            />} label="Desarrollo de la Comunidad" />
            <FormControlLabel control={<Checkbox 
            checked={checkScienceandTechnology}
            onClick={()=>{
              setCheckScienceandTechnology(!checkScienceandTechnology);
              addInterest("Science and Technology")
            }}
            />} label="Ciencia y Tecnología" />
            <FormControlLabel control={<Checkbox 
            checked={checkArtsandCulture}
            onClick={()=>{
              setCheckArtsandCulture(!checkArtsandCulture);
              addInterest("Arts and Culture")
            }}
            />} label="Arte y cultura" />
            <FormControlLabel control={<Checkbox
             checked={checkAnimalWelfare}
             onClick={()=>{
              setCheckAnimalWelfare(!checkAnimalWelfare);
              addInterest("Animal Welfare")
            }}
             />} label="Protección Animal" />
            <FormControlLabel control={<Checkbox 
            checked={checkSportsandRecreation}
            onClick={()=>{
              setCheckSportsandRecreation(!checkSportsandRecreation);
              addInterest("Sports and Recreation")
            }}
            />} label="Deporte y Recreacion" />
            <FormControlLabel control={<Checkbox 
            checked={checkOther}
            onClick={()=>{
              setCheckOther(!checkOther);
              addInterest("Other")
            }}
            />} label="Otros" />
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

