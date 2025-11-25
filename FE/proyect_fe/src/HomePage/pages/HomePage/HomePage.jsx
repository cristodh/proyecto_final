// src/pages/HomePage.jsx
import React from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";
import Stats from "../../components/Stats/Stats";
import Footer from "../../components/Footer/Footer";
import Box from "@mui/material/Box";
import HeaderUser from "../../../DonorProfile/components/HeaderUser/HeaderUser";
import { useState,useEffect } from "react";
import { getData } from "../../../Register/services/fetch";



export default function HomePage() {

  const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
    
    useEffect(()=>{ // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
      async function getUser() { 
        const response = await getData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
        setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
      }
        getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
    },[]) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina
    
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {
        localStorage.getItem("id") ? <HeaderUser user={userLogged} /> : <Header/> // Mostrar HeaderUser si el usuario está logueado
      }
      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <FeaturedCarousel />
        <Stats />
      </Box>
      <Footer />
    </Box>
  );
}
