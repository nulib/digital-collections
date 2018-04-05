import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers';
import Root from './Root';

const store = createStore(rootReducer);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
