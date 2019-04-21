import React from "react";
import { StackNavigator, createStackNavigator, createAppContainer } from "react-navigation";

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
        },
        FormHeartRate: {
            screen: FormHeartRate,
            navigationOptions: {
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "#fff",
                },
            }
        },
        Login: {
            screen: Login
        },
        ResetPass: {
            screen: ResetPassword
        }
    },
    {
        initialRouteName: "Login",
        headerMode: "none"
    }
);

const App = createAppContainer(PrimaryNav)

export default App;
