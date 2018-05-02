import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = "http://localhost:8080/api";

ReactDOM.render((
	<App />
), document.getElementById('root'));
registerServiceWorker();
