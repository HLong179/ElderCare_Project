import React from 'react';
import { Text, View } from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryAxis,
  VictoryZoomContainer,

} from 'victory-native';
import Svg from 'react-native-svg';
import { processChartData } from '../../../utils/formatData';


const Chart = (props) => { 
  const rawData = props.data;
  const type = props.type;

  if(rawData) {
    let { data, labelArray } = processChartData(rawData, type);

    return (
      <Svg
        width={400}
        height={400}
        viewBox="0 0 400 400"
        style={{ width: "100%", height: "auto" }}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          // scale={{ x: "time", y: "linear" }}
          padding={{ top: 30, right: 30, bottom: 50, left: 45 }}
          style={{ axis: { grid: "none" } }}
          // containerComponent={
          //   <VictoryZoomContainer
          //     zoomDimension="x"
          //     minimumZoom={{ y: 40 }}
          //   />
          // }
        >
          <VictoryBar
            // animate={{ duration: 1000, easing: "bounce" }}
            style={{ data: { fill: "#085cdb" }, padding: { right: 50 } }}
            data={data}
          />
          <VictoryAxis
            dependentAxis
            label="Bước đi (bước)"
            style={{
              axisLabel: { padding: -20 },
              grid: { fill: "none", stroke: "none" }
            }}
            tickValues={[100, 200, 300, 500, 600, 800, 1000]}
          />

          <VictoryAxis
            label="Thời gian"
            style={{
              axisLabel: { padding: 55 },
              tickLabels: { padding: 5, angle: 0 },
              grid: { fill: "none", stroke: "none" }
            }}
            tickCount={7}
            fixLabelOverlap
            tickValues={labelArray}
          />
        </VictoryChart>
      </Svg>
    );
      }
      else {
        return (
          <Text>No data</Text>
        )
      }
  }

export default Chart;