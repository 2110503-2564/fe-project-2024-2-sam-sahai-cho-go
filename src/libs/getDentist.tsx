export default async function getDentist(id:string) {
    await new Promise((resolve)=>setTimeout(resolve, 1000))
    
    const response = await fetch(`http://localhost:5000/api/v1/dentists/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch dentist");
    }
    console.log("Get Dentist ",response)
    return await response.json();
}