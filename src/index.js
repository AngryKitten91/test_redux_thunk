import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// ACTION NAMES
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

const reducer2 = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POSTS':
            return [
                ...payload
            ];
        default:
            return state;
    }
}
const reducer3 = (state = [], action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case 'COMMENTS':
            return [
                ...payload
            ];
        default:
            return state;
    }
}
const reducer4 = (state = [], action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case 'USERS':
            return [
                ...payload
            ];
        default:
            return state;
    }
}

const actions = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POSTS_PENDING':
            return {
                ...state,
                [type]:payload
            }
        case 'POSTS_SUCCESS':
            return { 
                ...state,
                [type]: payload
            }
        case 'POSTS_ERROR':
            return {
                ...state,
                [type]: payload
            }
        default:
            return state;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    reducer,
    reducer2,
    reducer3,
    reducer4,
    actions
})

const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(thunk)
    )
);



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


