import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapContainer from './MapContainer'
/*global google*/

class MarkerList extends Component {
    constructor(props) {
        super(props);

        this.markerCreator = this.markerCreator.bind(this);
        this.newPopulateInfoWindow = this.newPopulateInfoWindow.bind(this);
        this.locationMarkers = this.locationMarkers.bind(this);
    }

    state = {
        markerLocations: []
    }

    static propTypes = {
        position: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
        // map: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            console.log('fds : ' + window.google)

            let obj = this.props.obj;
            obj.forEach((location, index) => {
                this.locationMarkers(location, index);
            })

            // this.markerCreator();
        }
    }

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    // populateInfoWindow = (marker, infowindow, map) => {
    //     // let { position, title, map, bounds, largeInfoWindow } = this.props;
    //     // var obj = require("../Locations.json");
    //     // Check to make sure the infowindow is not already opened on this marker.
    //     if (infowindow.marker !== marker) {
    //         console.log('passa')
    //         //when infowindow is opened make a bounce animation for 1.4 sec
    //         // marker.setAnimation(google.maps.Animation.BOUNCE);
    //         // setTimeout(() => {
    //         //     marker.setAnimation(null);
    //         // }, 1400);
    //
    //         //provisory infowindow content
    //         infowindow.marker = marker;
    //         infowindow.setContent('<div>' + marker.title + '</div>');
    //         infowindow.open(map, marker);
    //         // Make sure the marker property is cleared if the infowindow is closed.
    //         infowindow.addListener('closeclick', function() {
    //             // infowindow.setMarker = null;
    //             infowindow.marker = null;
    //         });
    //     }
    //     else {
    //         console.log('fds')
    //     }
    // }




    newPopulateInfoWindow = (marker, infowindow, map) => {
        let thisMarker = this;
        if (infowindow.marker != thisMarker) {
            infowindow.marker = thisMarker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, this);
            marker.addListener('closeclick', function() {
                infowindow.setMarker(null);
            });
        }
    }

    // TODO: make infowindow function; rn markers are appearing
    locationMarkers = (locations, index) => {
        let markersArr = this.state.markerLocations
        console.log('entra function')
        let thisMarker = this;
        let google = this.props.google;
        let map = this.props.map;
        let bounds = this.props.bounds;
        let largeInfoWindow = this.props.largeInfoWindow;
        //Get the position from the location.json file
        let position = locations.position;
        console.log(position)
        position = new window.google.maps.LatLng(position.latitude, position.longitude);
        let title = locations.title;
        //Create a marker per location, and put into markers array.
        let marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: index
        });

        markersArr.push(marker);

        this.setState({
            markerLocations: markersArr
        })

        marker.addListener('click', () => {
            thisMarker.newPopulateInfoWindow(this, largeInfoWindow, map);
        });
        // bounds.extend(markersArr)

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
