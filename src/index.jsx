import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import { APP_CONTAINER_SELECTOR } from './config';

ReactDOM.render(<App />, document.querySelector(APP_CONTAINER_SELECTOR));
