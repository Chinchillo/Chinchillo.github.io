import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import NewMap from "../components/NewMap";
import FilterContainer from "./FilterContainer";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import changes from "../data/tmp.json";
/* 
App
Mother component that contains all other elements
*/

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChanges: changes
    };
    this.filterChangesForSimilarity = this.filterChangesForSimilarity.bind(this)
  }

  filterChangesForSimilarity(includeSimilar, start, end) {
    let filteredChanges = changes;

    if (!includeSimilar) {
      filteredChanges = changes.filter(change =>
        change.similarity < 0.9
      )
      console.log("i have filtered for similarity")
    }
    filteredChanges = filteredChanges.filter(change =>
      start <= new Date(change.renaming_date) && new Date(change.renaming_date) <= end
    )

    console.log(filteredChanges.length)
    this.setState({ currentChanges: filteredChanges })

  }



  componentDidMount() {

    //console.table(changes)

  }


  render() {
    return (
      <>
        <Header />
        {/*Container for functionality with heigth 100 % */}
        <Container fluid className="h-100">
          <Row >
            {/* here i should probably set the height of the column and not in the map?*/}

            <Col >
              {/*<Map changes={this.state.currentChanges} />*/}
              <NewMap changes={this.state.currentChanges}></NewMap>

            </Col>
            <Col>
              <FilterContainer filtersimilarity={this.filterChangesForSimilarity} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default App;
