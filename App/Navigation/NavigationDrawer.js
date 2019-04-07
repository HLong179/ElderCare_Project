import React from "react";
import { DrawerNavigator } from "react-navigation";
import FoodCard from '../Containers/FoodCard'
import Home from '../Containers/Home'
import ListviewExample from "../Containers/ListviewExample";
import CardExample from "../Containers/CardExample";
import DrawerContent from "../Containers/DrawerContent";
import CardHeartRate from "../Containers/HeartCard/FormHeartRate";

import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
  FoodCard: { screen: FoodCard },
  Home: { screen: Home },
		ListviewExample: { screen: ListviewExample },
		CardExample: { screen: CardExample },
		FormHeartRate: { screen: CardHeartRate },
	},
	{
		initialRouteName: "ListviewExample",
		contentComponent: props => <DrawerContent {...props} />,
	}
);

export default NavigationDrawer;
