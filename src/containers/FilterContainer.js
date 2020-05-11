import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import SimilarityFilter from "../components/SimilarityFilter";
import DateFilter from "../components/DateFilter";


export default class FilterContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            includeSimilarNames: false, //should similar names be included
            earliestPossibleDate: new Date('2006-01-01T00:00:00'), //earliest date for dropdown
            latestPossibledate: new Date(), //latest date for dropdown
            startFilteringDate: new Date('2020-01-01T00:00:00'), //currently set start date
            endFilteringDate: new Date() //currently set end date
        };
        this.HandleClick = this.HandleClick.bind(this)
        this.setIncludeSimilarNames = this.setIncludeSimilarNames.bind(this)
        this.setStartDate = this.setStartDate.bind(this)
        this.setEndDate = this.setEndDate.bind(this)
    }

    componentDidMount() {
        this.HandleClick();
    }

    HandleClick() {
        const { includeSimilarNames, startFilteringDate, endFilteringDate } = this.state
        if (startFilteringDate > endFilteringDate) {
            toast("'To Date' has to be after the 'Start Date'")
        } else {
            this.props.filtersimilarity(includeSimilarNames, startFilteringDate, endFilteringDate)
        }
        // TODO: error handling: if from is after to date
    }

    setIncludeSimilarNames() {
        const tmp = this.state.includeSimilarNames
        this.setState({ includeSimilarNames: !tmp })
        //console.log("Include similar names ? :", this.state.includeSimilarNames)
    }
    setStartDate(date) {
        this.setState({ startFilteringDate: date })
    }
    setEndDate(date) {
        this.setState({ endFilteringDate: date })
    }


    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <DateFilter alert={this.setStartDate} headline={"From Date:"} startDate={this.state.earliestPossibleDate} endDate={this.state.latestPossibledate} selectedDate={this.state.startFilteringDate} />
                    </Col>
                    <Col>
                        <DateFilter alert={this.setEndDate} headline={"To Date:"} startDate={this.state.earliestPossibleDate} endDate={this.state.latestPossibledate} selectedDate={this.state.endFilteringDate} />
                    </Col>

                </Row>
                <Row>
                    <Col className="mt-md-3">
                        <SimilarityFilter checked={this.state.includeSimilarNames} checkboxClicked={this.setIncludeSimilarNames} />
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-md-3"> <Button onClick={this.HandleClick}>Apply</Button></Col>

                </Row>
            </Container>)
    }
}

