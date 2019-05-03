import React, {Component} from 'react';
import {Text} from 'react-native';
import translate from '../../../utils/language.utils';
import styled from "styled-components";
import {Content, Form, Label, Icon, Input} from "native-base";
import Item from "../../../components/CommonItemInput";
import Button from "../../../components/CommonButton";
import Wrapper from "../../../components/CommonWrapper";
import firebase from 'react-native-firebase';
import config from '../../../Constant'
const StyleHeader = styled(Text)`
    font-size: 30;
    font-weight: bold;
    margin-bottom: 20;
    color: darkslategray;
    align-self: center;

`;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChangeEmail = (value) => {
        this.setState({username: value});
    };

    handleChangePassword = (value) => {
        this.setState({password: value});
    };

    handleLogin = () => {
        const {navigate} = this.props.navigation;
        
        // const hhh = {
        //     databaseURL: "https://eldercare-5e4c8.firebaseio.com",
        //     projectId: "eldercare-5e4c8",
        //     apiKey: "AIzaSyBhgCvEUPBxv4JoqairKRVR8ijSnDKED-M",
        //     appId: "1:49718683704:android:25929f370dd722de",
        //     messagingSenderId: "49718683704",
        //     storageBucket: "eldercare-5e4c8.appspot.com",
        //     clientId: "49718683704-ipl6t2j9c9rtub3hisae556k4l04fjji.apps.googleusercontent.com",
        //     // persistence: true,
        // }
       
        // if (check) {
           
        // }
       
       

        // e.preventDef
      return  fetch('http://192.168.1.107:6900/account/login',  {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(
            response => {
                response.json();
                console.log('the result after login : ', response);
                const Side =  firebase.initializeApp(config.opt, 'test');
                Side.onReady().then(app => {
                    app.messaging().subscribeToTopic('S1mdk2XxXg');
                    navigate('Home');
                })
                
            }
        )
        .catch(e => console.log(e))
        // navigate('Home')
    }
  
    render() {
        return (
            <Wrapper>
                <Content>
                    <Form>
                        <StyleHeader>{translate('LOGIN_header')}</StyleHeader>
                        <Item >
                            <Input placeholder={translate('LOGIN_email')}
                                   onChangeText={this.handleChangeEmail}
                                   ref={(input) => this._email = input }
                                   returnKeyType={"next"}
                                   onSubmitEditing={(event) => {this._password._root.focus()}}
                                   autoCapitalize={"none"}
                            />
                            <Icon active name="mail"/>

                        </Item>
                        <Item >
                            <Input placeholder={translate('LOGIN_password')}
                                   onChangeText={this.handleChangePassword}
                                   ref={(input) => this._password = input }
                                   onSubmitEditing={(event) => {this._email._root.focus()}}
                                   autoCapitalize={"none"}
                            />
                            <Icon active name="key"/>
                        </Item>
                        <Button onPress={this.handleLogin} title={translate('LOGIN_loginButton')}/>
                        <Button transparent color="gray" title={translate('LOGIN_forgotPassword')}
                                onPress={this.handleForgotPassword}/>
                    </Form>
                </Content>
            </Wrapper>

        );
    }
}

export default Login;

