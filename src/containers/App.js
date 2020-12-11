import 'bootstrap/dist/css/bootstrap.min.css';
import "../../node_modules/react-vis/dist/style.css";
import 'react-toastify/dist/ReactToastify.css';
import * as L from 'leaflet';
import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import NewMap from "../components/NewMap";
import FilterContainer from "./FilterContainer";
import ChartContainer from "./ChartContainer";
import Chart from "../components/Chart";
import { Link } from "react-scroll";
import { Container, Row, Col, Badge, Button, Alert, Jumbotron } from "react-bootstrap";

import changes from "../data/full_data_2010-now.json"; //actual renaming data
//import tmp from "../data/tmp.json"

/* 
App
Mother component that contains all other elements
*/

export class App extends Component {

  constructor(props) {
    super(props);
    this.mapHeight = window.innerWidth >= 992 ? (0.9 * window.innerHeight) : 300
    //colors from bootstrap stylesheet
    this.entityColors = {}
    //date filter start date set on first page load
    this.startFilteringDate = new Date('2019-01-01T00:00:00'),
      //date filter end date set on first page load
      this.endFilteringDate = new Date('2019-02-01T00:00:00'),
      //initial map section
      this.initialBounds =
      L.latLngBounds(L.latLng(49.767, 9.733), L.latLng(54.572, 28.938)),
      this.filterChangesForSimilarity = this.filterChangesForSimilarity.bind(this)
    this.createDateSeries = this.createDateSeries.bind(this)
    this.createColors = this.createColors.bind(this)
    this.createEntities = this.createEntities.bind(this)
    this.filterChangesByMapSection = this.filterChangesByMapSection.bind(this)
    this.state = {
      changesFilteredByDate: this.filterChangesForSimilarity(false, this.startFilteringDate, this.endFilteringDate),
      changesFilteredByMap: []
    }
  }

  componentDidMount() {
    this.entityColors = this.createColors()
    this.filterChangesByMapSection(this.initialBounds)
  }

  componentDidUpdate() {
    //console.log("filteredByDate: ", this.state.changesFilteredByDate)
    //console.log("changes filtered by map: ", this.state.changesFilteredByMap)
  }

  createEntities() {
    let entities = []
    for (let change of this.state.changesFilteredByMap) {
      const new_dic = entities.find(element => element.title == change.title_new)
      if (new_dic === undefined) {
        const dic = {
          "title": change.title_new,
          "category": change.category_new,
          "numberOld": 0,
          "numberNew": 1
        }
        entities.push(dic)
      } else {
        new_dic.numberNew = new_dic.numberNew + 1
      }
      const old_dic = entities.find(element => element.title == change.title_old)
      if (old_dic === undefined) {
        const dic = {
          "title": change.title_old,
          "category": change.category_old,
          "numberOld": 1,
          "numberNew": 0
        }
        entities.push(dic)
      } else {
        old_dic.numberOld = old_dic.numberOld + 1
      }
    }
    return entities
  }

  filterChangesByMapSection(map_coordinates) {
    let changesFilteredByMapSection = []
    try {
      this.state.changesFilteredByDate.forEach((change) => {
        if (typeof change.lat !== "undefined") {
          if (map_coordinates.contains({ "lat": change.lat, "lon": change.lon })) {
            changesFilteredByMapSection.push(change)
          }
        } else {
          //TODO: what about them?
        }
      })
    } catch {

    }
    this.setState({ changesFilteredByMap: changesFilteredByMapSection })

  }




  filterChangesForSimilarity(includeSimilar, start, end) {
    let filteredChanges = changes;
    //filter cases where old and new name are very similar
    if (!includeSimilar) {
      filteredChanges = changes.filter(change =>
        change.similarity < 0.85
      )
    }
    //filter for date of renaming
    filteredChanges = filteredChanges.filter(change =>
      start <= new Date(change.renaming_date) && new Date(change.renaming_date) <= end
    )
    const number = filteredChanges.length
    this.setState({ changesFilteredByDate: filteredChanges })
    return filteredChanges
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

  //map dates and renamings that happened on the date
  createDateSeries() {
    let renaming_dates = this.state.changesFilteredByMap.map((x) => (x.renaming_date))
    let changesPerMonth = []
    for (let date of renaming_dates) {
      const date_strings = date.split("-")
      const year_and_month = date_strings[0] + "-" + date_strings[1]
      const foundElement = changesPerMonth.find(element => element[0] === year_and_month)
      if (foundElement !== undefined) {
        foundElement[1] = foundElement[1] + 1
      } else {
        const item = [year_and_month, 1]
        changesPerMonth.push(item)
      }
    }
    return changesPerMonth
  }

  render() {

    return (
      <>
        <Header />
        {/*Container for functionality with heigth 100 % */}
        <Container fluid className="h-100">
          <Row >

            {/* here i should probably set the height of the column and not in the map?*/}
            <Col md={9} style={{ zIndex: 0 }}>
              <NewMap height={this.mapHeight} changes={this.state.changesFilteredByDate} onMapChange={this.filterChangesByMapSection}></NewMap>

            </Col>
            <Col md={3} style={{ zIndex: 2, backgroundColor: 'rgba(255,255,255,0.3)' }}>

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

              <Row>

                <h4>{`Showing ${this.state.changesFilteredByMap.length} renamings`}</h4>

              </Row>
              <Row>
                <FilterContainer startFilteringDate={this.startFilteringDate} endFilteringDate={this.endFilteringDate} filtersimilarity={this.filterChangesForSimilarity} />
              </Row>
              <br></br>
              <Row style={{ height: 300, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: "10px" }}> <Chart data={this.createDateSeries()} /></Row>
              <Row>



                <Button block className="mt-4 collapsible" variant="outline-success" href=""><Link activeClass="active" spy={true} to="chartContainer" smooth={true}>Explore renamings &#8650; </Link></Button>



              </Row>
            </Col>
          </Row>
          <Row id="chartContainer">
            <ChartContainer data={this.createEntities()} colors={this.entityColors}></ChartContainer>
          </Row>

        </Container>
      </>
    );
  }
}

export default App;
