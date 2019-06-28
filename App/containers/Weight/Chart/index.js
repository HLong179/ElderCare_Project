import React from "react"
import { Text, View, StyleSheet } from "react-native"
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryAxis
} from "victory-native"
import Svg from "react-native-svg"
import { processChartData } from "../../../utils/formatData"

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
  const rawData = props.data
  let data = []
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
          height={450}
          viewBox="0 0 400 400"
          style={{ width: "100%", height: "auto" }}
        >
          <VictoryChart
            theme={VictoryTheme.material}
            padding={{ top: 30, right: 30, bottom: 50, left: 45 }}
            style={{ axis: { grid: "none" } }}
            domainPadding={20}
          >
            <VictoryBar
              style={{ data: { fill: "#085cdb" }, padding: { right: 50 } }}
              data={data}
              alignment="middle"
              labels={d => `${d.y}`}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[200, 400, 600, 800, 1000, 1200]}
              style={{
                grid: { fill: "none", stroke: "none" }
              }}
            />

            <VictoryAxis
              label="Thời gian"
              style={{
                axisLabel: { padding: 30 },
                tickLabels: { padding: 5, angle: 0 },
                grid: { fill: "none", stroke: "none" }
              }}
              tickCount={7}
              fixLabelOverlap
            />
          </VictoryChart>
          <Text style= {{
            paddingTop: 50,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center"
          }}>Số bước đi trung bình.</Text>
        </Svg>
      )
    } else {
      if (rawData.labels.length === 1) {
        return (
          <View>
            <Text style={styles.textChart}>
              Số bước đi trung bình trong {props.type} {rawData.labels[0]}:{" "}
            </Text>
            <Text style={styles.bpm}>{rawData.dataSet[0]} bước</Text>
          </View>
        )
      }
    }
  } else {
    return <Text>Không có dữ liệu</Text>
  }
}

export default Chart
