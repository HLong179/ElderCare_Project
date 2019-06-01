import React, { Component } from "react";
import { Container, Content, Form, Input, Item, Label, Toast } from "native-base";
import styled from "styled-components";
import AsyncStorage from '@react-native-community/async-storage';
import CommonItem from "../../components/CommonItemInput";
import CommonButton from "../../components/CommonButton";
import * as authServices from '../../services/authServices'; 
import { Formik } from 'formik';
import TextError from '../../components/CommonFormError';
import getSchema from './validationSchema';
import Button from "../../components/CommonButton";


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

  handleSubmit = async (values) => {
    const data = values;
    data.id = this.state.id;
    data.permission = this.state.permission;

    if(data.permission  === 'Main') {

      try {
        const reponse = await authServices.AddRelative(data);
        Toast.show({
          text: "Add success",
          buttonText: "OK",
          type: "success"
        });
      } catch (error) {
        Toast.show({
          text: `${error}`,
          buttonText: "OK",
          type: "danger"
        });
      }
    } else {
      alert('Not permited');
    }


  };

  render() {

    const initialValues = this.state;

    return (
      <Wrapper>
        <Content>    

        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={getSchema()}
        >
          {props => (
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
                <Label>Họ và tên</Label>
                <Input
                  name={"name"}
                  onChangeText={props.handleChange("name")}
                  autoCapitalize={"none"}
                  value={props.values.name}
                />
              </CommonItem>

              <TextError>
                {props.touched.name && props.errors.name}
              </TextError>

              <CommonItem stackedLabel>
                <Label>Email</Label>
                <Input
                  autoCapitalize={"none"}
                  name={"email"}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
              </CommonItem>

              <TextError>
                {props.touched.email && props.errors.email}
              </TextError>

              <CommonItem stackedLabel>
                <Label>Số điện thoại</Label>
                <Input
                  name={"phone"}
                  onChangeText={props.handleChange("phone")}
                  autoCapitalize={"none"}
                  value={props.values.phone}
                />
              </CommonItem>

              <TextError>
                {props.touched.phone && props.errors.phone}
              </TextError>

              <CommonItem stackedLabel>
                <Label>Username</Label>
                <Input
                  name="username"
                  onChangeText={props.handleChange("username")}
                  autoCapitalize={"none"}
                  value={props.values.username}
                />
              </CommonItem>

              <TextError>
                {props.touched.username && props.errors.username}
              </TextError>

              <CommonItem stackedLabel>
                <Label>Password</Label>
                <Input
                  name="password"
                  onChangeText={props.handleChange("password")}
                  autoCapitalize={"none"}
                  value={props.values.password}
                />
              </CommonItem>

              <TextError>
                {props.touched.password && props.errors.password}
              </TextError>

              <CommonItem stackedLabel >
                <Label>Địa chỉ</Label>
                <Input
                  name={"address"}
                  onChangeText={props.handleChange("address")}
                  autoCapitalize={"none"}
                  value={props.values.address}

                />
              </CommonItem>

              <TextError>
                {props.touched.address && props.errors.address}
              </TextError>
              <Button
                onPress={props.handleSubmit}
                title="Thêm người thân"
              />
            </Form>
          )}
        </Formik>

        {/* <Form>
            <CommonItem stackedLabel>
              <Label>Id</Label>
              <Input
                value={this.state.id}
                autoCapitalize={"none"}
                editable={false}
                name={'name'}
              />
            </CommonItem>


            <CommonItem stackedLabel>
              <Label>Họ và tên</Label>
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
              <Label>Số điện thoại</Label>
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
              <Label>Địa chỉ</Label>
              <Input
                onChangeText={address => this.setState({ address })}
                autoCapitalize={"none"}
              />
            </CommonItem>
            <CommonButton onPress={this.handleSubmit} title="Thêm người thân" />
          </Form>
        </Content> */}
        </Content>
      </Wrapper>
    );
  }
}

export default AddRelative;
