import axios from 'axios'

    const applyForRole = async (payload) => {
        console.log(payload)
        try {
            const response = await axios.post(
                "http://localhost:5000/api/inbox/apply",
                payload,
                { withCredentials: true }
            );
            console.log(response.data)
            console.log(response.status)
            if (response.status==201) {
                console.log("REturning the response")
                return response;
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };


export {applyForRole}