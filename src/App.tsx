import React from 'react';

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import store from '@store/store';
import AppRouter from '@/navigation/AppRouter';



const App = () => {


  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );

}

export default App;
