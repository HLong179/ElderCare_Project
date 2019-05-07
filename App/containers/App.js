import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {Platform, View} from 'react-native';

import PrimaryNav from "../navigation/AppNavigation";

const AppContainer = createAppContainer(PrimaryNav)


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class App extends Component {
    render() {
        console.log(this.props);
        return (
            <View style={{flex: 1}}>
                <AppContainer/>
            </View>
        );
    }
}

