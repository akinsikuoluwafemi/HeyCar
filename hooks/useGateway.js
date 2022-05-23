import react, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUser() {
  const [gateways, setGateways] = useState([]);
  const [singleGateway, setSingleGateway] = useState([]);
  const [isGatewayError, setIsGatewayError] = useState(false);

  const notify = (errorMessage) => toast.error(errorMessage);

  useEffect(() => {
    const fetchGateway = async () => {
      try {
        const res = await axios.get(
          "http://178.63.13.157:8090/mock-api/api/gateways"
        );
        setIsGatewayError(false);
        setGateways(res.data.data);
      } catch (err) {
        console.error(err.message);
        setIsGatewayError(true);
        notify("An error occurred");
      }
    };

    fetchGateway();
  }, [gateways]);

  const handleGatewayFilter = (arr, id) => {
    const record = arr.filter((item) => item.gatewayId === id);
    setSingleGateway(record);

    return record;
  };

  return {
    gateways,
    handleGatewayFilter,
    singleGateway,
    isGatewayError,
    setIsGatewayError,
  };
}
