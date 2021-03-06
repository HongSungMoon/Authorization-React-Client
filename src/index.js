import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import Root from './Root';

import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import loginApp from './reducers';


import 'bootstrap/dist/css/bootstrap.css';

export { default as App } from './App';

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(loginApp, devTools);
console.log(store.getState());

ReactDOM.render(<Provider store = {store}><Root /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
