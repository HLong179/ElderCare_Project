import React from "react";
import {createStackNavigator} from "react-navigation";

import HeaderWithIcon from '../containers/Header';
import CommonHeader from '../components/CommonHeader';
import AddRelative from '../containers/AddRelative';
import WelcomePage from '../containers/SplashScreen';


import Home from "../containers/Home";
import Login from "../containers/AuthPage/FormLogin";
import ResetPassword from "../containers/AuthPage/FormResetPass"
import FormHeartRate from "../containers/HeartCard/FormHeartRate";
import SetTime from "../containers/SetTime";
import HeartRate from "../containers/HeartRate";
import SleepScreen from "../containers/SleepScreen";
import MedicinePage from '../containers/MedicinePage';
import SignUp from '../containers/AuthPage/FormSignUp/Elder';
import MainRelativeSignUp from '../containers/AuthPage/FormSignUp/MainRelative';


const PrimaryNav = createStackNavigator(
    {

        Home: {
            screen: Home,
            navigationOptions: () => ({
                header: <HeaderWithIcon/>
            })
        },

        SignUp: {
            screen: SignUp,
            navigationOptions: () => ({
                title: `Đăng ký`,
              }),
        },

        MainRelativeSignUp: {
            screen: MainRelativeSignUp,
            navigationOptions: () => {
                return (<CommonHeader title='Main Relative SignUp'/>)
            }
        },
        // FormHeartRate: {
        //     screen: FormHeartRate,
        //     navigationOptions: () => ({
        //         header: <CommonHeader title="Heart Rate"/>
        //     }),
        // },

        Login: {
            screen: Login,

            // navigationOptions: {
            //     header: null
            // }

        },

        // ResetPass: {
        //     screen: ResetPassword,
        //     header: <CommonHeader title="Reset Password"/>
        // },

        AddRelative: {
            screen: AddRelative,
            navigationOptions: () => ({
                title: `Thêm người thân phụ`,
              }),
        },

        SplashScreen: {
            screen: WelcomePage
        },

        SetTime: {
            screen: SetTime,
            navigationOptions: () => ({
                title: `Hẹn giờ`,
              }),
        },
        HeartRate: {
            screen: HeartRate,
            navigationOptions: () => ({
                title: `Nhịp tim`,
              }),
        },
        SleepScreen: {
            screen: SleepScreen,
            navigationOptions: () => ({
                title: `Giấc ngủ`,
              }),
        },
        MedicinePage: {
            screen: MedicinePage,
            navigationOptions: () => ({
                title: `Quản lý thuốc`,
              }),
        }

    },
    {
        initialRouteName: "SplashScreen",

    }
);

// export default PrimaryNav;


  export default PrimaryNav;
