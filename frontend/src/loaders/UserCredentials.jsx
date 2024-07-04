import { useState } from "react";
import Axios from "axios";

export default function UserCredentials() {
  const [auth, setAuth] = useState([]);

  const checkCredentials = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/api/jwtTest");

      if (response) {
        setAuth(response.data);
        console.log(auth);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  checkCredentials();

  return auth;
}
