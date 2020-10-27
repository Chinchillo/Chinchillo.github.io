import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



//mock data
const data = [
    { name: 'People', value: 400 },
    { name: 'dates', value: 300 },
    { name: 'other entities', value: 300 },
    { name: 'no entities', value: 200 },
];


export default class MyPieChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            colors: []
        }
        this.createColors = this.createColors.bind(this)

    }

    createColors() {
        const style = getComputedStyle(document.body);
        const theme_colors = [];

        //theme_colors.push(style.getPropertyValue('--primary'));
        theme_colors.push(style.getPropertyValue('--secondary'));
        theme_colors.push(style.getPropertyValue('--success'));
        theme_colors.push(style.getPropertyValue('--info'));
        theme_colors.push(style.getPropertyValue('--warning'));
        //theme_colors.push(style.getPropertyValue('--danger'));
        //theme_colors.push(style.getPropertyValue('--light'));
        //theme_colors.push(style.getPropertyValue('--dark'));
        return theme_colors;

    }
    componentDidMount() {
        const colors = this.createColors()
        this.setState({ colors: colors })
    }

    render() {
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
                        data.map((entry, index) => <Cell fill={this.state.colors[index % this.state.colors.length]} />)
                    }
                </Pie>

            </PieChart >

        );
    }
}
