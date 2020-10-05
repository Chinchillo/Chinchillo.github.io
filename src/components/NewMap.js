import React from "react";
import * as L from 'leaflet';
import 'leaflet.markercluster';
//import "leaflet/dist/leaflet.css"
import styled from "styled-components"
import "../css/Map.css"

const Wrapper =
    styled.div`
`;


export default class NewMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: 52.227326,
            lng: 19.353067,
            zoom: 8,
            minZoom: 6,
            height: window.innerWidth >= 992 ? (0.9 * window.innerHeight) : 300,
            markers: '',
            markerCluster: new L.MarkerClusterGroup()
        };

        this.createMap = this.createMap.bind(this)
        this.createMarkers = this.createMarkers.bind(this)
    }
    /**
     * Set height of map either to 90 % of window height or 300 px on smaller screens
     */
    updateDimensions() {
        const mapHeight = window.innerWidth >= 992 ? (0.9 * window.innerHeight) : 300
        this.setState({ height: mapHeight })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
        this.createMap()
        //console.log(this.props.changes.length)
    }

    createMarkers() {
        this.state.markerCluster.clearLayers();

        const changes = this.props.changes;
        const markers = []

        changes.forEach(change => {
            const marker = new L.Marker([change.lat, change.lon]);
            marker.bindPopup(`New name: ${change.new_name.full_name} <br> Old name:${change.old_name.full_name} <br> Date: ${change.renaming_date}`)
            markers.push(marker)
        }
        )
        //console.log(markers)
        this.state.markerCluster.addLayers(markers)
    }

    componentDidUpdate() {
        //console.log(this.props.changes.length)

        this.createMarkers();
    }
    createMap() {
        this.map = L.map('map', {
            center: [this.state.lat, this.state.lng],
            zoom: this.state.zoom

        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map)


        this.map.addLayer(this.state.markerCluster)
        this.createMarkers()
    }

    render() {

        return <Wrapper id="map" style={{ height: this.state.height }}></Wrapper >
    }
}