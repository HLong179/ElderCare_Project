import { createStackNavigator, createAppContainer  } from 'react-navigation';
import Login from './Login';
import ResetPass from './resetPass';

const Navigator = createStackNavigator({
    Login: { screen: Login },
    // Home: { screen: Home },
    ResetPass: { screen: ResetPass }
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#c43c11"
        },
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 15,
            color: "#fff"
        },
}
})
const AppNavigator= createAppContainer(Navigator);

export default AppNavigator;