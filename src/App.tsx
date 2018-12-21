
import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Install from './modules/Install'
import Dashboard from './modules/Dashboard';
import Create from './modules/Create'


class App extends Component {
  render() {
   // window.axios = axios
    //axios.get('/sho').then(data=>console.log(data))
    return (
      <div className="App">
         <Router>
           <React.Fragment>
           <Route path="/install" component={Install}/>
           <Route path="/" exact component= {Dashboard}/>
           <Route path="/create" exact component = {Create}/>
           </React.Fragment>
        
         </Router>
      </div>
    );
  }
}

export default App;
