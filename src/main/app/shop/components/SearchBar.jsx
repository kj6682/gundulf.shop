import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  handleChange(event){
    this.props.callbacks.onUserInput(event.target.value)
  }

  render(){
    return <input type="search"
                  placeholder="search"
                  value={this.props.filterText}
                  onChange={this.handleChange.bind(this)} />
  }
}
SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  callbacks: PropTypes.object.isRequired

}

export default SearchBar

