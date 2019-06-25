import React from "React"
import { View, StyleSheet, TouchableHighlight, BackHandler } from "react-native"
import firebase from "react-native-firebase"
import {
  Icon,
  Button,
  Text,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Container
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import call from "react-native-phone-call"
import { compare } from "../../utils/sort"
import Chart from "./Chart"
import moment from "moment"
import { pressDay, pressWeek, pressMonth } from "../../utils/chartData"
import { withNavigation } from "react-navigation"

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

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    const { navigate } = this.props.navigation
    navigate("Home")
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

    firebase
      .database()
      .ref("Patients")
      .child(jsonData.elderId)
      .child("HeartRate")
      .once("value", snapshot => {
        let rawData = [...Object.values(snapshot.val())]
        rawData.sort(compare)
        console.log("length", rawData.length)
        let data = {
          labels: [],
          dataSet: []
        }
        let dataDisplay = {
          labels: [],
          dataSet: []
        }
        for (let patient in rawData) {
          let timeLabel = moment(rawData[patient]["time"]).format(
            "DD/MM/YYYY HH:mm:ss"
          )
          if (!data.labels.includes(rawData[patient]["time"])) {
            data.labels.push(rawData[patient]["time"])
            data.dataSet.push(rawData[patient]["value"])
            dataDisplay.labels.push(timeLabel)
            dataDisplay.dataSet.push(rawData[patient]["value"])
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
  }

  pressDayBtn = () => {
    const { heartData } = this.state
    let data = pressDay(heartData.labels, heartData.dataSet)
    this.setState({
      displayHeartData: data
    })
  }

  pressWeekBtn = () => {
    const { heartData } = this.state
    let data = pressWeek(heartData.labels, heartData.dataSet)
    this.setState({
      displayHeartData: data
    })
  }

  pressMonthBtn = () => {
    const { heartData } = this.state
    let data = pressMonth(heartData.labels, heartData.dataSet)
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
export default withNavigation(HeartRate)
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
