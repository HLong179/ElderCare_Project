import React, {Component} from 'react';
import CommonIcon from '../../../components/CommonIcon';
import {Text, View} from 'react-native';
import {Button,} from 'native-base';
import Menu, {MenuItem} from "react-native-material-menu";



export default class Bulb extends  Component {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, maginBottom: 100}}>
            <Button transparent>
                <Menu
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}><CommonIcon name="person"/></Text>
                    }
                >
                    <MenuItem onPress={this.hideMenu}>Log out</MenuItem>
                </Menu>
            </Button>
            </View>
        )
    }
};