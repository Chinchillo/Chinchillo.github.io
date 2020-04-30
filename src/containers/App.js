import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import FilterContainer from "./FilterContainer";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
/* 
App
Mother component that contains all other elements
*/

export class App extends Component {
  render() {
    return (
      <>
        <Header />
        {/*Container for functionality with heigth 100 % */}
        <Container fluid className="h-100">
          <Row >
            {/* here i should probably set the height of the column and not in the map?*/}

            <Col >
              <Map />
            </Col>
            <Col>
              <FilterContainer />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default App;
