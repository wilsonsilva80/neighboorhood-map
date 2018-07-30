import React, { Component } from 'react'
import MarkerList from './MarkerList'
/*global google*/


const zoo = {
  lat: 38.745083486263965,
  lng: -9.170407309228494
};


class Map extends Component {

    state = {
        map: {}
    }

    componentDidMount() {
      this.map = new google.maps.Map(this.refs.map, {
        center: zoo,
        zoom: 16
      });
      this.setState({ map: this.map })
    }

    render() {
      const mapStyle = {
        border: '1px solid black'
      };
      var obj = require("../Locations.json");
      const map = this.state
      this.largeInfowindow = new google.maps.InfoWindow();
      this.bounds = new google.maps.LatLngBounds();
      return (
        <div >
              <div ref="map" className="map-content" style={mapStyle}>I should be a map!</div>
              <MarkerList
                    position={obj[0].position}
                    title={obj[0].title}
                    map={map}
                    bounds={this.bounds}
                    largeInfoWindow={this.largeInfowindow}/>
        </div>
      );
    }
}

export default Map
