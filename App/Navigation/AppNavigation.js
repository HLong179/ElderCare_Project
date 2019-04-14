import React from "react";
import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

// screens identified by the router

import NavigationDrawer from "./NavigationDrawer";
import Home from "../Containers/Home";
import Login from "../Containers/AuthPage/FormLogin";
// import ResetPassword from "../Containers/AuthPage/FormResetPass"
import FormHeartRate from "../Containers/HeartCard/FormHeartRate";

const PrimaryNav = StackNavigator(
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

export default PrimaryNav;
