import React from "React";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import CommonButton from "../../components/CommonButton";
import firebase from "react-native-firebase"
import { Content, Form, Icon, Input } from 'native-base';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryBrushLine, VictoryScatter, VictoryTheme } from "victory-native";
import moment from "moment"

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
      heartData: [
        { x: new Date(2019, 4, 1, 10, 30, 30), y: 85 },
        { x: new Date(2019, 4, 2, 10, 31, 30), y: 75 },
        { x: new Date(2019, 4, 3, 10, 32, 30), y: 85 },
        { x: new Date(2019, 4, 4, 10, 33, 30), y: 115 },
        { x: new Date(2019, 4, 4, 10, 34, 30), y: 120 },
        { x: new Date(2019, 4, 6, 10, 34, 30), y: 110 },
        { x: new Date(2019, 4, 7, 10, 36, 30), y: 65 },
        { x: new Date(2019, 4, 8, 10, 37, 30), y: 75 },
        { x: new Date(2019, 4, 9, 10, 30, 30), y: 85 },
        { x: new Date(2019, 4, 10, 10, 31, 30), y: 75 },
        { x: new Date(2019, 4, 11, 10, 32, 30), y: 85 },
        { x: new Date(2019, 4, 12, 10, 33, 30), y: 115 },
        { x: new Date(2019, 4, 13, 10, 34, 30), y: 120 },
        { x: new Date(2019, 4, 14, 10, 34, 30), y: 110 },
        { x: new Date(2019, 4, 15, 10, 36, 30), y: 65 },
        { x: new Date(2019, 4, 16, 10, 37, 30), y: 75 }
      ],
      displayHeartData: []
      // dayHeartRate: true,
      // weekHeartRate: false,
      // monthHeartRate: false
    }
  }
  componentWillMount() {
    this.setState({displayHeartData: this.state.heartData})
  }
  pressDayBtn = async () => {
    // if (!this.state.dayHeartRate) {
    //   this.setState({
    //     dayHeartRate: true,
    //     weekHeartRate: false,
    //     monthHeartRate: false
    //   })
    // }
    // const patientsRef = firebase.database().ref("Patients");
    // await patientsRef.on("value", async snapshot => {
    //   let patients = snapshot.val()["184305179"];
    //   console.log("Patient Heartrate array:", patients.HeartRate);
    // })
    let newHeartData =[];
    let today = new Date();
    var yesterday= new Date(today.getTime() - 24 * 60 * 60 * 1000);
    for(let row in this.state.heartData)
    {
      if (this.state.heartData[row].x >= yesterday)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length===0){
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({displayHeartData: newHeartData})
  }
  pressWeekBtn = () => {
    // if (!this.state.weekHeartRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: true,
    //     monthHeartRate: false
    //   })
    // }
    let newHeartData =[];
    let today = new Date();
    var lastWeek= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    for(let row in this.state.heartData)
    {
      if (this.state.heartData[row].x >= lastWeek)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length===0){
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({displayHeartData: newHeartData})
  }
  pressMonthBtn = () => {
    // if (!this.state.dayMonthRate) {
    //   this.setState({
    //     dayHeartRate: false,
    //     weekHeartRate: false,
    //     monthHeartRate: true
    //   })
    // }
    let newHeartData =[];
    let today = new Date();
    var lastMonth= new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    for(let row in this.state.heartData)
    {
      if (this.state.heartData[row].x >= lastMonth)
        newHeartData.push(this.state.heartData[row]);
    }
    if (newHeartData.length===0){
      alert("Không tìm thấy dữ liệu phù hợp")
    }
    else
      this.setState({displayHeartData: newHeartData})
  }

  render() {
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
            <CommonButton style={styles.dayStyle} onPress={this.pressDayBtn} title="Day"></CommonButton>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor="#fefefe"
          >
            <CommonButton style={styles.weekStyle} onPress={this.pressWeekBtn} title="Week"></CommonButton>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor="#fefefe"
          >
            <CommonButton style={styles.monthStyle} onPress={this.pressMonthBtn} title="Month"></CommonButton>
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
            size={5}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      </View>
    );
  }
}

export default HeartRate;
