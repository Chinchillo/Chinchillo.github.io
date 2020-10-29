import 'bootstrap/dist/css/bootstrap.min.css';
import "../../node_modules/react-vis/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";

import Header from "../components/Header";
import NewMap from "../components/NewMap";
import FilterContainer from "./FilterContainer";
import ChartContainer from "./ChartContainer";
import Chart from "../components/Chart";
import { Container, Row, Col } from "react-bootstrap";
import changes from "../data/tmp.json";
import entities from "../data/entities.json";


/* 
App
Mother component that contains all other elements
*/

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChanges: changes,
      quarterData: {},
      entityColors: {},
      oldNamesInVisualization: false, //true: old names, false: new names
    };
    this.filterChangesForSimilarity = this.filterChangesForSimilarity.bind(this)
    this.createDates = this.createDates.bind(this)
    this.createColors = this.createColors.bind(this)
    this.changeOldNewVisualization = this.changeOldNewVisualization.bind(this)

  }

  changeOldNewVisualization(value) {
    this.setState({ oldNamesInVisualization: value })
  }
  filterChangesForSimilarity(includeSimilar, start, end) {
    console.log("START", start, "END", end)
    let filteredChanges = changes;

    if (!includeSimilar) {
      filteredChanges = changes.filter(change =>
        change.similarity < 0.9
      )
    }
    filteredChanges = filteredChanges.filter(change =>
      start <= new Date(change.renaming_date) && new Date(change.renaming_date) <= end
    )
    const number = filteredChanges.length
    toast.success(`Showing ${number} change(s)`)
    this.setState({ currentChanges: filteredChanges })
    this.createDates(filteredChanges);

  }
  /*
  get colors from bootstrap to pass down to charts
  */
  createColors() {
    const style = getComputedStyle(document.body);
    const theme_colors = {};
    theme_colors["other"] = style.getPropertyValue('--secondary');
    theme_colors["date"] = style.getPropertyValue('--success');
    theme_colors["person"] = style.getPropertyValue('--info');
    theme_colors["non-entity"] = style.getPropertyValue('--warning');
    return theme_colors;

  }

  createDates(changes) {
    let renaming_dates = changes.map((x) => (x.renaming_date))
    let tmp = {}
    console.log("my dates?", renaming_dates)
    for (let date of renaming_dates) {
      date = new Date(date)
      let month = date.getMonth() + 1 //e.g. 1

      const year = date.getFullYear()

      let key = month.toString() + "/" + year.toString()
      if (key in tmp) {
        tmp[key] = tmp[key] + 1
      } else {
        tmp[key] = 1
      }

    }
    this.setState({
      quarterData: tmp
    });

  }

  componentDidMount() {
    const colors = this.createColors();
    this.setState({ entityColors: colors })
  }


  render() {

    return (
      <>
        <Header />
        {/*Container for functionality with heigth 100 % */}
        <Container fluid className="h-100">
          <Row >
            {/* here i should probably set the height of the column and not in the map?*/}
            <Col md={8}>
              {/*<Map changes={this.state.currentChanges} />*/}
              <NewMap changes={this.state.currentChanges}></NewMap>

            </Col>
            <Col md={4} >
              <Row style={{ height: 50 }}>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={true}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable={false}
                  pauseOnHover
                />
              </Row>
              <FilterContainer filtersimilarity={this.filterChangesForSimilarity} />
              <br></br>
              <Row style={{ height: 300 }} ><Chart data={this.state.quarterData} /></Row>
            </Col>
          </Row>
          <Row>
            <ChartContainer handleClick={this.changeOldNewVisualization} data={entities} ShowOldNames={this.state.oldNamesInVisualization} colors={this.state.entityColors}></ChartContainer>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
