import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class WelcomePage extends React.Component {
    componentDidMount = async () => {
        const isLogin = await AsyncStorage.getItem('isLogin');
        const result = await setTimeout(() => {
            SplashScreen.hide()
            if (isLogin === "true")
                this.props.navigation.navigate('Home');
            else
                this.props.navigation.navigate('Login');
        }, 100);
    }
    render() {
        return (
            <View/>
        )
    }

}

export default WelcomePage;