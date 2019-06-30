import React, {Component} from 'react';
import {Text} from 'react-native';
import styled from "styled-components";
import {Content, Form, Label, Icon, Input, Toast, ListItem, Picker } from "native-base";
import Item from "../../../../components/CommonItemInput";
import Button from "../../../../components/CommonButton";
import Wrapper from "../../../../components/CommonWrapper";
import { Formik } from 'formik';
import * as authServices from '../../../../services/authServices';
import AsyncStorage from '@react-native-community/async-storage';
import TextError from '../../../../components/CommonFormError';
import getSchema from './validationSchema';
import { BackHandler } from 'react-native'

const StyleHeader = styled(Text)`
    font-size: 30;
    font-weight: bold;
    margin-bottom: 20;
    color: darkslategray;
    align-self: center;
`;

class MainRelative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icid: '',
            name: '',
            email: '',
            phone: '',
            address: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    componentDidMount = async() => {
        const result = await AsyncStorage.getItem('currElderId');
        this.setState({
            icid: result,
        })
    }

    handleAddMain = async (values) => {
        const { icid } = this.state;
        const {
            name,
            email,
            phone,
            address,
            username,
            password,
            confirmPassword
        } = values;

        const data = {
            icid,
            name,
            email,
            phone,
            address,
            username,
            password,
            confirmPassword
        }
        try {
          const response = await authServices.addMainRelative(data);
          const { navigate } = this.props.navigation;
          Toast.show({
            text: 'Add success',
            buttonText: "OK",
            type: 'success'
          })

          navigate('Login');
        } catch(error) {
          Toast.show({
            text: `${error}`,
            buttonText: "OK",
            type: 'danger'
          })
        }

    }
    componentWillMount() {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    }

    handleBackButtonClick = () => {
      this.props.navigation.navigate('Home');
      return true;
    }
    render() {
        const initialValues = this.state;
        return (
            <Wrapper>
            <Content>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleAddMain}
                validationSchema={getSchema()}
              >
                {props => (
                  <Form>
                    <StyleHeader>Đăng Ký Người Thân Chính</StyleHeader>
                    <Item>
                      <Input
                        placeholder={"ICID của bệnh nhân"}
                        name={"icid"}
                        onChangeText={props.handleChange("icid")}
                        value={this.state.icid}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="person-add" />
                    </Item>

                    <Item>
                      <Input
                        placeholder={"Tên người thân chính"}
                        name={"name"}
                        onChangeText={props.handleChange("name")}
                        value={props.values.name}
                        autoCapitalize={"none"}
                        autoFocus
                      />
                      <Icon active name="person-add" />
                    </Item>

                    <TextError>
                      {props.touched.name && props.errors.name}
                    </TextError>


                    <Item>
                      <Input
                        placeholder={"Email"}
                        name={"email"}
                        onChangeText={props.handleChange("email")}
                        value={props.values.email}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="mail" />
                    </Item>

                    <TextError>
                      {props.touched.email && props.errors.email}
                    </TextError>

                    <Item>
                      <Input
                        placeholder={"Phone"}
                        name={"phone"}
                        onChangeText={props.handleChange("phone")}
                        value={props.values.phone}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="call" />
                    </Item>
                    <TextError>
                      {props.touched.phone && props.errors.phone}
                    </TextError>

                    <Item>
                      <Input
                        placeholder={"Địa chỉ"}
                        name={"address"}
                        onChangeText={props.handleChange("address")}
                        value={props.values.address}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="locate" />
                    </Item>

                    <TextError>
                      {props.touched.address && props.errors.address}
                    </TextError>

                    <Item>
                      <Input
                        placeholder={"Tên đăng nhập"}
                        name={"username"}
                        onChangeText={props.handleChange("username")}
                        value={props.values.username}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="body" />
                    </Item>


                    <TextError>
                      {props.touched.username && props.errors.username}
                    </TextError>

                    <Item>
                      <Input
                        placeholder={"Mật khẩu"}
                        name={"password"}
                        onChangeText={props.handleChange("password")}
                        value={props.values.password}
                        autoCapitalize={"none"}
                        secureTextEntry={true}

                      />
                      <Icon active name="lock" />
                    </Item>
                    <TextError>
                      {props.touched.password && props.errors.password}
                    </TextError>

                    <Item>
                      <Input
                        placeholder={"Xác nhận mật khẩu"}
                        name={"confirmPassword"}
                        onChangeText={props.handleChange("confirmPassword")}
                        value={props.values.confirmPassword}
                        autoCapitalize={"none"}
                        secureTextEntry={true}

                      />
                      <Icon active name="lock" />
                    </Item>


                    <TextError>
                      {props.touched.confirmPassword && props.errors.confirmPassword}
                    </TextError>

                    <Button
                      style={{ marginTop: 10 }}
                      onPress={props.handleSubmit}
                      title={"Thêm người thân"}
                    />
                  </Form>
                )}
              </Formik>
            </Content>
          </Wrapper>

        )
    }
}

export default MainRelative;