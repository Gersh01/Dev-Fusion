import axios from 'axios'
import { apiDomain } from '../../utils/utility'


const getApplications = async (projectId) =>{
    let applications = null;
    try{
    const response = await axios.get(`${apiDomain}/api/inbox/${projectId}`, {
		withCredentials: true,
	})
      if(response){
        applications = response.data
      }
      console.log(response.data)
    } catch(err){
        console.log(err.response)
        console.log(`Error: ${err.message}`)
    }
    return applications;
}

const applicationApply = async (payload) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/inbox/apply",
            payload,
            { withCredentials: true }
        );
        if (response.status==201) {
            console.log("Returning the response")
            return response;
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};


const applicationAccept = async (application)=>{
    console.log(application)
    try{

        const response = await axios.post(apiDomain+"/api/inbox/accept_member",application,{withCredentials:true})
        if(response){
            console.log("The user was accepted for the position");
        }
    }catch(err){
        console.log(`Error: ${err.message}`)
    }
}

const applicationDeny = async(application)=>{
    try{
        const response = await axios.post(apiDomain+"/api/inbox/reject_member",application,{withCredentials:true})
        if(response){
            console.log("The user was rejected for the position");
        }
    }catch(err){
        console.log(`Error: ${err.message}`)
    }
}






export {getApplications, applicationApply, applicationDeny, applicationAccept};