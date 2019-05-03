import React, {Component} from 'react';
import CommonIcon from '../../../components/CommonIcon';
import {Text, View} from 'react-native';
import {Button,} from 'native-base';
import Menu, {MenuItem} from "react-native-material-menu";
import { withNavigation } from 'react-navigation'

class Bulb extends  Component {
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
        const {navigate} = this.props.navigation;
        navigate('AddRelative');
        this.hideMenu()

    };

    render() {
        const {navigate} = this.props.navigation;
        console.log(navigate);

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, maginBottom: 100}}>
            <Button transparent>
                <Menu
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}><CommonIcon name="person"/></Text>
                    }
                >
                    <MenuItem onPress={this.onSelectMenu}>Add relative</MenuItem>
                    <MenuItem onPress={this.hideMenu}>Log out</MenuItem>
                </Menu>
            </Button>
            </View>
        )
    }
};
export default withNavigation(Bulb);