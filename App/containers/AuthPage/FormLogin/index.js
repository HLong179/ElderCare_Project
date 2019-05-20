import React, {Component} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import translate from '../../../utils/language.utils';
import styled from "styled-components";
import {Content, Form, Label, Icon, Input, Toast} from "native-base";
import Item from "../../../components/CommonItemInput";
import Button from "../../../components/CommonButton";
import Wrapper from "../../../components/CommonWrapper";
import SETTINGS from "../../../settings"
import firebase from "react-native-firebase";
import config from "../../../Constant";
import {submitLogin} from '../action';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import { Formik } from 'formik';
import getSchema from './validateSchema';
import TextError from '../../../components/CommonFormError';

const StyleHeader = styled(Text)`
    font-size: 30;
    font-weight: bold;
    margin-bottom: 20;
    color: darkslategray;
    align-self: center;

`;

class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    })

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLogged: '',
        }
    }

    handleLogin = (values) => {
        const { username, password } = values;
        const data = {
            username: username.trim(),
            password: password.trim(),
        }

        fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": data.username,
                "password": data.password
            }),
        }).then(async (response) => { 
            response = await response.json();
            console.log(response);
            if (response.auth) {
                const result = await AsyncStorage.multiSet([['curUser', JSON.stringify(response.curUser[0])],['isLogin', 'true']]);
                
                if (!firebase.apps.length) {
                    const Side = firebase.initializeApp(config.opt, 'test');

                    Side.onReady().then(app => {
                     console.log('connect to firebase', response.curUser[0].elderId)
                        app.messaging().subscribeToTopic(response.curUser[0].elderId);

                        this.props.navigation.navigate('Home');
                    })
                    
                } else {
                    this.props.navigation.navigate('Home');
                }
            } else {
              Toast.show({
                text: `${response.message}`,
                buttonText: "OK",
                type: "danger"
              })
            }
        })
        .catch((error) => {
          console.log(error);
        })
       
    }

    render() {
        const  initialValues  = this.state;
        return (
          <Wrapper>
            <Content>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleLogin}
                validationSchema={getSchema()}
                enableReinitialize
              >
                {props => (
                  <Form>
                    <StyleHeader>
                      {translate("LOGIN_header")}
                    </StyleHeader>
                    <Item>
                      <Input
                        placeholder={translate("LOGIN_email")}
                        name={"username"}
                        onChangeText={props.handleChange("username")}
                        ref={input => (this._email = input)}
                        returnKeyType={"next"}
                        onSubmitEditing={event => {
                          this._password._root.focus();
                        }}
                        autoFocus={true}
                        value={props.values.username}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="mail" />
                    </Item>
                    <TextError>
                      {props.touched.username && props.errors.username}
                    </TextError>

                    {/* <Text style={{ color: "red" }}>
                      {props.touched.username && props.errors.username}
                    </Text> */}

                    <Item>
                      <Input
                        placeholder={translate("LOGIN_password")}
                        name={"password"}
                        onChangeText={props.handleChange("password")}
                        ref={input => (this._password = input)}
                        onSubmitEditing={event => {
                          this._email._root.focus();
                        }}
                        value={props.values.password}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                      />
                      <Icon active name="key" />
                    </Item>
                    <TextError>
                      {props.touched.password && props.errors.password}
                    </TextError>

                    <Button style={{marginTop: 10}}
                      onPress={props.handleSubmit}
                      title={translate("LOGIN_loginButton")}
                    />
                    <Button
                      transparent
                      color="gray"
                      title={translate("LOGIN_forgotPassword")}
                      onPress={this.handleForgotPassword}
                    />
                  </Form>
                )}
              </Formik>
            </Content>
          </Wrapper>
        );
    }
}


const mapStateToProps = state => {
    return {
        init: state.init,
}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onLogin: submitLogin,
    }, dispatch);
};

// const withConnect = connect(
//     null,
//     ma
// )


// export default compose(
//     withConnect,
// )(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
