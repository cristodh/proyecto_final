import React, { useState } from 'react';
import "../RegisFormD/RegisFormD.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { postData } from '../../services/fetch';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
export default function RegisFormD() {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]).{8,}$/

  const navigate = useNavigate();
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
    username: '',
    password: '',
    confirmPassword: '',
  });



  //aqui se evita que la pagina se recargue
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.first_name.trim() ==='' || formData.last_name.trim() ==='' || formData.email.trim() ==='' || formData.phone_number.trim() ==='' || formData.date_of_birth.trim() ==='' || formData.goverment_ID.trim() ==='' || formData.nationality.trim() ==='' || formData.address.trim() ==='' || formData.gender.trim() ==='' || formData.username.trim() ==='' || formData.password.trim() ==='' || formData.confirmPassword.trim() ==='') {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    if(!regex.test(formData.password)){
      
      toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    console.log('Datos del formulario:', formData);

    const response = await postData('user/new_users/', formData);
    console.log(response); // recibe la respuesta del backend y a puede usar para mostrar mensajes de exito o error
    toast.success("Registro exitoso");
    navigate("/auth-user")
  };





  const handleInputChange = (e) => { // maneja los cambios en los campos del formulario
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // 
  return (
    // formulario de registro de donador
    <form className="register-form-d" onSubmit={handleSubmit}> {/*el onSubmit evita la recargue cuando se envia el formulario*/}
      <div className="form-grid">
        <TextField label="Nombre" variant="outlined" name='first_name' value={formData.first_name} onChange={handleInputChange} />

        <TextField label="Apellidos" variant="outlined" name='last_name' value={formData.last_name} onChange={handleInputChange} />

        <TextField label="Correo electrónico" variant="outlined" name='email' value={formData.email} onChange={handleInputChange} />

        <TextField label="Teléfono" variant="outlined" name='phone_number' value={formData.phone_number} onChange={handleInputChange} />

        <TextField
          label="Fecha de nacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name='date_of_birth'
          value={formData.date_of_birth}
          onChange={handleInputChange}
        />

        <TextField label="Cédula de identidad" variant="outlined" name='goverment_ID' value={formData.goverment_ID} onChange={handleInputChange} />

        <TextField label="Nacionalidad" variant="outlined" name='nationality' value={formData.nationality} onChange={handleInputChange} />

        <TextField label="Dirección" variant="outlined" name='address' value={formData.address} onChange={handleInputChange} />
        <FormControl fullWidth>
          <InputLabel>Género</InputLabel>
          <Select
            name='gender'
            value={formData.gender}
            onChange={handleInputChange}
            label="Género">
            <MenuItem value="Male">Masculino</MenuItem>
            <MenuItem value="Female">Femenino</MenuItem>
            <MenuItem value="Other">Otro</MenuItem>
            <MenuItem value="Prefer not to say">Prefiero no decir</MenuItem>
          </Select>
        </FormControl>
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
        <ToastContainer  closeButton draggable autoClose={1300}/>
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

