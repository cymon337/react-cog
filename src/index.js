import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // redux store 사용하기 위해 프로바이더로 넣어준다.
  <Provider store={ store }> 
    <App />
  </Provider>
);

