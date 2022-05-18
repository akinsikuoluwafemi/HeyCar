import react, { useState, useEffect } from "react";
import axios from "axios";
export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/users"
      );
      setUser(res.data.data);
    };

    fetchUser();
  }, []);

  return {
    user,
  };
}
