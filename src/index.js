import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import RootReducer from './store/reducers';

import './style.css';

import MainRoutes from './routes';

const Store = createStore(RootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <MainRoutes />
  </Provider>
    
  
);  

