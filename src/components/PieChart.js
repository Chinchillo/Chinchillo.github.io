import React from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


export default class MyPieChart extends React.Component {

    constructor(props) {
        super(props)

    }



    render() {
        const data = this.props.data
        return (
            < PieChart width={400} height={400} onMouseEnter={this.onPieEnter} className="mx-auto">
                <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    nameKey="name"
                    fill="#8884d8"
                    paddingAngle={5}
                    label={entry => entry.name}
                >
                    {
                        data.map((entry) => <Cell fill={this.props.colors[entry.name]} />)
                    }
                </Pie>
                <Tooltip />

            </PieChart >

        );
    }
}
