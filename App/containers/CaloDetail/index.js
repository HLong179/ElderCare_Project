import React from "React"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import firebase from "react-native-firebase"
import { Text, Spinner, Tab, Tabs, TabHeading, Container } from "native-base"
import { filterByTime } from "../../utils/timeConvert.util"

import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import { compare } from "../../utils/sort"
import { formatData } from "../../utils/formatData"
import {
  averageDateByWeek,
  averageDateByMonth
} from "../../utils/timeConvert.util"
import Chart from "./Chart"
import { pressDay, pressWeek, pressMonth } from "../../utils/chartData"

class CalorDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drPhoneNo: "",
      calorData: [],
      displayCalorData: null,
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

    firebase
      .database()
      .ref("Patients")
      .child(jsonData.elderId)
      .child("Calories")
      .once("value", snapshot => {
        let calorData = formatData(snapshot.val())
        calorData.sort(compare)
        let data = {
          labels: [],
          dataSet: []
        }
        let dataDisplay = {
          labels: [],
          dataSet: []
        }
        for (let calor in calorData) {
          if (!data.labels.includes(calorData[calor]["time"])) {
            data.labels.push(calorData[calor]["time"])
            data.dataSet.push(calorData[calor]["value"])
            dataDisplay.labels.push(calorData[calor]["time"])
            dataDisplay.dataSet.push(calorData[calor]["value"])
          }
        }
        this.setState(
          {
            isLoading: false,
            calorData: data,
            displayCalorData: dataDisplay
          },
          () => this.pressDayBtn()
        )
      })
  }

  // Display data of 7d nearest
  pressDayBtn = () => {
    const { calorData } = this.state
    let data = pressDay(calorData.labels, calorData.dataSet)
    this.setState({
      displayCalorData: data
    })
  }

  // Display data of 7 weeks nearest
  pressWeekBtn = () => {
    const { calorData } = this.state
    let data = pressWeek(calorData.labels, calorData.dataSet)
    this.setState({
      displayCalorData: data
    })
  }

  // Display data of 2 months  nearest
  pressMonthBtn = () => {
    const { calorData } = this.state
    let data = pressMonth(calorData.labels, calorData.dataSet)
    this.setState({
      displayCalorData: data
    })
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
    const { displayCalorData } = this.state
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
          >
            <Chart data={displayCalorData} type="ngày" />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Tuần</Text>
              </TabHeading>
            }
          >
            <Chart data={displayCalorData} type="tuần" />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Tháng</Text>
              </TabHeading>
            }
          >
            <Chart data={displayCalorData} type="tháng" />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default CalorDetail

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  textStyle: {
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "gray"
  }
})
