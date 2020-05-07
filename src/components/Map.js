import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "../css/Map.css"


export default class Map extends React.Component {

        constructor(props) {
                super(props);
                this.state = {
                        lat: 52.227326,
                        lng: 19.353067,
                        zoom: 8,
                        minZoom: 6,
                        height: window.innerWidth >= 992 ? (0.8 * window.innerHeight) : 300,
                        markers: ''
                };

        }


        updateDimensions() {
                const mapHeight = window.innerWidth >= 992 ? (0.8 * window.innerHeight) : 300
                this.setState({ height: mapHeight })
        }

        componentDidUpdate() {
                this.createMarkers();
        }

        createMarkers() {
                const changes = this.props.changes
                let test = 0
                const markers = changes.map(change => {
                        test++

                        return (<Marker position={[change.lat, change.lon]} key={test}>

                                {<Popup>
                                        New name: {change.new_name.full_name} <br /> Old name: {change.old_name.full_name} <br /> Place: {change.place_name}
                                </Popup>}
                        </Marker>)

                })


                return markers;

                //this.setState({ markers: markers })
        }

        componentDidMount() {
                window.addEventListener("resize", this.updateDimensions.bind(this))
                this.createMarkers();

        }

        componentWillUnmount() {
                window.removeEventListener("resize", this.updateDimensions.bind(this))
        }

        render() {
                console.log("number of changes in map: ", this.props.changes.length)
                console.log("Changes", this.props.changes)

                const position = [this.state.lat, this.state.lng]
                const layer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'
                return (

                        <LeafletMap className="shadow-sm" style={{ height: this.state.height }} center={position} zoom={this.state.zoom} minZoom={this.state.minZoom} >

                                <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url={layer}>
                                </TileLayer>

                                {/* <MarkerClusterGroup> */}
                                {this.createMarkers()}
                                {/* </MarkerClusterGroup> */}


                        </LeafletMap >


                )
        }
}