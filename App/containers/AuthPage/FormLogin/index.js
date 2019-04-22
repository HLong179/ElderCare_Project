import React, {Component} from 'react';
import {Text} from 'react-native';
import translate from '../../../utils/language.utils';
import styled from "styled-components";
import {Content, Form, Label, Icon, Input} from "native-base";
import Item from "../../../components/CommonItemInput";
import Button from "../../../components/CommonButton";
import Wrapper from "../../../components/CommonWrapper";

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
            email: '',
            password: ''
        }
    }

    handleChangeEmail = (value) => {
        this.setState({email: value});
    };

    handleChangePassword = (value) => {
        this.setState({password: value});
    };

    handleLogin = e => {
        const {navigate} = this.props.navigation;
        // const {email, password} = this.state;
        console.log(this.state);
        //
        // if (email === 'test@gmail.com' && password === 'test') {
        //     navigate('Home');
        // }
        navigate('Home');

    };
    handleForgotPassword = e => {
        const {navigate} = this.props.navigation;
        navigate('ResetPass');
    };

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

