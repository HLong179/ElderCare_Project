import React, { Component } from "react";
import { Container, Content, Form, Input, Item, Label } from "native-base";
import styled from "styled-components";
import AsyncStorage from '@react-native-community/async-storage';
import CommonItem from "../../components/CommonItemInput";
import CommonButton from "../../components/CommonButton";
import * as authServices from '../../services/authServices'; 

const Wrapper = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10;
  margin-right: 10;
  text-align: center;
  align-self: center;
  margin-bottom: 20;
`;

class AddRelative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      id: "",
      address: '',
      permission: '',
    };
  }
  componentDidMount = async () => {
      const storage = await AsyncStorage.getItem('curUser');
      const objStorage = JSON.parse(storage);

      this.setState({
        id: objStorage.elderId,
        permission: objStorage.permission
      }, () => {
        console.log(this.state);
      })
  }

  handleSubmit = async () => {
    const data = this.state;
    if(data.permission  === 'Main') {
      const reponse = await authServices.AddRelative(data);
    } else {
      alert('Not permited');
    }


  };

  render() {
    return (
      <Wrapper>
        <Content>
          <Form>
            <CommonItem stackedLabel>
              <Label>Id</Label>
              <Input
                value={this.state.id}
                autoCapitalize={"none"}
                editable={false}
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Name</Label>
              <Input
                onChangeText={name => this.setState({ name: name })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize={"none"}
                onChangeText={email =>
                  this.setState({ email })
                }
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Phone</Label>
              <Input
                onChangeText={phone => this.setState({ phone })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Username</Label>
              <Input
                onChangeText={username => this.setState({ username })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonItem stackedLabel>
              <Label>Address</Label>
              <Input
                onChangeText={address => this.setState({ address })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonButton onPress={this.handleSubmit} title="Add Relative" />
          </Form>
        </Content>
      </Wrapper>
    );
  }
}

export default AddRelative;
