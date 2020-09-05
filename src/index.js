import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import {
    createFirestoreInstance,
    getFirestore,
    reduxFirestore,
} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import App from './App/index';
import fbConfig from './fb/config';
import firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
import { createBrowserHistory } from 'history';

const createStoreWithMiddleware = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase, fbConfig)
    )
);
const rffConfig = {
    useFirestoreForProfile: true,
    userProfile: 'users',
};
const rrfProps = {
    firebase,
    config: rffConfig,
    dispatch: createStoreWithMiddleware.dispatch,
    createFirestoreInstance,
};

const createHistory = createBrowserHistory();

const app = (
    <Provider store={createStoreWithMiddleware}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <HashRouter history={createHistory}>
                {/* basename="/datta-able" */}
                <App />
            </HashRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
