import React from "react";
import WordCloud from "../components/WordCloud";
import PieChart from "../components/PieChart";

import { Col, Row, Container } from "react-bootstrap";

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
            dic["value"] = thing.val
            dic["category"] = thing.category
            output.push(dic)
        })
        return output

    }

    render() {

        return (
            <Container>
                <Row>
                    <Col style={{
                        backgroundColor: "black"

                    }} ><WordCloud data={this.createListForWordCloud("number_old")}></WordCloud></Col>
                    <Col><PieChart></PieChart></Col>

                </Row>
            </Container>

        )


    }
}