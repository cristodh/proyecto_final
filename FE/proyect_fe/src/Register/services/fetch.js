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
     return data
   } catch (error) {
        console.error('Error:', error)
   }
}
export { postData }