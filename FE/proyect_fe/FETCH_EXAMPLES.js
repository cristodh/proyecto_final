import { getData, postData, putData, deleteData, tokenGetData } from "../services/fetch";

/**
 * GUÍA DE USO DE FUNCIONES FETCH
 * ================================
 */

// 1. GET - Obtener datos
async function obtenerUsuarios() {
  try {
    const response = await getData('user/new_users/');
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 2. GET con Token - Obtener datos autenticados
async function obtenerUsuarioAutenticado(userId) {
  try {
    const response = await tokenGetData(`user/user_id/${userId}/`);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. POST - Crear nuevo dato
async function crearCampana(dataCampana) {
  try {
    const response = await postData('campaigns/create/', dataCampana);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 4. PUT - Actualizar dato existente
async function actualizarCampana(campanaId, datos) {
  try {
    const response = await putData(`campaigns/${campanaId}/`, datos);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 5. DELETE - Eliminar dato
async function eliminarCampana(campanaId) {
  try {
    const response = await deleteData(`campaigns/${campanaId}/`);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * EJEMPLOS DE USO EN REACT
 * =======================
 */

// Ejemplo 1: Cargar datos al montar componente
useEffect(() => {
  const fetchData = async () => {
    const users = await getData('user/new_users/');
    setUsers(users);
  };
  fetchData();
}, []);

// Ejemplo 2: Manejar click de boton eliminar
const handleDelete = async (id) => {
  try {
    const response = await deleteData(`campaigns/${id}/`);
    if (response.ok) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Ejemplo 3: Actualizar dato
const handleUpdate = async (id, newData) => {
  try {
    const response = await putData(`campaigns/${id}/`, newData);
    if (response.ok) {
      setCampaigns(campaigns.map(c => c.id === id ? response : c));
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Ejemplo 4: Crear nuevo dato
const handleCreate = async (newData) => {
  try {
    const response = await postData('campaigns/create/', newData);
    if (response.ok) {
      setCampaigns([...campaigns, response]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
