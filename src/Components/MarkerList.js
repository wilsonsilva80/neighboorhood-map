import { Component } from 'react'
import PropTypes from 'prop-types'

class MarkerList extends Component {
    constructor(props) {
        super(props);

        this.locationMarkers = this.locationMarkers.bind(this);
        this.updateMarkers = this.updateMarkers.bind(this);
    }

    state = {
        markerLocations: []
    }

    static propTypes = {
         filteredLocations: PropTypes.array.isRequired
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filteredLocations !== this.props.filteredLocations){
            const obj = this.props.filteredLocations;
            obj.forEach((location) => {
                this.updateMarkers(location);
            });
        }
        if (prevProps.google !== this.props.google) {
            this.setState({
                markerLocations: []
            })
            //iterate through locations to place the markers
            const obj = this.props.filteredLocations;
            obj.forEach((location, index) => {
                this.locationMarkers(location, index);
            });

        }
    }

    updateMarkers = (location) => {
        let markersArr = this.state.markerLocations;
        let { map } = this.props;
        let { title, position, visible } = location;
        markersArr.forEach((marker) => {
            if(marker.title === title) {
                visible === true ? marker.setMap(map) : marker.setMap(null);
            }
        });

    }


    // TODO: make fetch from API to put into infoWindow, rn infowindow is working
    // Client ID
    // 3CRHDHCHBIAI0NX0NQD1YWPWG3K3IFNHB4WJVVTGCF415XYQ
    // Client Secret
    // AO5T05WRIZ03B13XVISXHSA0T530B5FTT2CB1DFMFX5CC04K
    locationMarkers = (locations, index) => {
        let markersArr = this.state.markerLocations;
        let { google, map, largeInfoWindow } = this.props;
        let { title, position, visible } = locations;

        position = new window.google.maps.LatLng(position.latitude, position.longitude);
        //Create a marker per location, and put into markersArr state.
        let marker = new google.maps.Marker({
            id: index,
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP
        });

        markersArr.push(marker);

        this.setState({
            markerLocations: markersArr
        })
        // adapted from this iife https://stackoverflow.com/a/3059129
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 1400);
                    largeInfoWindow.setContent('<div>' + marker.title + '</div>');
                largeInfoWindow.open(map, marker);
            }
        })(marker));

        // TODO: extend bounds with foreach
        // bounds.extend(marker.position)
        // map.fitBounds(this.bounds);
    }


    render() {
        return null
    }

}

export default MarkerList
