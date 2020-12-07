import React from "react";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart
} from "react-timeseries-charts";

export default class DateChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.data.timerange())

        return (
            <ChartContainer timeRange={this.props.data.range()} width={800}>
                <ChartRow height="200">
                    <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" />
                    <Charts>
                        <LineChart axis="axis1" series={this.props.data} column={["aud"]} />
                    </Charts>
                </ChartRow>
            </ChartContainer>
        );
    }
}