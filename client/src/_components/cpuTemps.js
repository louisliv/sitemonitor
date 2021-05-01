import React from 'react';

import { 
    VictoryChart, 
    VictoryLine, 
    VictoryAxis,
    VictoryLegend
} from "victory";

const CpuTempsChart = ({ cpuTemps }) => {
    const getData = () => {
        return cpuTemps.data.map((datum) => {
            return {
                x: datum.time,
                y: datum.temp
            }
        })
    }

    const getHighTempData = () => {
        var highTemps = []
        
        for (var i =0; i < cpuTemps.data.length; i++) {
            highTemps.push({
                x: i+1,
                y: cpuTemps.high_temp
            })
        }

        return highTemps
    }

    return (
        <div style={{ height: 400 }}>
            <VictoryChart
                style={{
                    parent: {
                        backgroundColor: '#6c757d',
                        border: '1px solid rgba(0,0,0,.125)',
                        borderRadius: '.25rem'
                    },
                    axis: {
                        tickLabels: {fill:'white',angle: 45},
                    }
                }}>
                <VictoryAxis
                    style={{ 
                        axis: { stroke: '#E0F2F1' },
                        ticks: { stroke: '#ccc' },
                        tickLabels: { fontSize: 10, fill: '#E0F2F1' },
                        grid: { stroke: '#B3E5FC', strokeWidth: 0.25 }
                    }} dependentAxis
                />
                <VictoryAxis
                    style={{ 
                        axis: { stroke: '#E0F2F1' },
                        ticks: { stroke: '#ccc' },
                        tickLabels: { fontSize: 8, fill: '#E0F2F1', angle: 90, padding:20 }
                    }}
                />
                <VictoryLine
                    data={getData()}
                    style={{
                        data: { stroke: "black" },
                        parent: { border: "1px solid #ccc"},
                        textAnchor:'start',
                    }}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 2000 }
                    }}
                    range={{ y: [0, (cpuTemps.high_temp + 20)] }}
                    domain={{y: [0, (cpuTemps.high_temp + 20)]}}
                />
                <VictoryLine
                    data={getHighTempData()}
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"},
                        textAnchor:'start',
                    }}
                />
                <VictoryLegend 
                    orientation="horizontal"
                    colorScale={[ "#c43a31", 'black' ]}
                    data={[{ name: "High Temp" }, { name: "Temp History" }]}
                    style={{
                        labels: {
                            fill: '#E0F2F1',
                            fontSize: 10,
                            padding: 50
                        }
                    }}
                    gutter={{ right: 30 }}
                />
            </VictoryChart>
        </div>
    )
}

export default CpuTempsChart;