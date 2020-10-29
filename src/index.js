import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./store/store";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import './index.scss'

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));