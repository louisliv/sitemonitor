import React from "react";

import { Table } from "react-bootstrap";

import { getBytesDisplay } from "../../../utils/utils";

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

          const used = disk.used;
          const left = disk.total - used;

          return (
            <tr key={diskLabel}>
              <td>{diskLabel}</td>
              <td>{getBytesDisplay(used)}</td>
              <td>{getBytesDisplay(left)}</td>
              <td>{getBytesDisplay(disk.total)}</td>
              <td>{disk.percent}%</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}