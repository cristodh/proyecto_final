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
import { postData } from '../../services/fetch';

export default function RegisFormD() {

  // aqui se almacenan los datos del formulario
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    goverment_ID: '',
    nationality: '',
    address: '',
    gender: '',
    role: 1,  
    username: '',
    password: '',
    confirmPassword: ''
  });


  
  //aqui se evita que la pagina se recargue
const handleSubmit = async(e) => {
  e.preventDefault();

// Validar que las contraseñas coincidan
  if (formData.password !== formData.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }
    console.log('Datos del formulario:', formData);
    console.log('Intereses:', interests);

    const response = await postData('user/new_users/',formData);
    console.log(response); // recibe la respuesta del backend y a puede usar para mostrar mensajes de exito o error
  };

  

        // aqui se almacenan los intereses seleccionados
  const [checkEducation, setCheckEducation] =useState(true);
  const [checkHealth, setCheckHealth] =useState(false);
  const [checkEnvironment, setCheckEnvironment] =useState(false);
  const [checkCommunityDevelopment, setCheckCommunityDevelopment] =useState(false);
  const [checkScienceandTechnology, setCheckScienceandTechnology] =useState(false);
  const [checkArtsandCulture, setCheckArtsandCulture] =useState(false);
  const [checkAnimalWelfare, setCheckAnimalWelfare] =useState(false);
  const [checkSportsandRecreation, setCheckSportsandRecreation] =useState(false);
  const [checkOther, setCheckOther] =useState(false);
  const [interests, setInterests] = useState([]);

const handleInputChange = (e) => { // maneja los cambios en los campos del formulario
  const { name, value } = e.target; 
  setFormData(prevData => ({
    ...prevData,
    [name]: value
  }));
};

  // aqui se añaden los intereses seleccionados al array de intereses
  const addInterest = (interest) =>{
      setInterests([...interests, interest]);
  }


  // 
  return (
    // formulario de registro de donador
    <form className="register-form-d" onSubmit={handleSubmit}> {/*el onSubmit evita la recargue cuando se envia el formulario*/} 
      <div className="form-grid">
        <TextField label="Nombre" variant="outlined" name='first_name' value={formData.first_name} onChange={handleInputChange}/>

        <TextField label="Apellidos" variant="outlined" name='last_name' value={formData.last_name} onChange={handleInputChange}/>
        
        <TextField label="Correo electrónico" variant="outlined" name='email' value={formData.email} onChange={handleInputChange}/>
        
        <TextField label="Teléfono" variant="outlined" name='phone_number' value={formData.phone_number} onChange={handleInputChange}/>
        
        <TextField
          label="Fecha de nacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name='date_of_birth'
          value={formData.date_of_birth}
          onChange={handleInputChange}
        />
        
        <TextField label="Cédula de identidad" variant="outlined" name='goverment_ID' value={formData.goverment_ID} onChange={handleInputChange}/>
        
        <TextField label="Nacionalidad" variant="outlined" name='nationality' value={formData.nationality} onChange={handleInputChange}/>
        
        <TextField label="Dirección" variant="outlined" name='address' value={formData.address} onChange={handleInputChange}/>
        <FormControl fullWidth>
          <InputLabel>Género</InputLabel>
          <Select
          name= 'gender'
          value={formData.gender}
          onChange={handleInputChange}
          label="Género">
            <MenuItem value="Male">Masculino</MenuItem>
            <MenuItem value="Female">Femenino</MenuItem>
            <MenuItem value="Other">Otro</MenuItem>
            <MenuItem value="Prefer not to say">Prefiero no decir</MenuItem>
          </Select>
        </FormControl>
        
        <div className="interest-group">
          <label className="interest-label">Áreas de interés</label>
          <FormGroup row>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkEducation} 
                  onChange={(e) => {setCheckEducation(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Education");
                    } else {
                      // Remover el interés si se desmarca
                      setInterests(interests.filter(interest => interest !== "Education"));
                    }
                  }}
                />
              } 
              label="Educación" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkHealth} 
                  onChange={(e) => {
                    setCheckHealth(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Health");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Health"));
                    }
                  }}
                />
              } 
              label="Salud" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkEnvironment} 
                  onChange={(e) => {
                    setCheckEnvironment(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Environment");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Environment"));
                    }
                  }}
                />
              } 
              label="Medio ambiente" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkCommunityDevelopment} 
                  onChange={(e) => {
                    setCheckCommunityDevelopment(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Community Development");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Community Development"));
                    }
                  }}
                />
              } 
              label="Desarrollo de la Comunidad" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkScienceandTechnology} 
                  onChange={(e) => {
                    setCheckScienceandTechnology(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Science and Technology");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Science and Technology"));
                    }
                  }}
                />
              } 
              label="Ciencia y Tecnología" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkArtsandCulture} 
                  onChange={(e) => {
                    setCheckArtsandCulture(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Arts and Culture");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Arts and Culture"));
                    }
                  }}
                />
              } 
              label="Arte y cultura" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkAnimalWelfare} 
                  onChange={(e) => {
                    setCheckAnimalWelfare(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Animal Welfare");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Animal Welfare"));
                    }
                  }}
                />
              } 
              label="Protección Animal" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkSportsandRecreation} 
                  onChange={(e) => {
                    setCheckSportsandRecreation(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Sports and Recreation");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Sports and Recreation"));
                    }
                  }}
                />
              } 
              label="Deporte y Recreacion" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={checkOther} 
                  onChange={(e) => {
                    setCheckOther(e.target.checked);
                    if (e.target.checked) {
                      addInterest("Other");
                    } else {
                      setInterests(interests.filter(interest => interest !== "Other"));
                    }
                  }}
                />
              } 
              label="Otros" 
            />
            {/* <TextField label="Otros" variant="outlined" */}
          </FormGroup>
        </div>
        <TextField 
          label="Nombre de usuario" 
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField 
          label="Contraseña" 
          type="password" 
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField 
          label="Confirmar contraseña" 
          type="password" 
          variant="outlined"
          name="confirmPassword"
          value={formData.confirmPassword}  
          onChange={handleInputChange}
        />
      </div>
      <div className="submit-button">
        <Button variant="contained" color="primary" type='submit'>Crear Cuenta</Button>
      </div>
    </form>
  );
}

