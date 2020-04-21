/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Redux
import store from './redux/store';
//disponibiliza a store de forma global pra aplicação
import {Provider} from 'react-redux';
//Redux

const MyApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => MyApp);
