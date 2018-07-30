import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

const createMapScript = () => {
    let el = document.createElement("SCRIPT");
    el.src = "https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3&callback=loadMap";
    el.async = true;
    el.defer = true;
    document.body.appendChild(el);
}

class Map extends Component {

    constructor(props) {
        super(props)
        this.loadMap = this.loadMap.bind(this);

    }

    componentDidMount() {
        window.loadMap = this.loadMap;
        createMapScript();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.google !== this.props.google) {
    //         this.loadMap();
    //     }
    // }

    //function to be called after the component has been rendered
    loadMap() {

          // google is available
          const {google} = this.props;
          const maps = google.maps;

          // const mapRef = this.refs.map;
          // const node = ReactDOM.findDOMNode(mapRef);
          const node = document.getElementById('map')

          let zoom = 14;
          let lat = 38.745083486263965;
          let lng = -9.170407309228494;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign({}, {
            center: center,
            zoom: zoom
          })
          var map = new google.maps.Map(node, mapConfig);
      }

    render() {
      const mapStyle = {
          width: '100vw',
          height: '100vh',
        border: '1px solid black'
      };
      // var obj = require("../Locations.json");
      // const map = this.state
      // this.largeInfowindow = new google.maps.InfoWindow();
      // this.bounds = new google.maps.LatLngBounds();
      return (
          <div id="map" style={mapStyle}>
            Loading map...
          </div>


      );
    }
}

export default Map
