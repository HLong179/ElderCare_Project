import React from "react"
import { Text, StyleSheet, View } from "react-native"
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis,
} from "victory-native"
import Svg from "react-native-svg"

import moment from 'moment';
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

const Chart = (props) => {
  const rawData = props.data
  let self = props;
  let data = [];

  if (rawData) {
    if (rawData.labels.length > 1) {
      for (let i = 0; i < rawData.labels.length; i++) {
        data.push({
          x: rawData.labels[i],
          y: parseFloat(rawData.dataSet[i])
        })
      }
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
            padding={{ top: 30, right: 30, bottom: 50, left: 45 }}
          >
            <VictoryAxis
              dependentAxis
              // label="Nhịp tim (BPM)"
              style={{
                axisLabel: { padding: -20 }
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
                tickLabels: { padding: 5, angle: 0 }
              }}
              // tickCount={7}
              fixLabelOverlap
              standalone={false}
            />
            <VictoryScatter
              data={data}
              size={5}
              style={{ data: { fill: "#c43a31" } }}
              events={[{
                target: "data",
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          let time, value;
                          time = props.datum.x;
                          value = props.datum.y;
                          self.handlePointClick({time, value})
                        }
                      }
                    ];
                  }
                }
              }]}
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
            <Text style={styles.bpm}>{rawData.dataSet[0]} Bpms</Text>
          </View>
        )
      }
    }
  } else return <Text>Không có dữ liệu</Text>
}

export default Chart
