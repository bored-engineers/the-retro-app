import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const CustomizedLabel = ({ x, y, stroke, value }: any) => {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    );
}

const SafetyChart = ({ data }: { data: any }) => {

    let parsedData = data.reduce(function (acc: any, curr: any) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});

    const graphData: any = [{ 0: 0 }];

    Object.keys(parsedData).forEach(key => {
        graphData.push({ uv: Number.parseInt(key), pv: parsedData[key] });
    });

    return (
        <LineChart width={500} height={300} data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <XAxis type="category" dataKey="uv" />
            <YAxis name="Users" />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />} />
        </LineChart>
    );
}

export default SafetyChart;