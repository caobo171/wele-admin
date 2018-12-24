
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Install from './modules/Install'
import Dashboard from './modules/Dashboard';
import Create from './modules/create/Create'
import { Provider } from 'unstated-x'
import { ToastContainer } from 'react-toastify'


class App extends Component {
  render() {
    // window.axios = axios
    //axios.get('/sho').then(data=>console.log(data))
    return (
      <div className="App">
        <Router>
          <Provider>
            <Route path="/install" component={Install} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/create" exact component={Create} />
          </Provider>

        </Router>
      </div>
    );
  }
}

export default App;
