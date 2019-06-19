import React, {Component} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
            isLogged: ''
        }
            
    }
    handleLogin = (values) => {
      
        const { username, password } = values;
        const data = {
            username: username.trim(),
            password: password.trim(),
        }
        
        console.log('path',`${SETTINGS.LOCAL_IP}/account/login`);

        fetch(`${SETTINGS.LOCAL_IP}/account/login`, {
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
              
              console.log("clgt what the fuck is happend?????")
                const result = await AsyncStorage.multiSet([['curUser', JSON.stringify(response.curUser[0])],['isLogin', 'true']]);
                console.log("our firebae application already have? : " , firebase.apps)
                
                if (!firebase.apps.length) {
                  console.log('connect to firebase', response.curUser[0].elderId)
                    const Side = firebase.initializeApp(config.opt, 'test');
                    
                    Side.onReady().then(app => {
                   
                      app.messaging().subscribeToTopic(response.curUser[0].elderId);

                        this.props.navigation.navigate('Home');
                    })
                    
                } else {
                    firebase.messaging().subscribeToTopic(response.curUser[0].elderId);
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

    onClickSignUp = () => {
      const { navigate } = this.props.navigation;
      console.log('sign up click');
      navigate('SignUp');
    }


    onMainRelativeSignUp = () => {
      const { navigate } = this.props.navigation;
      navigate('MainRelativeSignUp');
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
                      {'Login In'}
                    </StyleHeader>
                    <Item>
                      <Input
                        placeholder={'Username'}
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
                        placeholder={'Password'}
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
                      title={'LOGIN'}
                    />
                    <Button
                      transparent
                      color="gray"
                      title={'Forgot password'}
                      onPress={this.handleForgotPassword}
                    />
                    <Button transparent color={'blue'} primary title={"Đăng kí tài khoản mới"} onPress={this.onClickSignUp} />
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
