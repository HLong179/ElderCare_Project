import React, { Component } from 'react';
import {TextInput, View, Button, StyleSheet, Text, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleChangeEmail = e => {

    }

    handleChangePassword = e => {

    }

    handleLogin = e => {

    }
    // static navigationOptions = {
    //     title: 'Login',
    //     // headerStyle: {
    //     //     backgroundColor: "#c43c11"
    //     // },
    //     // headerTitleStyle: {
    //     //     fontWeight: "bold"
    //     // },
    //     // headerTintColor: "#fff"
    // }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" underlineColorAndroid="transparent" auto-capitalization={false}></TextInput>
                    <Icon name={Platform.OS === "ios" ? "ios-mail" : "md-mail"} style={styles.inputIcon} size={25} ></Icon>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Password" style={styles.textInput}  secureTextEntry={true} ></TextInput>
                    <Icon name={Platform.OS === "ios" ? "ios-lock" : "md-lock"} style={styles.inputIcon} size={27} ></Icon>
                </View>
               
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => navigate('Home')} >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => navigate('ResetPass')} >
                    <Text >Forgot password</Text>
                </TouchableHighlight>
                <View>

                </View>
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
        borderRadius:30,
        width:300,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
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
        color: "blue"
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20

    }
  });
  