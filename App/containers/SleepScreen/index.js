import React from "React";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Content, Form, Icon, Input, Button, Text} from 'native-base';
import CommonButton from "../../components/CommonButton";
import firebase from "react-native-firebase"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryBrushLine, VictoryScatter, VictoryTheme } from "victory-native";
import moment from "moment"
import AsyncStorage from '@react-native-community/async-storage';
import SETTINGS from "../../settings"
import call from 'react-native-phone-call';


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 5,
    padding: 10,
  },
  liked: {
    color: '#e74c3c',
  },
  text: {
    marginTop: 20,
  },
});
class SleepScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drPhoneNo: "",
      sleepData: [
        { x: new Date(2019, 4, 16), y: 8.5 },
        { x: new Date(2019, 4, 17), y: 6.5 },
        { x: new Date(2019, 4, 18), y: 7 },
        { x: new Date(2019, 4, 19), y: 6 },
        { x: new Date(2019, 4, 20), y: 8 },
        { x: new Date(2019, 4, 21), y: 7.5 },
        { x: new Date(2019, 4, 22), y: 7.6 },
        { x: new Date(2019, 4, 23), y: 8 },
        { x: new Date(2019, 4, 24), y: 8 },
        { x: new Date(2019, 4, 25), y: 7.2 },
        { x: new Date(2019, 4, 26), y: 7.3 },
      ],
      displaySleepData: null
    }
  }
  componentWillMount = async () => {
    let dataCur = await AsyncStorage.getItem('curUser');
    let jsonData = JSON.parse(dataCur);
    console.log(">>>>>>>>>>", jsonData)
    fetch(`${SETTINGS.LOCAL_IP}/account/getDoctorPhoneNum`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "elderId": jsonData.elderId
      }),
    }).then(async (response) => {
      response = await response.json();
      console.log(response);
      this.setState({ drPhoneNo: response.doctorPhoneNum, displaySleepData: this.state.sleepData })
    })
  }
  pressWeekBtn = () => {
    // if (!this.state.weekHeartRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: true,
    //     monthHeartRate: false
    //   })
    // }
    let newSleepData = [];
    let today = new Date();
    var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    for (let row in this.state.sleepData) {
      if (this.state.sleepData[row].x >= lastWeek)
        newSleepData.push(this.state.sleepData[row]);
    }
    if (newSleepData.length === 0) {
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({ displaySleepData: newSleepData })
  }
  pressMonthBtn = () => {
    // if (!this.state.dayMonthRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: false,
    //     monthHeartRate: true
    //   })
    // }
    let newSleepData = [];
    let today = new Date();
    var lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    for (let row in this.state.sleepData) {
      if (this.state.sleepData[row].x >= lastMonth)
        newSleepData.push(this.state.sleepData[row]);
    }
    if (newSleepData.length === 0) {
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({ displaySleepData: newSleepData })
  }
  callDoctor = () => {
    const args = {
      number: this.state.drPhoneNo, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
  }

  render() {
    if (this.state.displaySleepData === null) {
      return (
        <View>
          <Text>Đang tải dữ liệu</Text>
        </View>
      )
    }
    // const dayStyle = this.state.dayHeartRate ? styles.liked : null;
    // const weekStyle = this.state.weekHeartRateHeartRate ? styles.liked : null;
    // const monthStyle = this.state.monthHeartRate ? styles.liked : null;
    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.btn}
            underlayColor="#fefefe"
          >
            <CommonButton style={styles.weekStyle} onPress={this.pressWeekBtn} title="Tuần"></CommonButton>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor="#fefefe"
          >
            <CommonButton style={styles.monthStyle} onPress={this.pressMonthBtn} title="Tháng"></CommonButton>
          </TouchableHighlight>
        </View>
        <VictoryChart theme={VictoryTheme.material} width={380} height={300} scale={{ x: "time"}} domainPadding={{ x: 30, y: [0, 20] }}>
          {/* <VictoryLine
            animate={{ duration: 1000 }}
            style={{
              data: { stroke: "tomato" }
            }}
            data={this.state.displaySleepData}
          />
          <VictoryAxis label="Thời gian" style={{ axisLabel: { padding: 35 }, tickLabels: { padding: 10, angle: -45 } }} />
          <VictoryAxis dependentAxis label="Nhịp tim (BPM)" style={{ axisLabel: { angle: -90, padding: -20 } }} />
          <VictoryScatter data={this.state.displaySleepData}
            size={5}
            style={{ data: { fill: "#c43a31" } }}
          /> */}
          <VictoryBar
          animate={{ duration: 1000 }}
          style={{
            data: { fill: "tomato" }
          }}
          data={this.state.displaySleepData}
          />
          <VictoryAxis label="Thời gian" style={{ axisLabel: { padding: 35 }, tickLabels: { padding: 10, angle: -45 } }} />
          <VictoryAxis dependentAxis label="Số giờ ngủ (giờ)" style={{ axisLabel: { angle: -90, padding: -20 } }} />
        </VictoryChart>
        <Text>
          {"\n"}
        </Text>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#fefefe"

        >
          <Button iconLeft block warning onPress={this.callDoctor}>
            <Icon name='call' />
            <Text>Gọi bác sĩ</Text>
          </Button>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SleepScreen;
