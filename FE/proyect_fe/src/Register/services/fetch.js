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