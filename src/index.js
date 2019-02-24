import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';


import {ADD} from 'components/App';

const reducer = (state = 0, action) => {
    const { type } = action;
    switch (type) {
        case ADD:
            return state + action.payload
            

        default:
            return state;
    }
}

const reducer2 = (state = 5, action) => {
    const { type } = action;
    switch (action.type) {
        case 'SAVE_POSTS':
            return {
                ...state,
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    reducer,
    reducer2
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


