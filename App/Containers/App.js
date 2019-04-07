import '../Config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { View, Text } from 'react-native';
import Home from "./Home";
// import RootContainer from './RootContainer'
import { Container, Header, Content } from 'native-base';

import FooterTabs from "./FooterTabs";
import HeaderWithIcon from "./Header";
import FormHeartRate from './HeartCard/FormHeartRate'
import createStore from '../Redux'
import PrimaryNav from '../Navigation/AppNavigation'
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like <t></t>his to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
      <PrimaryNav> 
       <Container>
          <HeaderWithIcon></HeaderWithIcon>
          <Content padder>
            {/* <Home /> */}
          </Content>
          <FooterTabs></FooterTabs> 
        </Container> 

       </PrimaryNav> 
       


        {/* <RootContainer /> */}
       </Provider> 
    )
  }
}

export default App
