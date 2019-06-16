import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis,
  VictoryZoomContainer,

} from 'victory-native';
import Svg from 'react-native-svg';
// import { generateDateInterval } from '../../../utils/timeConvert.util';
// import { formatDateOfData } from '../../../utils/formatData'
import { processChartData } from '../../../utils/formatData';


// const formatData = (data) => {
//   let result = [];
  
//   data.map(data => {
//     result.push({
//       x: moment(data.x).format('MM-DD'),
//       y: data.y,  
//     })
//   })
//   return result;
// }

const Chart = (props) => { 
  const rawData = props.data;
  const type = props.type;

  if(rawData) {
    let { data, labelArray } = processChartData(rawData, type);


    return (
      <Svg width={400} height={400} viewBox="0 0 400 400"
      style={{width: "100%", height: "auto"}}>
   
    <VictoryChart
        theme={VictoryTheme.material}
        scale={{ x: "time", y: "linear" }}
        padding={{ top: 30, right: 30, bottom: 50, left: 45 }}
        // animate={{
        //   duration: 2000,
        //   onLoad: { duration: 1000 }
        // }}
        containerComponent={
          <VictoryZoomContainer zoomDimension="x" minimumZoom={{ y: 40 }} />
        }
      >
        <VictoryAxis
          dependentAxis
          label="Nhịp tim (BPM)"
          style={{ axisLabel: { padding: -20 }, grid: { fill: "none", stroke: "none" } }}
          tickValues={[40, 95, 150]}
        />

        <VictoryLine
          style={{
            data: { stroke: "#085cdb", strokeWidth: 5 },
            grid: { fill: "none", stroke: "none" }
          }}
          interpolation={"monotoneX"}
          data={data}
          events={[{
            target: 'data',
            eventHandlers: {
              onPressIn: () => { 
                console.log('clicked  onPressIn');
                return [
                  {
                    target: "labels",
                    mutation: (props) => {
                      // console.log('props', props)
                    }
                  },
                  {
                    target: "data",
                    mutation: (props) => {
                      // console.log('props', props)
                    }
                  }
                ];
              },
              onClick: () => {console.log('clicked VictoryLine  onClick')},
              onPressOut: () => { console.log('clicked  onPressOut')},
            }
          }]}
        />

        <VictoryAxis
        label="Thời gian"
        style={{
          axisLabel: { padding: 55 },
          tickLabels: { padding: 5, angle: 0 },
          grid: { fill: "none", stroke: "none" },
        }}
        tickCount={8}
        fixLabelOverlap 
        // standalone={false}
        tickValues={labelArray}
      />
        <VictoryScatter
          data={data}
          size={5}
          style={{ data: { fill: "#c43a31" } }}
          labels={(datum) => datum.y}
          events={[{
            target: 'data',
            eventHandlers: {
              onPressOut: (props) => {
                console.log('clicked onPressOut scatter', props);
              },
              onPressIn: () => { 
                return [
                  {
                    target: "labels",
                    mutation: (props) => {
                    console.log(props);
                      return props.text = props.datum.x
                    }
                  }
                ]
              },
            }
          }]}
       
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