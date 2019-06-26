import React, { Component } from "react"
// import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from "native-base"
import { withNavigation } from "react-navigation"

class FooterTabs extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={this.props.navigation.state.routeName === "Home"}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon android="md-home" ios="ios-home" />
            {/* <Text>Home</Text> */}
          </Button>
          <Button
            vertical
            active={this.props.navigation.state.routeName === "NotePage"}
            onPress={() => this.props.navigation.navigate("NotePage")}
          >
            <Icon android="md-chatboxes" ios="ios-people" />
            {/* <Text>Together</Text> */}
          </Button>
          {/* <Button vertical>
            <Icon name="md-people" android="md-compass" ios="ios-compass" />
          </Button> */}
        </FooterTab>
      </Footer>
    )
  }
}

export default withNavigation(FooterTabs)
