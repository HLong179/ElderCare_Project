import React, { Component } from "react"
import {
  Text,
  Icon,
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Title
} from "native-base"

import FooterTab from "../FooterTabs"
import AddNote from "./FormAddNote"
import ListNotes from "./ListNotes"

class NotePage extends Component {
  state = {
    modalVisible: false,
  }
  handleVisible = visible => {
    this.setState({
      modalVisible: visible
    })
  }
  render() {
    console.log(this.state.modalVisible)
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title style={{}}>Ghi chú</Title>
          </Body>
          <Right>
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => this.setState({ modalVisible: true })}
              name="md-add-circle"
              size={30}
              style={{ color: "#fff", marginRight: 20 }}
            />
          </Right>
        </Header>
        <Content>
          {this.state.modalVisible && (
            <AddNote
              modalVisible={this.state.modalVisible}
              handleVisible={this.handleVisible}
            />
          )}
          <ListNotes />
        </Content>
        <FooterTab />
      </Container>
    )
  }
}

export default NotePage
