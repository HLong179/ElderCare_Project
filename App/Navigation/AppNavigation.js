import React from "react";
import { StackNavigator } from "react-navigation";
import styles from "./Styles/NavigationStyles";

// screens identified by the router

import NavigationDrawer from "./NavigationDrawer";
import Home from "../Containers/Home";
import FormHeartRate from "../Containers/HeartCard/FormHeartRate"

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
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default PrimaryNav;
