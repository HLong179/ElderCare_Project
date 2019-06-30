import React from "React"
import { View, StyleSheet, BackHandler } from "react-native"
import firebase from "react-native-firebase"
import { Text, Spinner, Tab, Tabs, TabHeading, Container } from "native-base"

import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import { compare } from "../../utils/sort"
import { formatData } from "../../utils/formatData"
import Chart from "./Chart"
import { pressDay, pressWeek, pressMonth } from "../../utils/chartData"
import { withNavigation } from "react-navigation"

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

    this.fetchAndDraw(jsonData.elderId);
    this.getDoctorNumPhone(jsonData.elderId);

  }

  fetchAndDraw = (elderId) => {
    fetch(`${SETTINGS.LOCAL_IP}/firebase/getCalories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: elderId
      })
    }).then(
      Observer => {
        Observer.clone().json().then(
          res => {
            let calorData = formatData(res.data)
            calorData.sort(compare)
            console.log("data calories length: ", res.data)
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
          },
          e => console.log("wrong: ", e)
        )
      },
      err => console.log("loi: ", err)
    )
  }
  getDoctorNumPhone = (elderId) => {
    fetch(`${SETTINGS.LOCAL_IP}/account/getDoctorPhoneNum`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: elderId
      })
    }).then(
      dataDoctorNum => {

        console.log("numPhone Doctor: ", dataDoctorNum.clone().json().doctorPhoneNum );
        this.setState({ drPhoneNo: dataDoctorNum.clone().json().doctorPhoneNum })
      }
    )

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

export default withNavigation(CalorDetail)

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
