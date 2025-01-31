import React from "react";
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries, Hint, MarkSeries } from 'react-vis';
import AutoSizer from "react-virtualized-auto-sizer";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highest_number: 1,
            value: null
        }
        this.createData = this.createData.bind(this)
        this.createYearData = this.createYearData.bind(this)
        this.createBullshitDataForLineChart = this.createBullshitDataForLineChart.bind(this)
        this.createZeroRenamingsMonths = this.createZeroRenamingsMonths.bind(this)
    }

    _forgetValue = () => {
        this.setState({
            value: null
        });
    };

    _rememberValue = value => {
        this.setState({ value });
    };

    createZeroRenamingsMonths(data) {

        let return_value = [...data]
        const firstDate = data[0][0]
        const lastDate = data[data.length - 1][0]
        let current = firstDate
        while (current !== lastDate) {
            const split = current.split("-")
            const [year, month] = [split[0], split[1]]
            if (month === "12") {
                current = parseInt(year) + 1 + "-01"
            } else {
                current = year + "-" + ("00" + (parseInt(month) + 1)).slice(-2)
            }
            const found = data.find(elem => elem[0] == current)
            if (found === undefined) {
                return_value.push([current, 0])
            }
        }
        return_value.sort()
        return return_value


    }

    createData() {
        //data, filtered by month. '2019-01" as string
        let data = this.props.data

        if (data.length > 0) {
            data.sort()
            let TimeDifference = 0
            const firstDate = new Date(data[0][0])
            const lastDate = new Date(data[data.length - 1][0])
            TimeDifference = Math.abs((firstDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24))
            //ca 1 to 13 months, most common case
            if (390 >= TimeDifference && TimeDifference > 35) {
                return this.createZeroRenamingsMonths(data)
            }
            //more than 12 months
            else if (TimeDifference > 390) {
                return this.createYearData(data)
            }
            return data

        }
        return [["no data", 0]]
    }

    createYearData() {
        let data = []
        this.props.data.forEach(function (item) {
            const year = item[0].substring(0, 4)
            const foundElement = data.find(element => element[0] === year)
            if (foundElement !== undefined) {
                foundElement[1] = foundElement[1] + item[1]
            } else {
                const year_and_number = [year, item[1]]
                data.push(year_and_number)
            }
        })

        return data
    }
    componentDidUpdate() {

    }

    createBullshitDataForLineChart() {

        let max_renamings = [null, -1]
        this.createData().forEach(elem => {
            if (elem[1] > max_renamings[1]) { max_renamings = elem }
        })
        const zero = [max_renamings[0], 0]
        const big = [max_renamings[0], max_renamings[1] + 5]
        return [zero, big]
    };


    render() {
        const { value } = this.state;
        const primary = getComputedStyle(document.body).getPropertyValue('--primary')

        return (
            <AutoSizer >
                {({ height, width }) => (

                    <XYPlot margin={{ bottom: 70, top: 20, left: 25, right: 25 }} height={height} width={width} getX={d => d[0]}
                        getY={d => d[1]} xType="ordinal" >
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={-90} title="Time" />
                        <YAxis title="Number of renamings" />

                        <LineMarkSeries

                            markStyle={{ fill: primary }}
                            data={this.createData()}
                            onValueMouseOver={this._rememberValue}
                            onValueMouseOut={this._forgetValue}
                        />
                        <LineMarkSeries
                            data={this.createBullshitDataForLineChart()} style={{ display: 'none' }}
                        ></LineMarkSeries>


                        {value ? <Hint value={value}>
                            <div className="rv-hint__content">
                                {value[0]}
                                <br></br>
                                {`Renamings: ${value[1]}`}
                            </div>
                        </Hint> : null}





                    </XYPlot>)}
            </AutoSizer >
        );
    }
}