import React from "react"
import { Text, StyleSheet, View } from "react-native"
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis
} from "victory-native"
import Svg from "react-native-svg"

import moment from "moment"
// let trLocale = require('moment/locale/vi');
// moment.locale('tr',trLocale);
// moment.suppressDeprecationWarnings = true;

const styles = StyleSheet.create({
  textChart: {
    fontSize: 18,
    color: "#000",
    marginTop: 50,
    textAlign: "center"
  },
  bpm: {
    marginTop: 30,
    fontSize: 26,
    color: "tomato",
    textAlign: "center"
  }
})

const Chart = props => {
  const rawData = props.data,
        type = props.type;
  let self = props
  let data = []

  if (rawData) {
    if (rawData.labels.length > 1) {
      for (let i = 0; i < rawData.labels.length; i++) {
        data.push({
          x: rawData.labels[i],
          y: parseFloat(rawData.dataSet[i])
        })
      }
      console.log("data week: ", data)
      if (data.length > 7) {
        data = data.slice(data.length - 7, data.length)
      }
      return (
        <Svg
          width={400}
          height={370}
          viewBox="0 0 400 400"
          style={{ width: "100%", height: "auto" }}
        >
          <VictoryChart
            theme={VictoryTheme.material}
            scale={{ x: "time", y: "linear" }}
            padding={{ top: 30, right: 20, bottom: 50, left: 32 }}
          >
            <VictoryAxis
              dependentAxis
              // label="Nhịp tim (BPM)"
              style={{
                grid: { fill: "none", stroke: "none" }
              }}

              tickValues={[40, 60, 80, 100, 120, 140]}
            />

            <VictoryLine
              style={{
                data: { stroke: "#085cdb", strokeWidth: 5 }
              }}
              interpolation={"monotoneX"}
              data={data}
              // animate={{
              //   duration: 2000,
              //   onLoad: { duration: 1000 }
              // }}
              // events={[
              //   {
              //     target: "data",
              //     eventHandlers: {
              //       onPressIn: () => {
              //         console.log("clicked  onPressIn")
              //         return [
              //           {
              //             target: "labels",
              //             mutation: props => {
              //               // console.log('props', props)
              //             }
              //           },
              //           {
              //             target: "data",
              //             mutation: props => {
              //               // console.log('props', props)
              //             }
              //           }
              //         ]
              //       },
              //       onClick: () => {
              //         console.log("clicked VictoryLine  onClick")
              //       },
              //       onPressOut: () => {
              //         console.log("clicked  onPressOut")
              //       }
              //     }
              //   }
              // ]}
            />

            <VictoryAxis
              label="Thời gian"
              style={{
                axisLabel: { padding: 30 },
                tickLabels: { padding: 5, angle: 0 },
                // grid: { fill: "none", stroke: "none" }
              }}

              // tickCount={7}
              fixLabelOverlap
              standalone={false}
            />
            <VictoryScatter
              data={data}
              size={10}
              style={{ data: { fill: "#c43a31" } }}
              labels={() => null}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: "data",
                          mutation: props => {
                            let time, value
                            time = props.datum.x;
                            if (type === "tuần") {
                              console.log("time selected: ", moment(time, "DD/MM/YYYY").toDate().getDate())
                              let start =  moment(time, "DD/MM/YYYY").toDate();
                              var lastday = new Date(new Date().setDate(start.getDate()+6));
                              console.log("last date: ", lastday);
                              if (lastday.getMonth() === start.getMonth()) {
                                time = `${start.getDate()}/${start.getMonth() + 1} - ${lastday.getDate()}/${lastday.getMonth() + 1}`;
                              } else {
                                time = `${start.getDate()}/${start.getMonth() + 1} - ${lastday.getDate()}/${lastday.getMonth()}`
                              }
                  
                              
                            }

                            value = props.datum.y
                            self.handlePointClick({ time, value })
                          }
                        }
                      ]
                    }
                  }
                }
              ]}
            />
          </VictoryChart>
        </Svg>
      )
    } else {
      if (rawData.labels.length === 1) {
        return (
          <View>
            <Text style={styles.textChart}>
              Nhịp tim trung bình trong {props.type} {rawData.labels[0]}:{" "}
            </Text>
            <Text style={styles.bpm}>{rawData.dataSet[0]} Bpm</Text>
          </View>
        )
      }
    }
  } else return <Text>Không có dữ liệu</Text>
}

export default Chart
