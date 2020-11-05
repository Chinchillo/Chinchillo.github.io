import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
//import SimilarityFilter from "../components/SimilarityFilter";
import DateFilter from "../components/DateFilter";
import { toast } from "react-toastify";


export default class FilterContainer extends React.Component {

    constructor(props) {
        super(props);
        this.earliestPossibleDate = new Date('2019-01-01T00:00:00'), //earliest date for dropdown
            this.latestPossibledate = new Date('2019-12-31T00:00:00'), //latest date for dropdown

            //it has state, because information is not lifted up at once, only at button click
            this.state = {
                includeSimilarNames: false, //should similar names be included
                startFilteringDate: new Date('2019-01-01T00:00:00'), //currently set start date
                endFilteringDate: new Date('2019-02-01T00:00:00') //currently set end date
            };
        this.HandleClick = this.HandleClick.bind(this)
        this.setIncludeSimilarNames = this.setIncludeSimilarNames.bind(this)
        this.setStartDate = this.setStartDate.bind(this)
        this.setEndDate = this.setEndDate.bind(this)
    }

    componentWillMount() {
        this.HandleClick();
    }

    HandleClick() {
        const { includeSimilarNames, startFilteringDate, endFilteringDate } = this.state
        if (startFilteringDate > endFilteringDate) {
            toast("'To Date' has to be after the 'Start Date'")
        } else {
            //lift filtered data up
            this.props.filtersimilarity(includeSimilarNames, startFilteringDate, endFilteringDate)
        }
    }

    setIncludeSimilarNames() {
        const tmp = this.state.includeSimilarNames
        this.setState({ includeSimilarNames: !tmp })
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
                    <DateFilter alert={this.setStartDate} headline={"From Date:"} startDate={this.earliestPossibleDate} endDate={this.latestPossibledate} selectedDate={this.state.startFilteringDate} />
                </Row>
                <Row>

                    <DateFilter alert={this.setEndDate} headline={"To Date:"} startDate={this.earliestPossibleDate} endDate={this.latestPossibledate} selectedDate={this.state.endFilteringDate} />
                </Row>

                {/*<Row>
                    <Col className="mt-md-3">
                        <SimilarityFilter checked={this.state.includeSimilarNames} checkboxClicked={this.setIncludeSimilarNames} />
                    </Col>
                </Row>*/}
                <Row className=" mt-3 mb-1 ml-1" >
                    <Button onClick={this.HandleClick}>Apply</Button>

                </Row>
            </Container >)
    }
}

