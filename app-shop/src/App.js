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
            isFourVisible: true,
            isChocolateVisible: true,
            isEntremetsVisible: true,
            isTartesVisible:true
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

    toggleHidden (what) {

        if(what === 'isFourVisible'){
            this.setState({
                isFourVisible: !this.state.isFourVisible
            })
        }
        if(what === 'isChocolateVisible'){
            this.setState({
                isChocolateVisible: !this.state.isChocolateVisible
            })
        }
        if(what === 'isTartesVisible'){
            this.setState({
                isTartesVisible: !this.state.isTartesVisible
            })
        }
        if(what === 'isEntremetsVisible'){
            this.setState({
                isEntremetsVisible: !this.state.isEntremetsVisible
            })
        }
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

              <SwitchesGroup callbacks={{hide: this.toggleHidden}}/>

              <Divider/>

              <SearchBar filterText={this.state.search4me}
                         callbacks={{
                             onUserInput: this.filter,
                         }}/>

              <Divider/>

              {this.state.isFourVisible && <OrderList orders={this.state.four}
                                                  filterText={this.state.search4me}
                                                  callbacks={{
                                                      create: this.createOrder,
                                                      update: this.updateOrder,
                                                      delete: this.deleteOrder
                                                  }}/>}


              <Divider/>
              {this.state.isChocolateVisible && <OrderList orders={this.state.chocolat}
                                                      filterText={this.state.search4me}
                                                      callbacks={{
                                                          create: this.createOrder,
                                                          update: this.updateOrder,
                                                          delete: this.deleteOrder
                                                      }}/>}

              <Divider/>
              {this.state.isEntremetsVisible && <OrderList orders={this.state.entremets}
                                                           filterText={this.state.search4me}
                                                           callbacks={{
                                                               create: this.createOrder,
                                                               update: this.updateOrder,
                                                               delete: this.deleteOrder
                                                           }}/>}

              <Divider/>
              {this.state.isTartesVisible && <OrderList orders={this.state.tartes}
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
