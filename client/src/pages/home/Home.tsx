import React, { useEffect } from "react";

import { Row, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { CPUCard } from "./components/CPUCard";
import { DiskCard } from "./components/DiskCard";
import { DiskTable } from "./components/DiskTable";
import { MemoryCard } from "./components/MemoryCard";
import { CPUTemps } from "./components/CPUTemps";

export const Home = () => {
  const [disks, setDisks] = React.useState<any | null>(null);
  const [cpuUsage, setCpuUsage] = React.useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = React.useState<number | null>(null);
  const [cpuTemps, setCpuTemps] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    async function fetchMonitorData() {
      const response = await fetch("/sitemonitor/api/monitor");
      const data = await response.json();

      setDisks(data.disks);
      setCpuUsage(data.cpu_usage);
      setMemoryUsage(data.percent_mem);
      setCpuTemps(Object.values(data.cpu_temps)[0]);
      setLoading(false);
    }
    setInterval(fetchMonitorData, 1000 * 10)

    fetchMonitorData();
  }, []);


  if (loading) {
    return (
      <Row>
        <Col className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row>
        <Col>
          <h1>Home</h1>
        </Col>
      </Row>
      <Row className="mb-5">
        {cpuUsage && (
          <Col xs={6} md={4}>
            <CPUCard data={cpuUsage} />
          </Col>
        )}
        {disks && (
          <Col xs={6} md={4}>
            <DiskCard data={disks} />
          </Col>
        )}
        {memoryUsage && (
          <Col xs={6} md={4}>
            <MemoryCard data={memoryUsage} />
          </Col>
        )}
      </Row>
      
      <Row className="mb-5">
        {cpuTemps && (  
          <Col>
            <CPUTemps data={cpuTemps} />
          </Col>
        )}
      </Row>

      <Row>
        <Col>
          <h2>Disk Usage Summary</h2>
          <DiskTable data={disks} />
        </Col>
      </Row>
    </>
  );
}
