import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import "../css/Map.css"
import { Layer } from "leaflet";


export default class Map extends React.Component {

        constructor(props) {
                super(props);
                this.state = {
                        lat: 52.227326,
                        lng: 19.353067,
                        zoom: 8,
                        minZoom: 6,
                        height: window.innerWidth >= 992 ? (0.8 * window.innerHeight) : 300
                };

        }


        updateDimensions() {
                const mapHeight = window.innerWidth >= 992 ? (0.8 * window.innerHeight) : 300
                this.setState({ height: mapHeight })
        }

        componentDidMount() {
                window.addEventListener("resize", this.updateDimensions.bind(this))
        }

        componentWillUnmount() {
                window.removeEventListener("resize", this.updateDimensions.bind(this))
        }

        render() {
                const position = [this.state.lat, this.state.lng]
                const layer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'
                return (

                        <LeafletMap className="shadow-sm" style={{ height: this.state.height }} center={position} zoom={this.state.zoom} minZoom={this.state.minZoom}>

                                <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url={layer}>
                                </TileLayer>
                        </LeafletMap>

                )
        }
}