import axios from 'axios'
import { apiDomain } from '../../utils/utility'


const getApplications = async (projectId) =>{
    let applications = null;
    const payload = {projectId:projectId}
    try{
    const response = await axios.get(apiDomain+"/api/inbox", payload, {
		withCredentials: true,
	})
      if(response){
        applications = response;
      }
      
    } catch(err){
        console.log(err.response)
        console.log(`Error: ${err.message}`)
    }
    return response;
}

const applicationApply = async (application) =>{
    try{
        const response = await axios.post(apiDomain+"/api/inbox/apply",application,{withCredentials:true})
        if(response){
            console.log("The user was able to apply for a position");
        }
    }catch(err){
        console.log(`Error: ${err.message}`)
    }
}


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