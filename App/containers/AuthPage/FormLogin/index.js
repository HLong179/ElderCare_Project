import React, { Component } from 'react';
import {TextInput, View, StyleSheet, Text, TouchableHighlight, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import translate from '../../../utils/language.utils';

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
        const {email, password} = this.state;
        console.log(this.state);

        if (email === 'test@gmail.com' && password === 'test') {
            navigate('Home');
        }
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>{translate('LOGIN_header')}</Text>

                <View style={styles.inputContainer}>
                    <TextInput placeholder={translate('LOGIN_email')} style={styles.textInput} keyboardType="email-address"
                               underlineColorAndroid="transparent" auto-capitalization={false}
                               onChangeText={this.handleChangeEmail} autoCapitalize="none" isFocused="true"/>
                    <Icon name={Platform.OS === "ios" ? "ios-mail" : "md-mail"} style={styles.inputIcon}
                          size={25}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder={translate('LOGIN_password')} style={styles.textInput} secureTextEntry={true}
                               onChangeText={this.handleChangePassword}/>
                    <Icon name={Platform.OS === "ios" ? "ios-lock" : "md-lock"} style={styles.inputIcon} size={27}
                    />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={this.handleLogin}>
                    <Text style={styles.loginText}>{translate('LOGIN_loginButton')}</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => navigate('ResetPass')}>
                    <Text>{ translate('LOGIN_forgotPassword')}</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        marginLeft: 16,
        flex: 1,
    },
    buttonContainer: {
        height: 45,
        marginBottom: 20,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30


    },
    loginButton: {
        backgroundColor: "#00b5ec"
    },
    loginText: {
        color: "white",
        fontWeight: "bold"
    },
    inputIcon: {
        justifyContent: "center",
        // padding: 10,
        marginRight: 10,
        color: "gray"
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "darkslategray"

    }
});
  