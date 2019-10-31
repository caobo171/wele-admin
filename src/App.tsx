
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'unstated-x'
import { ToastContainer } from 'react-toastify'
import PodcastAddForm from './Pages/PodcastAddForm';


class App extends Component {
  render() {

    return (
      <div className="container">
        <Router>
          <Provider>

            <Route component={PodcastAddForm} path="/"></Route>

          </Provider>

        </Router>
      </div>
    );
  }
}

export default App;
