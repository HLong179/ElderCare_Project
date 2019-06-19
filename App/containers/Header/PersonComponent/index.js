import React, { Component } from 'react';
import CommonIcon from '../../../components/CommonIcon';
import { Text, View } from 'react-native';
import { Button, } from 'native-base';
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase"
import PushNotification from 'react-native-push-notification';
import { getCurrentUser } from '../../../services/authServices';
import { Divider } from 'react-native-elements';

class Bulb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: '',
        }
    }

    componentDidMount = async () => {
        const data = await getCurrentUser();
        console.log('data', data.permission);
        this.setState({
            permission: data.permission
        })
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
        console.log('show men')
    };
    onSelectMenu = e => {
        const { navigate } = this.props.navigation;
        navigate('AddRelative');
        this.hideMenu()

    };

    onSelectSetTime = e => {
        const { navigate } = this.props.navigation;
        this.hideMenu();
        navigate('SetTime');
    }
    
    onSelectDrugDetail = () => {
        const { navigate } = this.props.navigation;
        this.hideMenu();
        navigate('DrugDetail');
    }

    onSelectLogout = async () => {
        try {
            let tempValue = await AsyncStorage.getItem('curUser');
            idElder = JSON.parse(tempValue).elderId;
            // firebase.app().messaging().unsubscribeFromTopic(idElder);
            await AsyncStorage.removeItem('curUser');
            await AsyncStorage.setItem('isLogin', 'false');
            const { navigate } = this.props.navigation;
            this.setState({
                permission: '',
            });
            
            this.hideMenu();
            navigate('Login');
        }
        catch (err) {
            console.log("[LOG-OUT ERROR]");
        }
    }
    onNotify = () => {
        PushNotification.localNotification({
            title : "Canh bao", // (optional)
            message: "Nhip tim vua nhan duoc", // (required)
            vibrate: true,
            vibration: 5000
        })
    }
    render() {
        const { permission } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, maginBottom: 100 }}>
                <Button transparent>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}><CommonIcon name="person" /></Text>
                        }
                    >
                        { permission === 'Main'? <MenuItem onPress={this.onSelectMenu}>Thêm người thân phụ</MenuItem> : null }
                        <MenuItem onPress={this.onSelectSetTime}>Hẹn giờ</MenuItem>
                        <MenuItem onPress={this.onSelectDrugDetail}>Chi tiết đơn thuốc</MenuItem>
                        <MenuItem onPress={this.onNotify}>Notify</MenuItem>

                        <MenuDivider style={{color: 'green'}}></MenuDivider>

                        <MenuItem onPress={this.onSelectLogout}>Đăng xuất</MenuItem>

                    </Menu>
                </Button>
            </View>
        )
    }
};
export default withNavigation(Bulb);