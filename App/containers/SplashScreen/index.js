import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View} from 'react-native';


class WelcomePage extends React.Component {
    componentDidMount = async () => {
        const result = await setTimeout(() => {
            SplashScreen.hide()
            this.props.navigation.navigate('Home');
        }, 2000);

        console.log(result);


    }

    render() {
        return (
            <View/>
        )
    }

}

export default WelcomePage;