import React, { useState, useEffect } from "react";

import { Row, Col, Table } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import api from "../../utils/api";

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSystemInfo() {
      const response = await api.get("/system-info");
      const data = await response.data;
      setSystemInfo(data);
      setLoading(false);
    }
    getSystemInfo();
  }, []);

  if (loading) {
    return (
      <Row>
        <Col className="text-center mt-5">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col>
        <h1>System Info</h1>
        <Table striped bordered hover>
          <tbody>
            {Object.keys(systemInfo).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{systemInfo[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}