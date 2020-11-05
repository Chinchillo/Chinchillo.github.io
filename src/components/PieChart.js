import React from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


export default class MyPieChart extends React.Component {

    constructor(props) {
        super(props)

    }



    render() {
        const data = this.props.data
        console.log("Pie Chart Data: ", data)
        return (
            < PieChart width={400} height={400} onMouseEnter={this.onPieEnter} className="mx-auto">
                <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={80}
                    nameKey="name"
                    fill="#8884d8"
                    paddingAngle={5}
                    label={entry => entry.name}
                >
                    {
                        data.map((entry, index) => <Cell fill={this.props.colors[entry.name]} key={index} />)
                    }
                </Pie>
                <Tooltip />

            </PieChart >

        );
    }
}
