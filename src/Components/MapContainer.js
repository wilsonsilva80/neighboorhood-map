import React, { Component } from 'react'
import MarkerList from './MarkerList'
import escapeRegExp from 'escape-string-regexp'
/* global google */

const createMapScript = () => {
    let el = document.createElement("SCRIPT");
    el.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyByH0c5bxYDZ48BLQ401BBsm4DppG6QNkQ&v=3&callback=initMap";
    el.async = true;
    document.body.appendChild(el);
}

class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.initMap = this.initMap.bind(this);
    }

    state = {
        map: {},
        query: '',
        filteredLocations: require("../Locations.json")
    }

    componentDidMount(){
        window.initMap = this.initMap;
        createMapScript();
    }

    initMap() {
        var node = document.getElementById('map')
        let zoom = 12;
        let lat = 38.745083486263965;
        let lng = -9.170407309228494;
        const center = new google.maps.LatLng(lat, lng);
        var map = new google.maps.Map(node, {
            center: center,
            zoom: zoom
        });
        this.setState({
            map
        });
    }

    updateQuery = (query) => {
        let trimmedQuery = query.replace(/^\s+/, '')
        this.setState({
            query: trimmedQuery
        })
    }


    render() {
        const { map, query, filteredLocations } = this.state
        let showingMarkers
        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i')//use special characters as string literal
            showingMarkers = filteredLocations.map((location) => {
                if(match.test(location.title)) {
                    location.visible = true;
                } else {
                    location.visible = false;
                }
                return location;
            })
        } else {
            showingMarkers = filteredLocations.map((location) => {
                location.visible = true;
                return location;
            })
        }

        return(
            <React.Fragment>
                <div id="nav-bar">
                    My Neighboorhood Map
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        role="search"
                        placeholder="Search here" />
                </div>
                <div id="filter-locations">
                    <ul
                        id="filter-this"
                        aria-label="locations list">
                    </ul>
                </div>
            <div id="map" />
            <MarkerList
                google={window.google}
                map={map}
                filteredLocations={showingMarkers}
            />
            </React.Fragment>
        )
    }
}

export default MapContainer
