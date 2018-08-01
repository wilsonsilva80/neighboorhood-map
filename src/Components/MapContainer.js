import React, { Component } from 'react'
import MarkerList from './MarkerList'
/* global google */
const createMapScript = () => {
    let el = document.createElement("SCRIPT");
    el.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyByH0c5bxYDZ48BLQ401BBsm4DppG6QNkQ&v=3&callback=initMap";
    el.async = true;
    // el.defer = true;
    document.body.appendChild(el);
}



class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.initMap = this.initMap.bind(this);
    }

    state = {
        map: {},
        bounds: '',
        largeInfowindow: ''
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

        //instance of Bounds
        this.bounds = new google.maps.LatLngBounds();
        //instance of infowindow
        this.largeInfoWindow = new google.maps.InfoWindow();
        console.log('mapinit map: ' + map)
        this.setState({
            map,
            bounds: this.bounds,
            largeInfowindow: this.largeInfoWindow
        })

    }

    render() {
        var obj = require("../Locations.json");
        console.log('render map: ' + window.google)

        let position = obj[0].position;
        let title = obj[0].title;
        console.log(obj[0].position)

        return(
            <React.Fragment>

            <div id="map" />
            <MarkerList
                position={position}
                title={title}
                map={this.state.map}
                bounds={this.state.bounds}
                largeInfoWindow={this.state.largeInfowindow}
                google={window.google}
                obj={obj}
            />

            </React.Fragment>

        )
    }

}

export default MapContainer
