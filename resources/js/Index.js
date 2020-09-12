import React from 'react';
import { createStore,combineReducers,applyMiddleware,compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import LoginModule from './components/Login/Reducer/Data';
import axios from "axios";
import Header from "./components/Layout/Menu";

let AuthToken = localStorage.getItem('token');

window.axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
    headers: {'Authorization':'Bearer ' + AuthToken}
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const rootReducer = combineReducers({
    LoginSection: LoginModule
});

const store = createStore(rootReducer, enhancer);

function Index() {
    return (
        <div className="Index">
            <Header/>
        </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><Index/></Provider>, document.getElementById('index'));
}
