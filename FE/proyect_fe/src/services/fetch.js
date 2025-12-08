async function postData(endpoint,obj) {
   try {
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(obj)
     })
     const data = await response.json()
     data.ok = response.ok
     return data
   } catch (error) {
        console.error('Error:', error)
   }
}
export { postData }
async function getData(endpoint) {
   try {
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'GET'
     })
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`)
     }
     
     const contentType = response.headers.get("content-type")
     if (!contentType || !contentType.includes("application/json")) {
       throw new Error("Response is not JSON")
     }
     
     const data = await response.json()
     data.ok = response.ok
     return data
   } catch (error) {
        console.error('Error in getData:', error)
        return null
   }
}
export { getData }

async function tokenGetData(endpoint) {
   try {
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'GET',
         headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
         }
     })
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`)
     }
     
     const contentType = response.headers.get("content-type")
     if (!contentType || !contentType.includes("application/json")) {
       throw new Error("Response is not JSON")
     }
     
     const data = await response.json()
     data.ok = response.ok
     return data
   } catch (error) {
        console.error('Error in getData:', error)
        return null
   }
}
export {tokenGetData}

async function putData(endpoint, obj) {
   try {
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('token')}`
         },
         body: JSON.stringify(obj)
     })
     const data = await response.json()
     data.ok = response.ok
     return data
   } catch (error) {
        console.error('Error in putData:', error)
        return null
   }
}
export {putData}

async function deleteData(endpoint) {
   try {
     const token = localStorage.getItem('token');
     const headers = {
         'Content-Type': 'application/json'
     };
     
     if (token) {
         headers['Authorization'] = `Bearer ${token}`;
     }
     
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'DELETE',
         headers: headers
     });
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     
     const contentType = response.headers.get("content-type");
     let data = { ok: response.ok };
     
     if (contentType && contentType.includes("application/json")) {
         data = await response.json();
         data.ok = response.ok;
     }
     
     return data;
   } catch (error) {
        console.error('Error in deleteData:', error);
        return null;
   }
}
export {deleteData}

async function getAdminData(endpoint) {
   try {
     const token = localStorage.getItem('token');
     if (!token) {
       throw new Error('No token found');
     }
     
     const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
         method: 'GET',
         headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json'
         }
     });
     
     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }
     
     const contentType = response.headers.get("content-type");
     if (!contentType || !contentType.includes("application/json")) {
       throw new Error("Response is not JSON");
     }
     
     const data = await response.json();
     data.ok = response.ok;
     return data;
   } catch (error) {
        console.error('Error in getAdminData:', error);
        return null;
   }
}
export { getAdminData }