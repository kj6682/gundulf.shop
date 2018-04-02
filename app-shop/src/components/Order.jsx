import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FolderIcon from 'material-ui-icons/Folder';
import FloatingActionButtons from './FloatingActionButtons'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';

import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "order": '',
            "quantity": 0
        };

        this.select = this.select.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)

    }

    componentDidMount() {
        this.setState({
                "order": this.props.order,
                "quantity": this.props.order.quantity
            }
        )
    }

    select(e) {
        this.setState({
            quantity: ''
        })
    }


    sendData(e) {

        var quantity = this.state.quantity
        if (quantity < 0 || quantity === '' || isNaN(quantity)) {
            this.setState({
                quantity: this.props.order.quantity
            })
            return
        }

        let o = this.state.order


        if (quantity > 0) {
            var json = JSON.stringify({
                "id": o.id,
                "created": o.created,
                "deadline": o.deadline,
                "producer": o.producer,
                "product": o.product,
                "shop": o.shop,
                "quantity": quantity
            })

            if ((o.id !== 0)) {

                this.props.callbacks.update(o.id, o.producer, json)
                return
            }

            this.props.callbacks.create(o.producer, json)
            return
        }

        if ((o.id !== 0)) {

            this.props.callbacks.delete(o.id, o.producer)
            return
        }

        this.setState({
            quantity: this.props.order.quantity
        })
    }


    handleChange(e) {
        let value = e.target.value

        if (isNaN(value) || value < 0) {
            this.setState({
                quantity: this.props.order.quantity
            })
            return
        }
        this.setState({
            quantity: value
        })

    }


    handleKeyDown(e) {
        const ESC = 27
        const ENTER = 13
        const key = e.charCode || e.keyCode

        if (key === ESC) {
            this.setState({
                quantity: this.props.order.quantity
            })
            this.refs.myInput.blur()

        }

        if (key === ENTER) {
            this.refs.myInput.blur()
        }


    }

    render() {
        const card = {
            display: 'flex',
        }

        const details = {
            display: 'flex',
            flexDirection: 'column',
        }

        return (


            <Card >
                <div style={details}>
                    <CardContent>
                        <Typography color="textSecondary">
                            {this.props.order.producer}
                            <br/>
                            {this.props.order.deadline}
                        </Typography>
                        <Typography color="textSecondary">
                            {"  "}

                        </Typography>
                        <Typography variant="headline" component="h1">
                            {this.props.order.product}
                        </Typography>
                        <div>
                            <Button variant="fab" color="primary" aria-label="edit">
                                <RemoveIcon/>
                            </Button>
                            <Typography variant="headline" component="h1">
                                {this.props.order.quantity}
                            </Typography>
                            <Button variant="fab" color="primary" aria-label="add">
                                <AddIcon/>
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>


        )
    }
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired,
}

export default withStyles(styles)(Order);

                           
                           
