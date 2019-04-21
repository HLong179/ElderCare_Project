import React, { Component } from 'react';
import {TextInput, View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';

class resetPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idString: ''
        }
    }
   
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            <Text style={{marginBottom: 20}}>Please enter your information below.</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="ID (Email or phone number)" style={styles.textInput} keyboardType="email-address" underlineColorAndroid="transparent" auto-capitalization={false} />
                    <Icon name={Platform.OS === "ios" ? "ios-mail" : "md-mail"} style={styles.inputIcon} size={25} />
                </View>
                <View style={{flexDirection:"row"}}>
                    <Button buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} type="clear" title="Cancel" onPress={() => navigate("Login")}/>
                    <Button buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} type="clear" title="Confirm" disabled={!this.state.isIdEmpty}/>
                </View>
            </View>
        );
    }
}

export default resetPass;

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
        fontSize: 12
    },
    inputIcon: {
        justifyContent: "center",
        // padding: 10,
        marginRight: 10,
        color: "blue"
    },
    buttonStyle: {
        marginRight: 50,
        marginBottom: 20,
    },
    titleStyle: {
        color: "black"
    }

  });
  