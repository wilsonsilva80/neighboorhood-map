import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilterList from './FilterList'

class MarkerList extends Component {
    constructor(props) {
        super(props);

        this.locationMarkers = this.locationMarkers.bind(this);
        this.updateMarkers = this.updateMarkers.bind(this);
        this.listClicked = this.listClicked.bind(this);
    }

    state = {
        markerLocations: [],
        infoWindows: []
    }

    static propTypes = {
         filteredLocations: PropTypes.array.isRequired
    }

    componentDidUpdate(prevProps) {
        //first time it renders
        if (prevProps.google !== this.props.google) {
            this.setState({
                markerLocations: [],
                infoWindows: []
            })
            //iterate through locations to place the markers
            const obj = this.props.filteredLocations;
            obj.forEach((location, index) => {
                this.locationMarkers(location, index);
            });
        }
        //filteredLocations array is changed
        if (prevProps.filteredLocations !== this.props.filteredLocations){
            const obj = this.props.filteredLocations;
            obj.forEach((location) => {
                this.updateMarkers(location);
            });
        }
    }

    //Update the markers on screen accordingly to the filter
    updateMarkers = (location) => {
        let { markerLocations, infoWindows } = this.state;
        let { map } = this.props;
        let { title, visible } = location;
        //Close all the infoWindows
            infoWindows.forEach((infowindow) => {
                infowindow.close();
            });
        markerLocations.forEach((marker) => {
            if(marker.title === title) {
                visible === true ? marker.setMap(map) : marker.setMap(null)
            }
        });
    }

    //create the markers with the locations and populate the infowindows with
    //the data fetched using the foursquare API
    locationMarkers = (locations, index) => {
        let { markerLocations, infoWindows } = this.state;
        let { google, map } = this.props;
        let { title, position } = locations;

        position = new window.google.maps.LatLng(position.latitude, position.longitude);
        //Create a marker per location, and put into markersArr state.
        let marker = new google.maps.Marker({
            id: index,
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP
        });
        let infowindow = new google.maps.InfoWindow();

        const clientID = '3CRHDHCHBIAI0NX0NQD1YWPWG3K3IFNHB4WJVVTGCF415XYQ';
        const clientSecret = 'AO5T05WRIZ03B13XVISXHSA0T530B5FTT2CB1DFMFX5CC04K';
        let url = 'https://api.foursquare.com/v2/venues/search?' +
        'll=' + marker.getPosition().lat() + //latitude
        ',' + marker.getPosition().lng() + //longitude
        '&client_id=' + clientID +
        '&client_secret=' + clientSecret +
        '&v=20180803' + //date
        '&limit=5';
        fetch(url).then((response) => {
            if(response.status === 200) {
                response.json().then((res) => {
                    var arr = res.response.venues.filter((venue) => {
                        let str = venue.name;
                        return str.indexOf(marker.title) !== -1;
                    })
                    var content = '';
                    if(!arr[0]) {
                        content = marker.title +
                            "<br /> <br />  Couldn't fetch data from foursquare";
                    } else {
                        let title = arr[0].name;
                        content = title + '<br /> <br />';
                        arr[0].location.formattedAddress.forEach((address) => {
                            content += address + '<br />';
                        });
                        content += '<br />data from foursquare.com'
                    }
                    infowindow.setContent('<div>' + content + '</div>');
                });
            } else {
                alert("Couldn't fetch data from foursquare");
            }
        }).catch((error) => {
            alert("Couldn't fetch data from foursquare");
        })

        markerLocations.push(marker);
        infoWindows.push(infowindow);

        this.setState({
            markerLocations: markerLocations,
            infoWindows: infoWindows
        })

        // adapted from this iife https://stackoverflow.com/a/3059129
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                infoWindows.forEach((infowindow) => {
                    infowindow.close();
                });
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => {
                    marker.setAnimation(null);
                }, 1400);
                // infowindow.setContent('<div>' + marker.title + '</div>');
                infowindow.open(map, marker);
            }
        })(marker));

    }

    //adapted from https://stackoverflow.com/a/2731781
    listClicked = (value) => {
        let { markerLocations } = this.state;
        let { google } = this.props;
        const el = markerLocations.filter((marker) => {
            return value === marker.title;
        });

        google.maps.event.trigger(el[0], 'click');
    }


    render() {
        return (
            <FilterList
                filteredLocations={this.props.filteredLocations}
                clickItem={this.listClicked}/>
        )
    }

}

export default MarkerList
