import React from "react";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import styled from "styled-components"
import "../css/Map.css"

const Wrapper =
    styled.div`
`;


export default class NewMap extends React.Component {

    constructor(props) {
        super(props);
        this.lat = 52.227326,
            this.lng = 19.353067,
            this.zoom = 8,
            this.minZoom = 6,
            //state stores stuff that is manipulated and should lead to re-rendering on change
            this.state = {
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
        this.state.markerCluster.addLayers(markers)
    }

    componentDidUpdate() {
        this.createMarkers();
    }
    createMap() {
        this.map = L.map('map', {
            center: [this.lat, this.lng],
            zoom: this.zoom,
            minZoom: this.minZoom
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