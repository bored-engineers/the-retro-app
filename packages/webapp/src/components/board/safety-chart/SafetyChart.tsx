import React from 'react';
import { XAxis, BarChart, Bar, Cell } from 'recharts';

const CustomizedLabel = ({ x, y, width, height, value }: any) =>
    Boolean(value) ? <text x={x + width / 2} y={y + height / 2} fontSize={13} fontWeight='bold' fill='white' dominantBaseline="middle" textAnchor="middle">{value}</text> : null;


const SafetyChart = ({ data }: { data: any }) => {

    let parsedData = data.reduce(function (acc: any, curr: any) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});

    const graphData: any = [{ name: '1', uv: 1, pv: 0 }, { name: '2', uv: 2, pv: 0 }, { name: '3', uv: 3, pv: 0 }, { name: '4', uv: 4, pv: 0 }, { name: '5', uv: 5, pv: 0 }];

    Object.keys(parsedData).forEach(key => {
        const keyIndex = graphData.findIndex((data: { uv: number; pv: number }) => data.uv === Number.parseInt(key));

        graphData[keyIndex] = { ...graphData[keyIndex], pv: parsedData[key] };
    });

    const COLORS = ['#eb3434', '#eb8334', '#349ceb', '#3468d1', '#34d141',];


    return (
        <BarChart width={220} height={150} data={graphData}
            margin={{ top: 20, right: 10, left: 5, bottom: 20 }}>
            <XAxis label={{ value: "Scores", position: 'insideBottom', offset: -10 }} dataKey="name" axisLine={false} type='category' tickLine={false} />
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