import React from "React"
import {
  View,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  ScrollView
} from "react-native"
import firebase from "react-native-firebase"
import { elderCare } from "../../Constant"
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
import Detail from "./Details"

class HeartRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drPhoneNo: "",
      heartData: [],
      displayHeartData: null,
      isLoading: false,
      selectedDate: null,
      selectedValue: null,
      showDetail: true,
      type: ""
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
    this.setState({
      heartData: []
    })
    navigate("Home")
  }

  componentDidMount = async () => {
    let dataCur = await AsyncStorage.getItem("curUser")
    let jsonData = JSON.parse(dataCur)
    this.setState({
      isLoading: true
    })
    this.fetchAndDraw(jsonData.elderId)
    this.getDoctorNumPhone(jsonData.elderId)
  }

  getDoctorNumPhone = elderId => {
    fetch(`${SETTINGS.LOCAL_IP}/account/getDoctorPhoneNum`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: elderId
      })
    }).then(dataDoctorNum => {
      console.log(
        "numPhone Doctor: ",
        dataDoctorNum.clone().json().doctorPhoneNum
      )
      this.setState({ drPhoneNo: dataDoctorNum.clone().json().doctorPhoneNum })
    })
  }
  fetchAndDraw = elderId => {
    try {
      fetch(`${SETTINGS.LOCAL_IP}/firebase/getHeartRates`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          elderId: elderId
        })
      })
        .then(Observer => {
          Observer.clone()
            .json()
            .then(res => {
              let rawData = res.data.sort(compare)
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
        })
        .catch(e => console.log("loi: ", e))
    } catch (error) {
      console.log("something wrong: ", error)
    }
  }
  pressDayBtn = () => {
    const { heartData } = this.state
    let data = pressDay(heartData.labels, heartData.dataSet)
    let labelLength = data.dataSet.length
    let dataLength = data.labels.length
    this.setState({
      displayHeartData: data,
      type: "ngày"
    })
  }

  pressWeekBtn = () => {
    const { heartData } = this.state
    let data = pressWeek(heartData.labels, heartData.dataSet)
    this.setState({
      displayHeartData: data,
      type: ""
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
    if (args.number) call(args).catch(console.error)
    else {
      alert("No Doctor's PhoneNumber provided!")
    }
  }

  onChangeTab = ({ i }) => {
    this.setState({ currentPage: i }, () => {
      if (i === 0) {
        this.setState({ selectedDate: null, selectedValue: null })
        this.pressDayBtn()
      } else if (i === 1) {
        this.setState({ selectedDate: null, selectedValue: null })
        this.pressWeekBtn()
      } else {
        this.setState({ selectedDate: null, selectedValue: null })
        this.pressMonthBtn()
      }
    })
  }
  handlePointClick = data => {
    // let day = moment(data.time).toDate();
    // var lastday = new Date(day.setDate(day.getDate()+6)).toUTCString();
    // console.log("time next: ", lastday)
    this.setState({
      selectedDate: data.time,
      selectedValue: data.value
    })
  }

  render() {
    const {
      displayHeartData,
      selectedDate,
      selectedValue,
      showDetail
    } = this.state
    if (this.state.isLoading) {
      return (
        <View style={styles.textStyle}>
          <Spinner color="blue" />
        </View>
      )
    }
    return (
      <Container>
        <View style={{ minHeight: 370 }}>
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
            >
              <Chart
                data={displayHeartData}
                type="ngày"
                handlePointClick={this.handlePointClick}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Tuần</Text>
                </TabHeading>
              }
            >
              <Chart
                data={displayHeartData}
                type="tuần"
                handlePointClick={this.handlePointClick}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Tháng</Text>
                </TabHeading>
              }
            >
              <Chart
                data={displayHeartData}
                type="tháng"
                handlePointClick={this.handlePointClick}
              />
            </Tab>
          </Tabs>
        </View>

        <ScrollView style={{ marginTop: 10 }}>
          <Detail
            selectedDate={selectedDate}
            selectedValue={selectedValue}
            type={this.state.type}
            rawData={this.state.heartData}
          />
        </ScrollView>

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
  btn: {
    borderRadius: 5,
    padding: 10
  },
  textStyle: {
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "gray"
  }
})
