import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MarkerList from './MarkerList'
// TODO: class to filter locations
// call markers. and embed an input field
class LocationFilter extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        query: '',
        filteredLocations: this.props.obj
    }

    static propTypes = {
         obj: PropTypes.array.isRequired
    }

    // google={window.google}
    // map={this.state.map}
    // largeInfoWindow={this.state.largeInfowindow}
    // obj={obj}
    updateQuery = (query) => {
        let trimmedQuery = query.replace(/^\s+/, '')
        this.setState({
            query: trimmedQuery
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            console.log(this.state.filteredLocations)
        }
    }

    render(){
        let { google, map, largeInfowindow, obj } = this.props
        return(
            null
        )
    }

}

export default LocationFilter
