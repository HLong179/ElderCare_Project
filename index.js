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
import { Root } from "native-base";
import bgMessageService from './App/services/bgMessageService'
const Navigation  = createAppContainer(App);




import NavigationService from './App/services/navigationServices';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(rootSaga);

// const RNRedux = () => (
//   <Root>
//     <Provider store={store}>
//       <View style={{ flex: 1 }}>
//         <Navigation
//           ref={navigatorRef => {
//             NavigationService.setTopLevelNavigator(navigatorRef);
//           }}
//         />
//       </View>
//     </Provider>
//   </Root>
// );
import {SocketProvider} from './socketContext';
import SETTINGS from './App/settings';
import SocketIOClient from 'socket.io-client';
window.navigator.userAgent = 'react-native';
import { YellowBox } from 'react-native';
console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

class RNRedux extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: null
    }
  }
  componentDidMount = () => {
    this.connectSocket();   
  }

  connectSocket = () => {
    try{
        console.log("connexion au serveur socket");
        this.setState({
            socket: SocketIOClient(`http://${SETTINGS.LOCAL_IP}:6900`, {transports: ['websocket']})
        });
    }catch(err){
        console.log("something wrong: ",err);
    }
  }
  render() {
    console.log('root');
    return (
      
      <Root>
         <SocketProvider socket={this.state.socket}>
          <Provider store={store}>
            <View style={{ flex: 1 }}>
              <Navigation
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </View>
          </Provider>
        </SocketProvider>
      </Root>
    )
  }
}

AppRegistry.registerComponent(appName, () => RNRedux);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessageService);
