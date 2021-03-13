import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import * as apiCalls from '../apiCalls/apiCalls'

// get previous stored state each time
const configureStore = (addLogger = true) => {
    let localStorageData = localStorage
        .getItem('hoax-auth');

    let persistedState = {
        id: 0,
        username: '',
        displayName: '',
        image: '',
        password: '',
        isLoggedIn: false
    }

    if (localStorageData) {
        try {
            persistedState = JSON.parse(localStorageData);
            apiCalls.setAuthorizationHeader(persistedState)

        } catch (error) { }
    }

    // if logged in with new user the store will have its data
    const store = createStore(authReducer, persistedState, applyMiddleware(thunk, logger));

    // whenever there is a change in redux store by a reduce following an action
    // for eg login or logout
    store.subscribe(() => {
        // when
        localStorage.setItem('hoax-auth', JSON.stringify(store.getState()))
        apiCalls.setAuthorizationHeader(store.getState)
    });

    return store
}


export default configureStore;