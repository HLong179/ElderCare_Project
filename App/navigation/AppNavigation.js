import React from "react";
import {StackNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import HeaderWithIcon from '../containers/Header';
import CommonHeader from '../components/CommonHeader';
import AddRelative from '../containers/AddRelative';
import WelcomePage from '../containers/SplashScreen';


import Home from "../containers/Home";
import Login from "../containers/AuthPage/FormLogin";
import ResetPassword from "../containers/AuthPage/FormResetPass"
import FormHeartRate from "../containers/HeartCard/FormHeartRate";
import SetTime from "../containers/SetTime";


const PrimaryNav = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                header: <HeaderWithIcon/>
            })
        },
        FormHeartRate: {
            screen: FormHeartRate,
            navigationOptions: () => ({
                header: <CommonHeader title="Heart Rate"/>
            }),
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }

        },
        ResetPass: {
            screen: ResetPassword,
            header: <CommonHeader title="Reset Password"/>
        },
        AddRelative: {
            screen: AddRelative,
        },
        SplashScreen: {
            screen: WelcomePage
        },
        SetTime: {
            screen: SetTime,
            navigationOptions: () => {
                return (<CommonHeader title='SetTime'/>)
            }
        }


    },
    {
        initialRouteName: "SplashScreen",

    }
);

const App = createAppContainer(PrimaryNav)

export default App;
