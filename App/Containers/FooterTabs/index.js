import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


export default class FooterTabs extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon android="md-menu" ios="ios-menu" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon android="md-people" ios="ios-people" />
              <Text>Together</Text>
            </Button>
            <Button vertical>
              <Icon name="person" android="md-compass" ios="ios-compass" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}
