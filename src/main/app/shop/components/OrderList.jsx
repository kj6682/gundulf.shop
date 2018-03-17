import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Order from './Order.jsx';


import { Table } from 'react-bootstrap';

class OrderList extends React.Component {
    constructor(props) {
        super(props)
    }

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

                return parseInt(aa[1])-parseInt(bb[1])
            });


        var orders = filteredOrders.map(order =>
            <Order
                key={order.id+order.deadLineAndProduct}
                order={order}
                callbacks={this.props.callbacks}/>
        );

        return (
            <div>


                {(this.props.orders.length > 0) ?
                    <Table responsive striped bordered condensed hover>
                        <tbody>
                        <tr>
                            <th>deadline</th>
                            <th>product</th>
                            <th>quantity</th>
                        </tr>
                        {orders}
                        </tbody>
                    </Table> : <p>no object found for this selection</p>}
            </div>
        )

    }
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    callbacks: PropTypes.object.isRequired
}

export default OrderList