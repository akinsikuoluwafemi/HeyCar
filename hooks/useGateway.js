import react, { useState, useEffect } from "react";
import axios from "axios";
export default function useUser() {
  const [gateways, setGateways] = useState(null);

  useEffect(() => {
    const fetchGateway = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/gateways"
      );
      setGateways(res.data.data);
    };

    fetchGateway();
  }, []);

  return {
    gateways,
  };
}
