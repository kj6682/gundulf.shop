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
            tartes: [],
            search4me: '',
            isFourHidden: false,
            isChocolateHidden: false,
            isEntremetsHidden: false,
            isTartesHidden:false
        };

        this.fetchOrders = this.fetchOrders.bind(this);
        this.filter = this.filter.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
    }

    componentWillMount() {

        this.fetchOrders("four")
            .then( () => this.fetchOrders("chocolat"))
            .then( () => this.fetchOrders("tartes"))
            .then( () => this.fetchOrders("entremets"));

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

    toggleHidden (what, value) {

        this.setState({
            [what]: value
        })
        
    }

    render(){
        let today = new Date().toISOString().slice(0, 10);
        let title = "Ordres du jour " + today;

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

              <SwitchesGroup   visible={{four: this.state.isFourHidden,
                                         entremets: this.state.isEntremetsHidden,
                                         chocolat: this.state.isChocolateHidden,
                                         tartes:this.state.isTartesHidden}
                                }
                               callbacks={{hide: this.toggleHidden}}/>

              <Divider/>

              <SearchBar filterText={this.state.search4me}
                         callbacks={{
                             onUserInput: this.filter,
                         }}/>

              <Divider/>

              {!this.state.isFourHidden && <OrderList orders={this.state.four}
                                                  filterText={this.state.search4me}
                                                  callbacks={{
                                                      create: this.createOrder,
                                                      update: this.updateOrder,
                                                      delete: this.deleteOrder
                                                  }}/>}


              <Divider/>
              {!this.state.isChocolateHidden && <OrderList orders={this.state.chocolat}
                                                      filterText={this.state.search4me}
                                                      callbacks={{
                                                          create: this.createOrder,
                                                          update: this.updateOrder,
                                                          delete: this.deleteOrder
                                                      }}/>}

              <Divider/>
              {!this.state.isEntremetsHidden && <OrderList orders={this.state.entremets}
                                                           filterText={this.state.search4me}
                                                           callbacks={{
                                                               create: this.createOrder,
                                                               update: this.updateOrder,
                                                               delete: this.deleteOrder
                                                           }}/>}

              <Divider/>
              {!this.state.isTartesHidden && <OrderList orders={this.state.tartes}
                                                           filterText={this.state.search4me}
                                                           callbacks={{
                                                               create: this.createOrder,
                                                               update: this.updateOrder,
                                                               delete: this.deleteOrder
                                                           }}/>}

          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
