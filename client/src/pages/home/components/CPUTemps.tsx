import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import { TempChart } from "../../../components/TempChart";

interface CPUTempsProps {
  data: any;
}

export const CPUTemps = ({data}: CPUTempsProps) => {
  const [temps, setTemps] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const tempsResponse = data;

      setTemps(tempsResponse);
    }
  }, [data]);

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>CPU Temps</Card.Title>
        {temps &&
          <TempChart currentTemperatureData={temps} />
        }
      </Card.Body>
    </Card>
  );
}