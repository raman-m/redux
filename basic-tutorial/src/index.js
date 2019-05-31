// import * as reducers from './reducers'
// import * as dataFlow from './dataFlow'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { todoApp as rootReducer } from './reducers';
import App from './components/App';

// reducers.run()
// dataFlow.run()

// --------------------------------------

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
