import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



//hier kommen die kategorien mit der anzahl der umbenennungen
const data = [
    { name: 'People', value: 400 },
    { name: 'dates', value: 300 },
    { name: 'other entities', value: 300 },
    { name: 'no entities', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default class MyPieChart extends React.Component {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        nameKey="name"
                        fill="#8884d8"
                        paddingAngle={5}
                        label={entry => entry.name}
                    >
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>

                </PieChart>
            </ResponsiveContainer>
        );
    }
}
