import React from "react";

import { PercentagePieChart } from "./PercentagePieChart";
import { getNumberFromString } from "../utils/utils";

interface DiskProps {
  diskLabel: string;
  data: any;
}

export const Disk = ({diskLabel, data}: DiskProps) => {
  const [percentage, setPercentage] = React.useState<number | null>(null);
  const [used, setUsed] = React.useState<number | null>(null);
  const [left, setLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    console.log(data);
    if (data) {
      const disk = data;
      setPercentage(disk.percent);

      const usedResponse = getNumberFromString(disk.used);
      const leftResponse = getNumberFromString(disk.total) - usedResponse;

      setUsed(usedResponse);
      setLeft(leftResponse);
    }
  }, [data]);

  return (
    <div className="d-flex flex-column">
      <div>{diskLabel}</div>
      {(percentage && used && left) &&
        <PercentagePieChart percentage={percentage} used={used} left={left} />
      }
    </div>
  );
}