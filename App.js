/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import RNSamsungHealth from 'rn-samsung-health';
import moment from "moment";


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dataHeartRate : [],
      dataStepCount: []
    };
  }
  componentDidMount() {
    RNSamsungHealth.authorize((err, res) => {
      if (res) {
       let startDate = new Date().setDate(new Date().getDate()-14); // 30 days back date
       let endDate = new Date().getTime(); //today's date
        let opt = {startDate, endDate};
        RNSamsungHealth.getHeartRate(opt, (err, res) => {
          if (err) console.log(err);
          if (res){
              // console.log('data from SS Health: ', res[0].data);
            this.setState(
              {dataHeartRate : res[0].data}
          )
            // value =res[0].data[0].heart_rate;
          } 
        });
        
        RNSamsungHealth.getDailyStepCount(opt, (err, res) => {
          if (err) console.log(err);
          if (res){
            // console.log('data from SS Health: ', res[0].data);

            this.setState(
              {dataStepCount : res[0].data}
          )
            // value =res[0].data[0].heart_rate;
          } 
        });

        // RNSamsungHealth.getSleep(opt, (err, res) => {
        //   if (err) console.log(err);
        //   if (res){
        //     console.log('data from SS Health: ', res[0].data);

        //     this.setState(
        //       {dataSleep : res[0].data}
        //   )
        //     // value =res[0].data[0].heart_rate;
        //   } 
        // });

// more similar functions are - 
    //getDailyStepCount
    //getHeight
    //getWeight
    //getSleep
    //getCholesterol
    //getBloodPressure
    //getBodyTemprature

      } else console.log(err);
    });
  }

  render() {
    let lapsList;
    if (this.state.dataStepCount.length > 0) {
    
      let dayHasHeart = this.state.dataHeartRate.map(e => (
       {
        value: {
          rate: e.heart_rate,
          time: new Date(e.start_time).getHours()
        },
        date: moment(new Date(e.start_time)).format('YYYY-MM-DD') 
       }
      ))
      // console.log('this is dayHasHeart: ', dayHasHeart)
      let arrayValue =  this.state.dataStepCount.map((data) => {
        // console.log(data.date, dayHasHeart[0].date)
        let array = dayHasHeart.filter(e => (e.date === data.date))
        let arrayHeartRate = [];
        if (array.length > 0) {
          array.forEach(element => {
            arrayHeartRate.push(element.value)
          });
        }
        data.heartRate = arrayHeartRate;
        return data;
      })
      let array = dayHasHeart.filter(e => (e.date === moment(new Date()).format('YYYY-MM-DD')))
      if (array.length > 0){
        let body = {
          date: 'Today ' + moment(new Date()).format('YYYY-MM-DD'),
          steps: 0,
          calorie: 0,
          heartRate: []
        }

        array.forEach(element => {
          body.heartRate.push(element.value)
        });
        arrayValue.push(body)
      }
     
        // console.log('data for show:', arrayValue)


     lapsList = arrayValue.map(value => {
       let Heart = value.heartRate.map(e => {
         return (
           <View>
            <Text >Heart Rate:
              <Text  style={{fontWeight: 'bold', color: 'red'}}>{e.rate}</Text>
              , At:  <Text  style={{fontWeight: 'bold', color: 'red'}}>{e.time}h</Text>
            </Text>
           </View>
         
         )
       })
      return (
        <View>
          <Text  style={{fontWeight: 'bold', paddingTop: 5}}>Time: {value.date}</Text>
           
          <Text >StepCounts: <Text style={{fontWeight: 'bold', color: 'green'}}>{value.steps}</Text>, Calories: <Text style={{fontWeight: 'bold', color: 'green'}}>{value.calorie}</Text></Text>
          {Heart}
        </View>
      )
    })
  }


    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>Welcome to React Native!</Text> */}
        {lapsList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
