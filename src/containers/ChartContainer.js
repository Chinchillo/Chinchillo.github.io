import React from "react";
import WordCloud from "../components/WordCloud";
import PieChart from "../components/PieChart";

import { Col, Row, Container, Button } from "react-bootstrap";

export default class ChartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldNamesInVisualization: false, //true: old names, false: new names
        };
        this.createListForWordCloud = this.createListForWordCloud.bind(this)
        this.createListForPieChart = this.createListForPieChart.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value) {
        this.setState({ oldNamesInVisualization: value })
    }

    createListForWordCloud() {
        const filter = this.state.oldNamesInVisualization ? "numberOld" : "numberNew"
        let output = []

        this.props.data.forEach(function (thing) {
            if (thing[filter] > 0) {
                let dic = {}
                dic["text"] = thing.title
                dic["value"] = thing[filter]
                dic["category"] = thing.category
                if (!(thing.title === undefined || thing.category === undefined)) {
                    output.push(dic)
                }

            }

        })
        return output
    }

    createListForPieChart() {
        // take old or new streets, according to user selection
        const filter = this.state.oldNamesInVisualization ? "numberOld" : "numberNew"
        let output = []
        this.props.data.forEach(function (thing) {
            //check if at least one street was named after entity
            if (thing[filter] > 0 && !(thing.category == undefined)) {
                const elementsIndex = output.findIndex(element => element.name == thing.category)
                //first occurence
                if (elementsIndex < 0) {
                    let dic = {}
                    dic["name"] = thing.category
                    dic["value"] = 1
                    output.push(dic)

                    //any later occurence of entity
                } else {
                    output[elementsIndex].value = output[elementsIndex].value + 1
                }
            }
        })
        return output
    }

    render() {
        return (
            <Container fluid>
                <Row className="mb-2 mt-3 justify-content-md-center">
                    <Button className="mr-3" size="lg" active={this.state.oldNamesInVisualization} onClick={(e) => this.handleClick(true, e)}>Show Old Names</Button>{' '}
                    <Button size="lg" active={!this.state.oldNamesInVisualization} onClick={(e) => this.handleClick(false, e)}>Show New Names</Button>
                </Row>
                <Row >
                    <Col md={8}>
                        <WordCloud data={this.createListForWordCloud()} colors={this.props.colors}>
                        </WordCloud>
                    </Col>

                    <Col md={4}>
                        <PieChart data={this.createListForPieChart()} colors={this.props.colors}></PieChart>
                    </Col>

                </Row>

            </Container >
        )


    }
}