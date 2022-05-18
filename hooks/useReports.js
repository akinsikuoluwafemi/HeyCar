import react, { useState, useEffect } from "react";
import axios from "axios";

export default function useReports() {
  const [from, setFrom] = useState("2021-01-01");
  const [to, setTo] = useState("2021-12-31");
  const [projectId, setProjectId] = useState("bgYhx");
  const [gatewayId, setGatewayId] = useState("i6ssp");
  const [reports, setReports] = useState([]);

  const handleSetFrom = (startdate) => {
    setFrom(startdate);
    console.log(startdate);
  };
  const handleTo = (enddate) => {
    setTo(enddate);
    console.log(enddate);
  };

  const handleSetProjectId = (id = "") => {
    setProjectId(id);
    console.log(id);
  };
  const handleSetGatewayId = (id = "") => {
    setGatewayId(id);
    console.log(id);
  };

  useEffect(() => {
    const fetchReports = async (from, to, projectId, gatewayId) => {
      const res = await axios.post(
        "http://178.63.13.157:8090/mock-api/api/report",
        {
          from,
          to,
          projectId,
          gatewayId,
        }
      );
      setReports(res.data.data);
    };
    fetchReports(from, to, projectId, gatewayId);
  }, [from, to, projectId, gatewayId]);

  return {
    reports,
    handleSetFrom,
    handleTo,
    handleSetProjectId,
    handleSetGatewayId,
  };
}
