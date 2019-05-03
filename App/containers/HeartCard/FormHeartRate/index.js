import React, { Component } from 'react';
import { Text  } from "native-base"
import { TouchableOpacity, View, TextInput, Button } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'react-native-firebase';
import config from '../../../Constant'

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    }
 
  }
  
   // state = {
  //   isDateTimePickerVisible: true,
  // };

  // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // _handleDatePicked = (date) => {
  //   // do something with firebase here!!

  //   // const ref = firebase.database().ref('Users/Devices/S1mdk2XxXg/Interval');
  //   // ref.set()


  //   console.log('A date has been picked: ', date);
  //   this._hideDateTimePicker();
  //};
  // handleChangeText = (value) => {
  //   console.log('change the text: ', value)
  //   this.setState({
  //     time: value
  //   })
  // }

  handleSubmit = () => {
    let value = this.state.time;
    // console.log('thiss iss value of interval!!!!!!!!!!!!!!  ',value)
    
    // const check = firebase.initializeApp(config.opt, 'test');
    // check.onReady().then(app => {
      const ref = firebase.app().database().ref('/Users/Devices/S1mdk2XxXg/Interval');
      // app.messaging().subscribeToTopic('S1mdk2XxXg');
      ref.set(+value);
    // })
    
    
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
        /> */}
        <TextInput style={{height: 50, width: 300, borderWidth: 2, color: "red"}}  onChangeText={(value) => this.setState({time: value})}/>
        <Button title="Submit" style={{marginTop: 30, marginLeft: 140}} rounded success onPress={this.handleSubmit}>
        </Button> 
      </View>
    );
  }

}