import React from "react"
import { View, Text, StyleSheet } from "react-native"
import styled from "styled-components"
import moment from "moment"
import { Left, Right, Item } from "native-base"
import List from "../List"

class HeartDetail extends React.Component {
  render() {
    const { selectedDate, selectedValue, rawData } = this.props
    return (
      <View>
        {selectedDate ? (
          <View
            style={{
              width: "80%",
              alignSelf: "center"
            }}
          >
            {/* <Text>Dữ liệu nhận được:</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: 7
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                {selectedDate}
              </Text>
              <Text style={styles.selected}>
                {`${selectedValue} `}{" "}
                <Text style={{ fontWeight: "normal" }}>bpm</Text>
              </Text>
            </View>
          </View>
        ) : null}
        <View>
          <List data={rawData} />
        </View>
      </View>
    )
  }
}

export default HeartDetail

const styles = StyleSheet.create({
  selected: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold"
  }
})
