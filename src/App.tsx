
import logo from './logo.svg';
import React, { Component, useState } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'unstated-x'
import { ToastContainer } from 'react-toastify'
import PodcastAddForm from './Pages/PodcastAddForm';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';



const App = () => {

  const [user, setUser] = useState(null)

  const onLoginUser = (user:any)=>{
    setUser(user)
  }

  return (
    <div className="container">
      <Router>
        <Provider>

          {
            user ? <PodcastAddForm  user={user}/>
            : <Login onLoginUser = {onLoginUser}/>
          }
        </Provider>
      </Router>
      <ToastContainer />
    </div>
  );

}

export default App;
