import React, { Component } from 'react'
// TODO: class to filter locations
// call markers. and embed an input field
class Location extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        filteredLocations: require("../Locations.json")
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            console.log('yayy location')
        }
    }

}

export default Location
