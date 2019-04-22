import React from "react";
import { StackNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import HeaderWithIcon from '../containers/Header';
import CommonHeader from '../components/CommonHeader';
import AddRelative from '../containers/AddRelative';

// screens identified by the router

// import NavigationDrawer from "./NavigationDrawer";
import Home from "../containers/Home";
import Login from "../containers/AuthPage/FormLogin";
import ResetPassword from "../containers/AuthPage/FormResetPass"
import FormHeartRate from "../containers/HeartCard/FormHeartRate";

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
                header: <CommonHeader title="Heart Rate" />
            }),
        },
        Login: {
            screen: Login,
            navigationOptions: () => ({header: null})

        },
        ResetPass: {
            screen: ResetPassword,
            header: <CommonHeader title="Reset Password" />
        },
        AddRelative: {
            screen: AddRelative,
        }

    },
    {
        initialRouteName: "Login",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#DCDCDC"
            }
        }
        // headerMode: "none"
    }
);

const App = createAppContainer(PrimaryNav)

export default App;
