import React from "react";
import WordCloud from "../components/WordCloud";
import PieChart from "../components/PieChart";

import { Col, Row, Container, Button } from "react-bootstrap";

export default class ChartContainer extends React.Component {
    constructor(props) {
        super(props);

        this.createListForWordCloud = this.createListForWordCloud.bind(this)
    }

    createListForWordCloud(val) {
        let data = this.props.data
        let output = []
        data.forEach(function (thing) {
            let dic = {}
            dic["text"] = thing.title
            dic["value"] = thing[val]
            dic["category"] = thing.category
            dic["wiki_title"] = thing.wiki_title
            output.push(dic)
        })
        return output

    }

    render() {
        return (
            <Container fluid>
                <Row className="mb-2 mt-3 justify-content-md-center">
                    <Button className="mr-3" size="lg">Show Old Names</Button>{' '}
                    <Button size="lg">Show New Names</Button></Row>
                <Row >
                    <Col md={6}>
                        <WordCloud data={this.createListForWordCloud("number_old")} colors={this.props.colors}>
                        </WordCloud>
                    </Col>

                    <Col md={6}>
                        <PieChart colors={this.props.colors}></PieChart>
                    </Col>

                </Row>

            </Container >
        )


    }
}