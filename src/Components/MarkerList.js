import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapContainer from './MapContainer'
/*global google*/

class MarkerList extends Component {
    constructor(props) {
        super(props);

        // this.populateInfoWindow = this.populateInfoWindow.bind(this);
        this.markerCreator = this.markerCreator.bind(this);
        this.populateInfoWindow = this.populateInfoWindow.bind(this);
    }

    static propTypes = {
        position: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
        // map: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            console.log('fds : ' + window.google)
            this.markerCreator();
        }
    }

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    populateInfoWindow = (marker, infowindow, map) => {
        // let { position, title, map, bounds, largeInfoWindow } = this.props;
        // var obj = require("../Locations.json");
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            alert('passa')
            //when infowindow is opened make a bounce animation for 1.4 sec
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1400);

            //provisory infowindow content
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                // infowindow.setMarker = null;
                infowindow.marker = null;
            });
        }
        else {
            alert('fds')
        }
    }


    markerCreator = () => {
        let { position, title, map, bounds, largeInfoWindow, google } = this.props;
        let thisMarker = this;
        console.log('markerCreator map: ' + window.google)
        position = new window.google.maps.LatLng(position.latitude, position.longitude);

        let marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', function() {
            thisMarker.populateInfoWindow(this, largeInfoWindow, map);
        });

        // bounds.extend(marker.position);
        // map.fitBounds(this.bounds);
    }

    //nothing to render
    render() {
        return null
    }

}

export default MarkerList
