import Axios from 'axios'

const useJWT = async ()=>{
    let auth = null;

    try{
        const response = await Axios.post("http://localhost:5000/api/jwtTest");
        if(response){
            auth = response.data;
        }
    } catch(err){
        console.log(`Error: ${err.message}`);
    }
    console.log("returing user")
    return auth;

}


export default useJWT;