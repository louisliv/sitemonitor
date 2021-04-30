import React from 'react';

import { ResponsivePie } from '@nivo/pie'

const styles = {
    overlay: {
        position: "absolute",
        inset: '0px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        textAlign: "center",
        pointerEvents: "none",
        width: '100%'
    },
    secondLabel: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        textAlign: "center",
        pointerEvents: "none",
        width: '100%'
    }
};

const getSliceColor = slice => slice.data.color;

const PercentPieChart = ({ systemData , secondaryLabel}) => {  
    console.log(secondaryLabel)
    const getData = () => {

        return [
            {
              "id": 1,
              "label": "",
              "value": systemData,
              "color": getColor()
            },
            {
              "id": 2,
              "label": "",
              "value": (100 - systemData),
              "color": "#EEEEEE"
            },
        ]
    }

    const getColor = () => {
        var rounded = Math.round((100 - Math.round(systemData)) * 150 / 100)
        return `hsl(${rounded}, 100%, 50%)`;
    }
    
    return (
        <div>
            <div style={{ height: 200 }}>
                <ResponsivePie 
                    data={getData()}
                    innerRadius={.7}
                    padAngle={0.7}
                    cornerRadius={0}
                    activeOuterRadiusOffset={0}
                    enableArcLabels={false}
                    enableArcLinkLabels={false}
                    isInteractive={false}
                    borderWidth={2}
                    borderColor={{ from: 'color'}}
                    colors={getSliceColor}
                    startAngle={-120}
                    endAngle={120}
                />
                <div style={styles.overlay}>
                    <span>{`${systemData}%`}</span>
                </div>
            </div>
            <div className="text-center">
                <span>{secondaryLabel}</span>
            </div>
        </div>
    )
}

export default PercentPieChart;