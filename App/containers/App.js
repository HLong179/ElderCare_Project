import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {Platform, View} from 'react-native';

import PrimaryNav from "../navigation/AppNavigation";


// const socket = SocketIOClient(`http://${SETTINGS.LOCAL_IP}:6900`, {transports: ['websocket']});
const AppContainer = createAppContainer(PrimaryNav)


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class App extends Component {

    // constructor(props) {
    //     super(props);
    //     console.log("run socket")

       
        
    // }


    render() {
        console.log('Helo World');
        return (
            <View style={{ flex: 1 }}>
                <AppContainer screenProps={{
                    handler: () => { },
                    hello: "World"
                }} />
            </View>
          
        );
    }
}

