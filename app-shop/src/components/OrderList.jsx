import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';


import Order from './Order.jsx';


class OrderList extends Component {

    render() {


        let filteredOrders = this.props.orders.filter(
            (order) => order.product.indexOf(this.props.filterText) !== -1
        ).sort(
            (a, b) => {
                if( a.deadline > b.deadline) return 1
                if( a.deadline < b.deadline) return -1
                var aa = a.product.split("-")
                var bb = b.product.split("-")
                if( aa[0] > bb[0] ) return 1
                if( aa[0] < bb[0] ) return -1

                // eslint-disable-next-line
                return parseInt(aa[1])-parseInt(bb[1])
            });


        var orders = filteredOrders.map(o =>
            <Order
                key={o.id+o.deadLineAndProduct}
                order={o}
                callbacks={this.props.callbacks}/>
        );

        return (
            <div>
                {(this.props.orders.length > 0) ?
                        <List component="nav">
                            {orders}
                        </List>
                        : <p>no object found for this selection</p>}
            </div>
        )

    }
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    callbacks: PropTypes.object.isRequired
}

export default OrderList