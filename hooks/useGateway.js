import react, { useState, useEffect } from "react";
import axios from "axios";
export default function useUser() {
  const [gateways, setGateways] = useState([]);
  const [singleGateway, setSingleGateway] = useState([]);

  useEffect(() => {
    const fetchGateway = async () => {
      const res = await axios.get(
        "http://178.63.13.157:8090/mock-api/api/gateways"
      );
      setGateways(res.data.data);
    };

    fetchGateway();
  }, [gateways]);

  const handleGatewayFilter = (arr, id) => {
    const record = arr.filter((item) => item.projectId === id);
    setSingleGateway(record);
    alert(JSON.stringify(record));
    return record;
  };

  return {
    gateways,
    handleGatewayFilter,
    singleGateway,
  };
}
