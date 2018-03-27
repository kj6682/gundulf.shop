import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import SearchBar from './components/SearchBar.jsx';

import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {put} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Accordion, Panel, Jumbotron, Button, Modal, FormGroup, Row, Col} from 'react-bootstrap';

var config = require('./components/config.json')

var shop;
var root;

if (!process.env.DEV_SERVER) {
    shop = window.api.shop;
    root = window.api.root;
}
else {
    shop = 'paris';
    root = "http://localhost:8090";
}

const uri_orderlines = root + '/api/shop/' + shop + '/orderlines/'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            four: [],
            entremets: [],
            chocolat: [],
            tartes: [],
            today: '',
            search4me: ''
        };

        this.listOrdersPerProducer = this.listOrdersPerProducer.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)

        this.filter = this.filter.bind(this)
    }

    componentDidMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
    }

    filter(searchTerm) {
        this.setState({search4me: searchTerm})
    }

    listOrdersPerProducer(producer) {

        let uri_refresh = uri_orderlines;
        if(producer !=='orders') {uri_refresh = uri_refresh + producer};

        get(uri_refresh)
            .then((data) => {
                this.setState({[producer]: data});
            });

    }

    createOrder(producer, jsonOrder) {

        let uri_refresh = uri_orderlines;
        if(producer !=='orders') {uri_refresh = uri_refresh + producer};

        post(uri_orderlines, jsonOrder)
            .then(
                () => get(uri_refresh, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data});
                    }
                )
            );
    }


    updateOrder(id, producer, jsonOrder) {

        console.log(producer)
        let uri_refresh = uri_orderlines;
        if(producer !=='orders') {uri_refresh = uri_refresh + producer};
        console.log(uri_refresh)

        put(uri_orderlines, id, jsonOrder)
            .then(
                () => get(uri_refresh, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data});
                    }
                )
            );

    }


    deleteOrder(id, producer) {

        let uri_refresh = uri_orderlines;
        if(producer !=='orders') {uri_refresh = uri_refresh + producer};

        deleteObject(uri_orderlines, id)
            .then(
                () => get(uri_refresh, {page: 0}).then(
                    (data) => {
                        let ords = this.state.orders.filter((order) => order.id !== id);
                        this.setState({[producer]: data, orders: ords});
                    }
                )
            );
    }


    render() {

        let myOrderList = <OrderList orders={this.state.orders}
                                     filterText={this.state.search4me}
                                     callbacks={{
                                         create: this.createOrder,
                                         update: this.updateOrder,
                                         delete: this.deleteOrder
                                     }}/>


        let fourOrderList = <OrderList orders={this.state.four}
                                       filterText={this.state.search4me}
                                       callbacks={{
                                           create: this.createOrder,
                                           update: this.updateOrder,
                                           delete: this.deleteOrder
                                       }}/>

        let tartesOrderList = <OrderList orders={this.state.tartes}
                                         filterText={this.state.search4me}
                                         callbacks={{
                                             create: this.createOrder,
                                             update: this.updateOrder,
                                             delete: this.deleteOrder
                                         }}/>

        let entremetsOrderList = <OrderList orders={this.state.entremets}
                                            filterText={this.state.search4me}
                                            callbacks={{
                                                create: this.createOrder,
                                                update: this.updateOrder,
                                                delete: this.deleteOrder
                                            }}/>

        let chocolatOrderList = <OrderList orders={this.state.chocolat}
                                           filterText={this.state.search4me}
                                           callbacks={{
                                               create: this.createOrder,
                                               update: this.updateOrder,
                                               delete: this.deleteOrder
                                           }}/>

        let searchBar = <SearchBar filterText={this.state.search4me}
                                   callbacks={{
                                       onUserInput: this.filter,
                                   }}/>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                </Jumbotron>

                <Row className="show-grid">
                    <Col xs={12} md={4}>

                        {config.lorem}

                        {searchBar}


                    </Col>
                    <Col xs={12} md={8}>
                        <Accordion defaultActiveKey="1">

                            <Panel header="My orders" eventKey="orders" onSelect={this.listOrdersPerProducer}>

                                <p>{config.my_orders}</p>

                                {myOrderList}

                            </Panel>


                            <Panel header="Four" eventKey="four" onSelect={this.listOrdersPerProducer}>

                                <p>{config.products_and_orders}</p>

                                {fourOrderList}

                            </Panel>

                            <Panel header="Tartes" eventKey="tartes" onSelect={this.listOrdersPerProducer}>

                                <p>{config.products_and_orders}</p>

                                {tartesOrderList}

                            </Panel>

                            <Panel header="Entremets" eventKey="entremets" onSelect={this.listOrdersPerProducer}>

                                <p>{config.products_and_orders}</p>

                                {entremetsOrderList}

                            </Panel>

                            <Panel header="Chocolat" eventKey="chocolat" onSelect={this.listOrdersPerProducer}>

                                <p>{config.products_and_orders}</p>

                                {chocolatOrderList}

                            </Panel>

                        </Accordion>

                    </Col>
                </Row>


            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
}

export default App