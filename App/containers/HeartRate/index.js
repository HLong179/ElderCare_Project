import React from "React"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import firebase from "react-native-firebase";
import {elderCare} from '../../Constant'
import {
  Icon,
  Button,
  Text,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Container,
  Header
} from "native-base"
import { filterByTime } from "../../utils/timeConvert.util"

import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import call from "react-native-phone-call"
import { compare } from "../../utils/sort"
import {
  averageDateByWeek,
  averageDateByMonth
} from "../../utils/timeConvert.util"
import Chart from "./Chart"
import moment from "moment"

// const Chart = React.lazy(() => import ('./Chart'));

class HeartRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drPhoneNo: "",
      heartData: [],
      displayHeartData: null,
      isLoading: false,
      selected: null,
      currentPage: 0
    }
  }
  componentDidMount = async () => {
    let dataCur = await AsyncStorage.getItem("curUser")
    let jsonData = JSON.parse(dataCur)
    this.setState({
      isLoading: true
    })
    fetch(`${SETTINGS.LOCAL_IP}/account/getDoctorPhoneNum`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: jsonData.elderId
      })
    }).then(async response => {
      response = await response.json()
      this.setState({ drPhoneNo: response.doctorPhoneNum })
    })
    if (firebase.apps.length === 0 ) {
       alert("Mất kết nối, vui lòng đăng xuất và thử lại");
    } else {
      // elderCare.onReady()
      // .then(app => {
       await firebase.app('elder_care_mobile').database().ref("Patients").child(jsonData.elderId).child("HeartRate").once("value", snapshot => {
          let rawData = [...Object.values(snapshot.val())]
          rawData.sort(compare)
          console.log("length", rawData.length)
          let data = {
            labels: [],
            heartRates: []
          }
          let dataDisplay = {
            labels: [],
            heartRates: []
          }
          for (let patient in rawData) {
            let timeLabel = moment(rawData[patient]["time"]).format(
              "DD/MM/YYYY HH:mm:ss"
            )
            if (!data.labels.includes(rawData[patient]["time"])) {
              data.labels.push(rawData[patient]["time"])
              data.heartRates.push(rawData[patient]["value"])
              dataDisplay.labels.push(timeLabel)
              dataDisplay.heartRates.push(rawData[patient]["value"])
            }
          }

          this.setState(
            {
              isLoading: false,
              heartData: data,
              displayHeartData: dataDisplay
            },
            () => this.pressDayBtn()
          )
        }) 
      // })
      // .catch(err => console.log(err))
    }
  }
  averageOfArray = arr => {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += arr[i]
    }
    return (result / arr.length).toFixed(1)
  }
  pressDayBtn = () => {
    const { heartData } = this.state
    //currentTime
    const rate = {}
    const data = {
      labels: [],
      heartRates: []
    }
    for (let i = 0; i < heartData.labels.length; i++) {
      let timeLabel = moment(parseInt(heartData.labels[i], 10)).format("DD/MM")
      if (rate[timeLabel]) {
        rate[timeLabel].push(heartData.heartRates[i])
      } else {
        rate[timeLabel] = [heartData.heartRates[i]]
      }
    }
    for (let y in rate) {
      data.labels.push(y)
      data.heartRates.push(this.averageOfArray(rate[y]))
    }
    // const endTime = new Date(heartData[heartData.length -1].time).getTime();
    // const startTime = new Date(endTime - 86400*7*1000).setHours(0, 0, 0, 0);
    // let data = filterByTime(heartData, startTime, endTime);

    this.setState({
      displayHeartData: data
    })
  }

  pressWeekBtn = () => {
    const { heartData } = this.state
    const data = {
      labels: [],
      heartRates: []
    }
    let rate = {}
    for (let i = 0; i < heartData.labels.length; i++) {
      let timeLabel = heartData.labels[i]

      if (moment(timeLabel).date() >= 1 && moment(timeLabel).date() <= 7) {
        let weekTime = `1/${moment(timeLabel).month() + 1}/${moment(
          timeLabel
        ).year()}`
        if (rate[weekTime]) {
          rate[weekTime].push(heartData.heartRates[i])
        } else {
          rate[weekTime] = [heartData.heartRates[i]]
        }
      } else if (
        moment(timeLabel).date() >= 8 &&
        moment(timeLabel).date() <= 14
      ) {
        let weekTime = `8/${moment(timeLabel).month() + 1}/${moment(
          timeLabel
        ).year()}`
        if (rate[weekTime]) {
          rate[weekTime].push(heartData.heartRates[i])
        } else {
          rate[weekTime] = [heartData.heartRates[i]]
        }
      } else if (
        moment(timeLabel).date() >= 15 &&
        moment(timeLabel).date() <= 21
      ) {
        let weekTime = `15/${moment(timeLabel).month() + 1}/${moment(
          timeLabel
        ).year()}`
        if (rate[weekTime]) {
          rate[weekTime].push(heartData.heartRates[i])
        } else {
          rate[weekTime] = [heartData.heartRates[i]]
        }
      } else if (
        moment(timeLabel).date() >= 22 &&
        moment(timeLabel).date() <= 28
      ) {
        let weekTime = `22/${moment(timeLabel).month() + 1}/${moment(
          timeLabel
        ).year()}`
        if (rate[weekTime]) {
          rate[weekTime].push(heartData.heartRates[i])
        } else {
          rate[weekTime] = [heartData.heartRates[i]]
        }
      } else {
        let weekTime = `29/${moment(timeLabel).month() + 1}/${moment(
          timeLabel
        ).year()}`
        if (rate[weekTime]) {
          rate[weekTime].push(heartData.heartRates[i])
        } else {
          rate[weekTime] = [heartData.heartRates[i]]
        }
      }
    }
    for (let y in rate) {
      data.labels.push(y)
      data.heartRates.push(this.averageOfArray(rate[y]))
    }

    this.setState({
      displayHeartData: data
    })
  }

  pressMonthBtn = () => {
    const { heartData } = this.state
    // const endTime = new Date().getTime();
    const data = {
      labels: [],
      heartRates: []
    }
    let rate = {}
    for (let i = 0; i < heartData.labels.length; i++) {
      let timeLabel = moment(parseInt(heartData.labels[i], 10)).format(
        "MM/YYYY"
      )
      if (rate[timeLabel]) {
        rate[timeLabel].push(heartData.heartRates[i])
      } else {
        rate[timeLabel] = [heartData.heartRates[i]]
      }
    }
    for (let y in rate) {
      data.labels.push(y)
      data.heartRates.push(this.averageOfArray(rate[y]))
    }

    this.setState({
      displayHeartData: data
    })
  }
  callDoctor = () => {
    const args = {
      number: this.state.drPhoneNo, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }

  onChangeTab = ({ i }) => {
    this.setState({ currentPage: i }, () => {
      if (i === 0) {
        this.pressDayBtn()
      } else if (i === 1) {
        this.pressWeekBtn()
      } else {
        this.pressMonthBtn()
      }
    })
  }

  render() {
    const { displayHeartData } = this.state

    if (this.state.isLoading) {
      return (
        <View style={styles.textStyle}>
          <Spinner color="blue" />
        </View>
      )
    }
    return (
      <Container>
        <Tabs
          initialPage={this.state.currentPage}
          onChangeTab={this.onChangeTab}
        >
          <Tab
            heading={
              <TabHeading>
                <Text>Ngày</Text>
              </TabHeading>
            }
            onPress={() => alert("press")}
          >
            <Chart data={displayHeartData} type="ngày" />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Tuần</Text>
              </TabHeading>
            }
          >
            <Chart data={displayHeartData} type="tuần" />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Tháng</Text>
              </TabHeading>
            }
          >
            <Chart data={displayHeartData} type="tháng" />
          </Tab>
        </Tabs>

        <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
          <Button iconLeft block warning onPress={this.callDoctor}>
            <Icon name="call" />
            <Text>Gọi bác sĩ</Text>
          </Button>
        </TouchableHighlight>
      </Container>
    )
  }
}
export default HeartRate
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: {
    borderRadius: 5,
    padding: 10
  },
  btnActive: {
    backgroundColor: "#f0ad4e"
  },
  text: {
    marginTop: 20
  },
  textStyle: {
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "gray"
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  }
})
