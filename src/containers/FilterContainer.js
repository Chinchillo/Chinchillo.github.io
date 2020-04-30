import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import SimilarityFilter from "../components/SimilarityFilter";
import DateFilter from "../components/DateFilter";


export default class FilterContainer extends React.Component {
    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <DateFilter />
                    </Col>
                    <Col><DateFilter /></Col>

                </Row>
                <Row>
                    <Col className="mt-md-3">
                        <SimilarityFilter />
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-md-3"> <Button >Apply</Button></Col>

                </Row>
            </Container>)
    }
}

