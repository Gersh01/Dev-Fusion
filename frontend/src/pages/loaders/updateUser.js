import Axios from 'axios'

export const updateUser = async (newInfo,id) => {
    const payload = {bio:newInfo, userId:id}
    try{
        console.log(payload)
        const response = await Axios.put("http://localhost:5000/api/users",payload,{withCredentials:true})
        
    } catch(err){
        console.log(`Error: ${err.message}`);
    }



  return (
    null
  )
}
