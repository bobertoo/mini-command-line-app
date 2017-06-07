import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const main = <Router history={browserHistory} routes={Routes} />

ReactDOM.render(main, document.getElementById('root'));
registerServiceWorker();
