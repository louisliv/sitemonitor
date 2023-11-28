import React from "react";

import { Card } from "react-bootstrap";

import { PercentagePieChart } from "../../../components/PercentagePieChart";

interface MemoryCardProps {
  data: number;
}

export const MemoryCard = ({data}: MemoryCardProps) => {
  const [percentage, setPercentage] = React.useState<number | null>(null);
  const [used, setUsed] = React.useState<number | null>(null);
  const [left, setLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (data) {
      const memoryUsage = data;

      setPercentage(memoryUsage);

      setUsed(memoryUsage);
      setLeft(100 - memoryUsage);
    }
  }, [data]);

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>Memory Usage</Card.Title>
        {(percentage && used && left) &&
          <PercentagePieChart percentage={percentage} used={used} left={left} />
        }
      </Card.Body>
    </Card>
  );
}