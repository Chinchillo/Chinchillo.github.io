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
import changes from "../data/data.json"; //actual renaming data


/* 
App
Mother component that contains all other elements
*/

export class App extends Component {

  constructor(props) {
    super(props);
    this.entityColors = {} //colors from bootstrap stylesheet
    this.state = {
      currentChanges: changes, //current changes, filtered by date
      changesFilteredByMap: [] //changes filtered by map
    };
    this.filterChangesForSimilarity = this.filterChangesForSimilarity.bind(this)
    this.createQuarterData = this.createQuarterData.bind(this)
    this.createColors = this.createColors.bind(this)
    this.createEntities = this.createEntities.bind(this)
    this.filterChangesByMapSection = this.filterChangesByMapSection.bind(this)
  }

  componentDidMount() {
    this.entityColors = this.createColors()
    this.createEntities()
  }

  componentDidUpdate() {
    //console.log("current changes ", this.state.currentChanges)
    //console.log("filtered by map ", this.state.changesFilteredByMap)
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
    this.state.currentChanges.forEach((change) => {
      if (map_coordinates.contains({ "lat": change.lat, "lon": change.lon })) {
        changesFilteredByMapSection.push(change)
      }
    })
    this.setState({ changesFilteredByMap: changesFilteredByMapSection })
  }




  filterChangesForSimilarity(includeSimilar, start, end) {

    let filteredChanges = changes;
    //filter cases where old and new name are very similar
    if (!includeSimilar) {
      filteredChanges = changes.filter(change =>
        change.similarity < 0.9
      )
    }
    //filter for date of renaming
    filteredChanges = filteredChanges.filter(change =>
      start <= new Date(change.renaming_date) && new Date(change.renaming_date) <= end
    )
    const number = filteredChanges.length
    toast.success(`Showing ${number} change(s)`)
    this.setState({ currentChanges: filteredChanges })
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

  //compute number of renamings per quarter year
  createQuarterData() {
    let renaming_dates = this.state.currentChanges.map((x) => (x.renaming_date))
    let changesPerQuarter = {}
    for (let date of renaming_dates) {
      date = new Date(date)
      let month = date.getMonth() + 1 //e.g. 1 for January
      const year = date.getFullYear()
      let key = month.toString() + "/" + year.toString() // 1/2019
      // count changes per quarter
      if (key in changesPerQuarter) {
        changesPerQuarter[key] = changesPerQuarter[key] + 1
      } else {
        changesPerQuarter[key] = 1
      }
    }
    return changesPerQuarter
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
              <NewMap changes={this.state.currentChanges} onMapChange={this.filterChangesByMapSection}></NewMap>
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
              <Row style={{ height: 300 }} ><Chart data={this.createQuarterData()} /></Row>
            </Col>
          </Row>
          <Row>
            <ChartContainer data={this.createEntities()} colors={this.entityColors}></ChartContainer>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
