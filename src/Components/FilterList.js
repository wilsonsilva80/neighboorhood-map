import { Component } from 'react'
import PropTypes from 'prop-types'

class FilterList extends Component {

    constructor(props) {
        super(props);

        this.listItems = this.listItems.bind(this);
    }

    static propTypes = {
         filteredLocations: PropTypes.array.isRequired,
         clickItem: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        if(prevProps.filteredLocations !== this.props.filteredLocations) {
            let papi = document.getElementById('filter-this');
            this.listItems(papi);
        }
    }

    listItems = (father) => {
        const { clickItem } = this.props;
        while (father.firstChild) {
            father.removeChild(father.firstChild);
        }
        let arr = this.props.filteredLocations;
        arr.forEach((item) => {
            if(item.visible) {
                let el = document.createElement("li");
                el.textContent = item.title;
                el.id = item.title;
                el.onclick = function (e) { clickItem(e.target.textContent)}
                father.appendChild(el);
            }
        })
    }

    render() {
        return (
            null
        )
    }

}



export default FilterList
