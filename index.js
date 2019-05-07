/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App/containers/App';
import { name as appName } from './app.json';
import React from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './App/reducer';
import rootSaga from './App/containers/AuthPage/saga';
import createSagaMiddleware from 'redux-saga';

import App from './App/navigation/AppNavigation';
import { createAppContainer } from 'react-navigation';

const Navigation  = createAppContainer(App);

import NavigationService from './App/services/navigationServices';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(rootSaga);

const RNRedux = () => (
    <Provider store={store}>
        <View style={{ flex: 1 }}>
            <Navigation ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
        </View>
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
