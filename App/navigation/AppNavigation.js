import React from "react"
import { createStackNavigator, createSwitchNavigator } from "react-navigation"

import HeaderWithIcon from "../containers/Header"
import CommonHeader from "../components/CommonHeader"
import AddRelative from "../containers/AddRelative"
import WelcomePage from "../containers/SplashScreen"

import Home from "../containers/Home"
import Login from "../containers/AuthPage/FormLogin"
import SetTime from "../containers/SetTime"
import HeartRate from "../containers/HeartRate"
import SleepScreen from "../containers/SleepScreen"
import MedicinePage from "../containers/MedicinePage"
import SignUp from "../containers/AuthPage/FormSignUp/Elder"
import MainRelativeSignUp from "../containers/AuthPage/FormSignUp/MainRelative"
import NotePage from "../containers/NotePage"
import CalorDetail from "../containers/CaloDetail";

import { View, StyleSheet, Button } from "react-native"
import { Text, Icon, Container, Header, Content } from "native-base"
import WeightDetail from '../containers/WeightCard/WeightDetail';
import WeightChartDetail from '../containers/Weight/WeightDetail'

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: <HeaderWithIcon />
      })
    },

    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        title: `Đăng ký`
      })
    },

    MainRelativeSignUp: {
      screen: MainRelativeSignUp,
      navigationOptions: () => {
        return <CommonHeader title="Main Relative SignUp" />
      }
    },

    Login: {
      screen: Login
    },

    AddRelative: {
      screen: AddRelative,
      navigationOptions: () => ({
        title: `Thêm người thân phụ`
      })
    },

    SplashScreen: {
      screen: WelcomePage
    },

    SetTime: {
      screen: SetTime,
      navigationOptions: () => ({
        title: `Hẹn giờ`
      })
    },
    HeartRate: {
      screen: HeartRate,
      navigationOptions: () => ({
        title: `Nhịp tim`
      })
    },
    CalorDetail: {
      screen: CalorDetail,
      navigationOptions: () => ({
        title: `Calor`
      })
    },
    SleepScreen: {
      screen: SleepScreen,
      navigationOptions: () => ({
        title: `Giấc ngủ`
      })
    },
    MedicinePage: {
      screen: MedicinePage,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Quản lý thuốc",
          // headerRight: (
          //   <Icon
          //     style={{ paddingLeft: 10 }}
          //     onPress={() => alert("Hello")}
          //     name="md-add-circle"
          //     size={30}
          //     style={{ color: "#529ff3", marginRight: 20 }}
          //   />
          // )
        }
      }
    },
    WeightDetail: {
      screen: WeightDetail,
      navigationOptions: () => ({
        title: `Cân nặng`,
      })
    },
    WeightChartDetail: {
      screen: WeightChartDetail,
      navigationOptions: () => ({
        title: `Biểu đồ cân nặng`,
      })
    }
  },
  {
    initialRouteName: "SplashScreen"
  }
)

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: HomeNav },
  NotePage: { screen: NotePage }
})

export default AppSwitchNavigator
