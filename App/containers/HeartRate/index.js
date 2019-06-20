import React from "React"
import { View, StyleSheet, TouchableHighlight } from "react-native"
import firebase from "react-native-firebase"
import { Icon, Button, Text, Spinner, Tab, Tabs, TabHeading, Container, Header, } from "native-base"
import {filterByTime} from '../../utils/timeConvert.util';

import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../settings"
import call from "react-native-phone-call"
import { compare } from '../../utils/sort';
import { averageDateByWeek, averageDateByMonth } from '../../utils/timeConvert.util';
import Chart from './Chart'


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
      currentPage: 0,
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

    let rawData = [];
    console.log("jasbdsbadsabdjsandjsandjsandjsandjsa: ",firebase.apps)
    console.log("elder jkasndjsajidIDIDIDIDIDIDIDIID: ", jsonData.elderId);
     firebase
      .database()
      .ref("Patients")
      .child(jsonData.elderId).child("HeartRate")
      .once("value",  snapshot => {
          console.log("snapshot value: ", Object.values(snapshot.val()))
          console.log('103 positon', Object.values(snapshot.val())[103]);
            rawData = [...Object.values(snapshot.val())];
            console.log("rawdata value: ", rawData)
            rawData.sort(compare);
            console.log('length asdfasdf', rawData.length);

            console.log('length', rawData[rawData.length -1]);

            this.setState({
              isLoading: false,
              heartData: rawData,
            }, () => this.pressDayBtn())
      })
  }

  
  pressDayBtn = () => {
    const { heartData } = this.state
    console.log('heartData', heartData);
    //currentTime
    const endTime = new Date(heartData[heartData.length -1].time).getTime();
    const startTime = new Date(endTime - 86400*7*1000).setHours(0, 0, 0, 0);
    let data = filterByTime(heartData, startTime, endTime);

    this.setState({
      displayHeartData: data,
    });


  }

  pressWeekBtn = () => {
   
    const { heartData } = this.state
    // const endTime = new Date().getTime();
    const endTime = new Date(heartData[heartData.length -1].time).getTime();
    const startTime = new Date(endTime - 86400*7*1000*7).setHours(0, 0, 0, 0);
    
    let data = filterByTime(heartData, startTime, endTime);
    let weekData = averageDateByWeek(data);

    this.setState({
      displayHeartData: weekData
    })
  }


  pressMonthBtn = () => {
    const { heartData } = this.state
    // const endTime = new Date().getTime();
    const endTime = new Date(heartData[heartData.length -1].time).getTime();
    const startTime = new Date(endTime - 86400*7*1000*7).setHours(0, 0, 0, 0);
    console.log('start Time', startTime);
    console.log('endTime', endTime);
    

    let data = filterByTime(heartData, startTime, endTime);
    let monthData = averageDateByMonth(data);

    this.setState({
      displayHeartData: monthData
    })
  }
  callDoctor = () => {
    const args = {
      number: this.state.drPhoneNo, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    call(args).catch(console.error)
  }

  onChangeTab = ({i}) => {
    this.setState({ currentPage: i}, () => {
      if(i === 0 ) {
        this.pressDayBtn();
      } else if(i === 1) {
        this.pressWeekBtn();
      } else  {
        this.pressMonthBtn();
      }
    });
  }

  render() {
    const { displayHeartData } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.textStyle}>
          <Spinner color="blue" />
        </View>
      )
    }
    return (
      <Container>
        <Tabs initialPage={this.state.currentPage} onChangeTab={this.onChangeTab}>
          <Tab heading={ <TabHeading><Text>Ngày</Text></TabHeading>} onPress={() => alert('press')}>
            {/* <React.Suspense fallback={<Text>Loading</Text>}> */}
            <Chart data={displayHeartData} type="day"/>
            {/* </React.Suspense> */}
          </Tab>
          <Tab heading={ <TabHeading><Text>Tuần</Text></TabHeading>}>
            <Chart data={displayHeartData} type="week"/>
          </Tab>
          <Tab heading={ <TabHeading><Text>Tháng</Text></TabHeading>}>
            <Chart data={displayHeartData} type="month"/>
          </Tab>
        </Tabs>

            <TouchableHighlight style={styles.btn} underlayColor="#fefefe">
          <Button iconLeft block warning onPress={this.callDoctor}>
            <Icon name="call" />
            <Text>Gọi bác sĩ</Text>
          </Button>
        </TouchableHighlight>
    </Container>
    );
      
  }
}
export default HeartRate; 
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