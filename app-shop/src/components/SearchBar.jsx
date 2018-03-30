import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';


class SearchBar extends Component {
    handleChange(event) {
        this.props.callbacks.onUserInput(event.target.value)
    }

    render() {

        const myStyle = {
            color: 'palevioletred',
            paddingBottom: '30px'
        }
        return (

            <FormControl style={myStyle}>
                <InputLabel htmlFor="name-input">search</InputLabel>
                <Input id="name-input"
                       onChange={this.handleChange.bind(this)}/>
                <FormHelperText>Search for you product</FormHelperText>
            </FormControl>

        )
    }
}

SearchBar.propTypes = {
    filterText: PropTypes.string.isRequired,
    callbacks: PropTypes.object.isRequired

}

export default SearchBar

