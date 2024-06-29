import Axios from 'axios'


export const updateUser = async (newInfo,id) => {

    const payload = {bio:newInfo, userId:id}
    try{
        const response = await Axios.put("http://localhost:5000/api/users",payload,{withCredentials:true})
        if(response){

        }
    } catch(err){
        console.log(`Error: ${err.message}`);
    }

  return (
    null
  )
}


export default updateUser;