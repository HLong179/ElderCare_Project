import React, { Component } from 'react';
import {TextInput, View, Button, StyleSheet, Text, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import config from '../../../Constant'
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    componentDidMount() {
        
    }
    
    handleChangeEmail = e => {

    }

    handleChangePassword = e => {

    }

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
      return  fetch('http://localhost:6900/account/login',  {
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
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({'username': text})} auto-capitalization={false}></TextInput>
                    <Icon name={Platform.OS === "ios" ? "ios-mail" : "md-mail"} style={styles.inputIcon} size={25} ></Icon>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Password" onChangeText={(text) => this.setState({'password': text})} style={styles.textInput}  secureTextEntry={true} ></TextInput>
                    <Icon name={Platform.OS === "ios" ? "ios-lock" : "md-lock"} style={styles.inputIcon} size={27} ></Icon>
                </View>
               
                <Button style={[styles.buttonContainer, styles.loginButton]} title="Login" onPress={() => this.handleLogin()} >
                   
                </Button>

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
  