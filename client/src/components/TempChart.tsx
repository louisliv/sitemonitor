import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TempChartProps {
  currentTemperatureData: any;
}

export const TempChart = ({currentTemperatureData}: TempChartProps) => {
  const [data, setData] = React.useState<any[]>([]);
  const [highTemp, setHighTemp] = React.useState<number | null>(null);

  React.useEffect(() => {
    var slicedData = currentTemperatureData.data.slice(Math.max(currentTemperatureData.data.length - 10, 0));
    
    setHighTempData(slicedData, currentTemperatureData.high_temp);

    setHighTemp(currentTemperatureData.high_temp + 10);
    
    if (slicedData) {
      setData((slicedData));
    }
  }, [currentTemperatureData]);

  const setHighTempData = (data: any[], highTemp: number) => {
    data.forEach((dataPoint: any) => {
      dataPoint.highTemp = highTemp;
    });
  }

  return (
    <ResponsiveContainer height={200} width="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        syncId="anyId"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={highTemp? [0, highTemp]: [0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 10 }} strokeWidth={5} />
        <Line type="monotone" dataKey="highTemp" stroke="#f44336" strokeWidth={5} />
      </LineChart>
    </ResponsiveContainer>
  );
}