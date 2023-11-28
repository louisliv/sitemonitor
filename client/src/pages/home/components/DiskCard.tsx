import React from "react";

import { Card } from "react-bootstrap";

import { PercentagePieChart } from "../../../components/PercentagePieChart";

import { getNumberFromString } from "../../../utils/utils";

interface DiskCardProps {
  data: any;
}

export const DiskCard = ({data}: DiskCardProps) => {
  const [percentage, setPercentage] = React.useState<number | null>(null);
  const [used, setUsed] = React.useState<number | null>(null);
  const [left, setLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (data) {
      const disks = data;

      let usedAll = 0;
      let leftAll = 0;

      Object.keys(disks).forEach((diskLabel: string) => {
        const disk = disks[diskLabel];

        const usedResponse = getNumberFromString(disk.used);
        const leftResponse = getNumberFromString(disk.total) - usedResponse;

        usedAll += usedResponse;
        leftAll += leftResponse;
      });

      setPercentage(Math.round(usedAll / (usedAll + leftAll) * 100));

      setUsed(usedAll);
      setLeft(leftAll);
    }
  }, [data]);

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title>All disks usage</Card.Title>
        {(percentage && used && left) &&
          <PercentagePieChart percentage={percentage} used={used} left={left} />
        }
      </Card.Body>
    </Card>
  );
}
