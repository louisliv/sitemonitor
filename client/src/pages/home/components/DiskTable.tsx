import React from "react";

import { Table } from "react-bootstrap";

import { getNumberFromString } from "../../../utils/utils";

interface DiskTableProps {
  data: any;
}

export const DiskTable = ({data}: DiskTableProps) => {
  const [disks, setDisks] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (data) {
      const disks = data;

      setDisks(disks);
    }
  }, [data]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Disk</th>
          <th>Used</th>
          <th>Left</th>
          <th>Total</th>
          <th>Percent</th>
        </tr>
      </thead>
      <tbody>
        {disks && Object.keys(disks).map((diskLabel: string) => {
          const disk = disks[diskLabel];

          const used = getNumberFromString(disk.used, 1);
          const left = `${(getNumberFromString(disk.total, 1) - used).toFixed(1)}GB`;

          return (
            <tr key={diskLabel}>
              <td>{diskLabel}</td>
              <td>{disk.used}</td>
              <td>{left}</td>
              <td>{disk.total}</td>
              <td>{disk.percent}%</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}