import React from 'react';
import { XAxis, YAxis, BarChart, CartesianGrid, Bar, Cell } from 'recharts';

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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <BarChart width={400} height={300} data={graphData} barGap="0" barCategoryGap={0}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="uv" />
            <YAxis />
            <Bar dataKey="pv" fill="#8884d8" label={<CustomizedLabel />}>
                {
                    graphData.map((entry: any, index: any) => {
                        const color = COLORS[index]
                        return <Cell fill={color} />;
                    })
                }
            </Bar>
        </BarChart>
    );
}

export default SafetyChart;