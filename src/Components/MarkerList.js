import React, { Component } from 'react'
import PropTypes from 'prop-types'
/*global google*/

class MarkerList extends Component {
    constructor(props) {
        super(props);

        this.populateInfoWindow = this.populateInfoWindow.bind(this);
        this.markerCreator = this.markerCreator.bind(this);
    }

    static propTypes = {
        // position: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
        // map: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.markerCreator();
    }

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    populateInfoWindow = (marker, infowindow, map) => {
        // let { position, title, map, bounds, largeInfoWindow } = this.props;
        // var obj = require("../Locations.json");
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            //when infowindow is opened make a bounce animation for 0.5 sec
            setTimeout(() => {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }, 500);

            //provisory infowindow content
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
            });
        }
    }


    markerCreator = () => {
        let { position, title, map, bounds, largeInfoWindow } = this.props;

        position = new google.maps.LatLng(position.latitude, position.longitude);

        let marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', function() {
            this.populateInfoWindow(this, largeInfoWindow, map);
        });

        bounds.extend(marker.position);
        map.fitBounds(this.bounds);
    }

    //nothing to render
    render() {
        return null
    }

}

export default MarkerList
