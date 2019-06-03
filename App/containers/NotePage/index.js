import React, { Component } from "react"
import { Text, Icon, Container, Header, Content } from "native-base"

import FooterTab from "../FooterTabs"

class NotePage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>Welcome</Text>
        </Content>
        <FooterTab />
      </Container>
    )
  }
}

export default NotePage
