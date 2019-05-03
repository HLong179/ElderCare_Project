import React, {Component} from 'react';
import CommonIcon from '../../../components/CommonIcon';
import {Text } from 'react-native';
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
            <Button transparent>
                <Menu
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}><CommonIcon name="bulb"/></Text>
                    }
                >
                    <MenuItem onPress={this.hideMenu}>bulb</MenuItem>

                </Menu>
            </Button>
        )
    }
};