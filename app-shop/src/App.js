import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import OrderList from './components/OrderList.jsx';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CssBaseline from 'material-ui/CssBaseline';
import SwitchesGroup from './components/SwitchesGroup';
import SearchBar from './components/SearchBar'
import './App.css';

const endpoint = 'http://localhost:8090/api/shop/paris/orderlines/';
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            four:[],
            chocolat:[],
            entremets:[],
            search4me: ''
        };

        this.fetchOrders = this.fetchOrders.bind(this);
        this.filter = this.filter.bind(this);
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

    filter(searchTerm) {
        this.setState({search4me: searchTerm})
    }

    render(){
        let today = new Date().toISOString().slice(0, 10);
        let title = "Ordres du jour " + today;

        let fourOrderList = <OrderList orders={this.state.four}
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

        return (
      <div className="App">
          <CssBaseline />
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

              <SearchBar filterText={this.state.search4me}
                         callbacks={{
                             onUserInput: this.filter,
                         }}/>

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
