import React from "React";
import { View } from "react-native";
import { VictoryLine, VictoryChart } from "victory-native";

class HeartRate extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 }
          ]}
        />
      </VictoryChart>
    );
  }
}
