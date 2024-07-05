import axios from 'axios'

    const applyForRole = async (payload) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/inbox/apply",
                payload,
                { withCredentials: true }
            );
            if (response.status==201) {
                console.log("REturning the response")
                return response;
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };


export {applyForRole}