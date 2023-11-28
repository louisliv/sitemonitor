import React from "react";

import { Card } from "react-bootstrap";

import { PercentagePieChart } from "../../../components/PercentagePieChart";

interface CPUCardProps {
  data: number;
}

export const CPUCard = ({data}: CPUCardProps) => {
  const [percentage, setPercentage] = React.useState<number | null>(null);
  const [used, setUsed] = React.useState<number | null>(null);
  const [left, setLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (data) {
      const cpuUsage = data;

      setPercentage(cpuUsage);

      setUsed(cpuUsage);
      setLeft(100 - cpuUsage);
    }
  }, [data]);

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>CPU Usage</Card.Title>
        {(percentage && used && left) &&
          <PercentagePieChart percentage={percentage} used={used} left={left} />
        }
      </Card.Body>
    </Card>
  );
}