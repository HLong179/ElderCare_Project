import React, { Component } from 'react';
import CommonIcon from '../../Components/CommonIcon';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderMultipleIconExample extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <CommonIcon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Health App</Title>
          </Body>
          <Right>
            <Button transparent>
              <CommonIcon name="bulb" />
            </Button>
            <Button transparent>
              <CommonIcon name="person" />
            </Button>
            <Button transparent>
              <CommonIcon name="more" />
            </Button>
          </Right>
        </Header>
    );
  }
}