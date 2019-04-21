import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PrimaryNav from "../navigation/AppNavigation"
import { Container, Header, Content } from 'native-base';
import HeaderWithIcon from "./Header";
import FooterTabs from "./FooterTabs";
import { MenuProvider } from 'react-native-popup-menu';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
        <MenuProvider>

        <View style={{flex: 1}}>
        <PrimaryNav>
          <Container>
            <HeaderWithIcon />
            <FooterTabs></FooterTabs>
          </Container>

        </PrimaryNav>
      </View>
        </MenuProvider>

    );
  }
}

