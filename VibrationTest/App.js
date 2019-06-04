/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, Vibration, Button } from "react-native";


const PATTERN = [ 1000, 2000 ] ; //nghỉ 1s > rung 2s > nghỉ 1s > rung 2s > .....

export default class App extends Component {

  startVibrate=()=>{
   Vibration.vibrate(PATTERN, true) ;
 }


  stopVibrate=()=>{
   // Stop Vibration.
   Vibration.cancel();
 }

   render() {
     return (
       <View style={styles.container}>

        <View style={{margin: 20}}>
         <Button title = "Rung" onPress = {this.startVibrate} />
       </View>

       <View style={{margin: 20}}>
        <Button title = "Ngưng" onPress = {this.stopVibrate} />
       </View>

     </View>
     );
   }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center'
 }
});