import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(

  <Router>
    <App />
  </Router>
  ,
  document.getElementById('root')
);

