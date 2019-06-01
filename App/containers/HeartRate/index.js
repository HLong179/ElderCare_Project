import React from "React";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import CommonButton from "../../components/CommonButton";
import firebase from "react-native-firebase"
import { Content, Form, Icon, Input, Button, Text} from 'native-base';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushLine, VictoryScatter, VictoryTheme } from "victory-native";
import moment from "moment"
import AsyncStorage from '@react-native-community/async-storage';
import SETTINGS from "../../settings"
import call from 'react-native-phone-call';
import { func } from "prop-types";


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
class HeartRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drPhoneNo: "",
      heartData: [
      ],
      displayHeartData: null
      // dayHeartRate: true,
      // weekHeartRate: false,
      // monthHeartRate: false
    }
  }
  componentWillMount = async () => {
    let dataCur = await AsyncStorage.getItem('curUser');
    let jsonData = JSON.parse(dataCur);
    fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/getDoctorPhoneNum`, {
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
      this.setState({ drPhoneNo: response.doctorPhoneNum })
    })

    const patientsRef = firebase.database().ref("Patients").on("value", async snapshot => {
      let dataset = [];
      let patients = await snapshot.val()["184305179"].HeartRate;
      for (let patient in patients) {
        let heartRateValue = patients[patient]["value"];
        let timeLabel = new Date(+patients[patient]["time"]);
        dataset.push({x: timeLabel, y: heartRateValue})
        console.log(">>>Dts", dataset);
      }
      this.setState({displayHeartData: dataset, heartData: dataset})
    })
  }
  componentDidMount() {
    
  }
  pressDayBtn = async () => {
    // if (!this.state.dayHeartRate) {
    //   this.setState({
    //     dayHeartRate: true,
    //     weekHeartRate: false,
    //     monthHeartRate: false
    //   })
    // }
    let newHeartData = [];
    let today = new Date();
    var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    for (let row in this.state.heartData) {
      if (this.state.heartData[row].x >= yesterday)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length === 0) {
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({ displayHeartData: newHeartData })
  }
  pressWeekBtn = () => {
    // if (!this.state.weekHeartRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: true,
    //     monthHeartRate: false
    //   })
    // }
    let newHeartData = [];
    let today = new Date();
    var lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    for (let row in this.state.heartData) {
      if (this.state.heartData[row].x >= lastWeek)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length === 0) {
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({ displayHeartData: newHeartData })
  }
  pressMonthBtn = () => {
    // if (!this.state.dayMonthRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: false,
    //     monthHeartRate: true
    //   })
    // }
    let newHeartData = [];
    let today = new Date();
    var lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    for (let row in this.state.heartData) {
      if (this.state.heartData[row].x >= lastMonth)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length === 0) {
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({ displayHeartData: newHeartData })
  }
  callDoctor = () => {
    const args = {
      number: this.state.drPhoneNo, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
  }

  render() {
    if (this.state.displayHeartData === null) {
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
            <CommonButton style={styles.dayStyle} onPress={this.pressDayBtn} title="Ngày"></CommonButton>
          </TouchableHighlight>
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
        <VictoryChart theme={VictoryTheme.material} width={380} height={300} scale={{ x: "time" }}>
          <VictoryLine
            animate={{ duration: 1000 }}
            style={{
              data: { stroke: "tomato" }
            }}
            data={this.state.displayHeartData}
          />
          <VictoryAxis label="Thời gian" style={{ axisLabel: { padding: 35 }, tickLabels: { padding: 10, angle: -45 } }} />
          <VictoryAxis dependentAxis label="Nhịp tim (BPM)" style={{ axisLabel: { angle: -90, padding: -20 } }} />
          <VictoryScatter data={this.state.displayHeartData}
            size={2}
            style={{ data: { fill: "#c43a31" } }}
          />
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

export default HeartRate;