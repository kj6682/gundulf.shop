import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import OrderList from './components/OrderList.jsx';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SwitchesGroup from './components/SwitchesGroup'
import './App.css';

const endpoint = 'http://localhost:8090/api/shop/paris/orderlines/';
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            four:[],
            chocolat:[]
        };

        this.fetchOrders = this.fetchOrders.bind(this)
    }

    componentWillMount() {

        this.fetchOrders("four").then( () => this.fetchOrders("chocolat"));

    }

    fetchOrders(producer) {
        return fetch(endpoint+producer)
            .then((response) => response.json())
            .then((data) => {
                this.setState({[producer]: data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        let today = new Date().toISOString().slice(0, 10);
        let title = "Ordres du jour " + today;

        let fourOrderList = <OrderList orders={this.state.four}
                                       filterText={''}
                                       callbacks={{
                                           create: this.createOrder,
                                           update: this.updateOrder,
                                           delete: this.deleteOrder
                                       }}/>

        let chocolatOrderList = <OrderList orders={this.state.chocolat}
                                       filterText={''}
                                       callbacks={{
                                           create: this.createOrder,
                                           update: this.updateOrder,
                                           delete: this.deleteOrder
                                       }}/>

        return (
      <div className="App">
          <MuiThemeProvider>
              <AppBar position="static" color="primary">
                  <Toolbar>
                      <Typography variant="title" color="inherit">
                          {title}
                      </Typography>
                  </Toolbar>
              </AppBar>

              <Divider/>

              <SwitchesGroup/>

              <Divider/>
              {fourOrderList}

              <Divider/>
              {chocolatOrderList}

          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
