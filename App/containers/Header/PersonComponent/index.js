import React, { Component } from 'react';
import CommonIcon from '../../../components/CommonIcon';
import { Text, View } from 'react-native';
import { Button, } from 'native-base';
import Menu, { MenuItem } from "react-native-material-menu";
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase"

class Bulb extends Component {
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
            firebase.messaging().unsubscribeFromTopic(idElder);
            await AsyncStorage.removeItem('curUser');
            await AsyncStorage.setItem('isLogin', 'false');
            const { navigate } = this.props.navigation;
            
            this.hideMenu();
            navigate('Login');
        }
        catch (err) {
            console.log("[LOG-OUT ERROR]");
        }
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, maginBottom: 100 }}>
                <Button transparent>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}><CommonIcon name="person" /></Text>
                        }
                    >
                        <MenuItem onPress={this.onSelectMenu}>Thêm người thân phụ</MenuItem>
                        <MenuItem onPress={this.onSelectSetTime}>Hẹn giờ</MenuItem>
                        <MenuItem onPress={this.onSelectDrugDetail}>Chi tiết đơn thuốc</MenuItem>

                        <MenuItem onPress={this.onSelectLogout}>Đăng xuất</MenuItem>

                    </Menu>
                </Button>
            </View>
        )
    }
};
export default withNavigation(Bulb);