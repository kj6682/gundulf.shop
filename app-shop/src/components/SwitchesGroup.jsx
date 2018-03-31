import React from 'react';
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class SwitchesGroup extends React.Component {
    state = {
        four: false,
        entremets: false,
        chocolat: false,
        tartes:false
    };

    handleChange = name => (event, checked) => {
        this.setState({[name]: checked});
        this.props.callbacks.hide(event.target.value, checked);
    };

    render() {
        const myStyle = {
            color: 'palevioletred',
            backgroundColor: 'papayawhip',
            padding: '30px',
        }
        return (
            <div style={myStyle}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filtrer le fournisseur</FormLabel>
                <FormGroup>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.four}
                                onChange={this.handleChange('four')}
                                value="isFourHidden"
                            />
                        }
                        label="Four"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.chocolat}
                                onChange={this.handleChange('chocolat')}
                                value="isChocolateHidden"
                            />
                        }
                        label="Chocolate"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.entremets}
                                onChange={this.handleChange('entremets')}
                                value="isEntremetsHidden"
                            />
                        }
                        label="Entremets"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.tartes}
                                onChange={this.handleChange('tartes')}
                                value="isTartesHidden"
                            />
                        }
                        label="Tartes"
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>
            </div>
        );
    }
}

export default SwitchesGroup;