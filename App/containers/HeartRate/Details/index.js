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
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text>Dữ liệu nhận được:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 5
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#085cdb"
                }}
              >
                {selectedDate}
              </Text>
              <Text style={styles.selected}>{`${selectedValue}/bpm`}</Text>
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
    fontSize: 15
  }
})
