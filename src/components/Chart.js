import React from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import AutoSizer from "react-virtualized-auto-sizer";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this)
    }

    createData() {
        let data = []
        for (const [key, value] of Object.entries(this.props.data)) {
            let obj = {
                x: key,
                y: value
            }
            data.push(obj)
        }
        data.sort((a, b) => (a.x > b.x) ? 1 : -1)
        console.log("chart data", data)
        return data
    }

    render() {
        return (
            <AutoSizer>
                {({ height, width }) => (

                    <XYPlot height={height} width={width} xType="ordinal">
                        <LineSeries data={this.createData()} />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <XAxis title="Period of time (year/quarter)" />
                        <YAxis title="Number of renamings" />

                    </XYPlot>)}
            </AutoSizer >
        );
    }
}