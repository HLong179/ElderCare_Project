import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native"
import moment from "moment"

export default class App extends Component {
  render() {
    const { data } = this.props
    let result = []

    if (data.labels) {
      let labelLength = data.labels.length
      for (let i = labelLength - 1; i > labelLength - 6; i--) {
        result.push({
          time: moment(data.labels[i]).format("DD/MM  HH:mm"),
          value: data.dataSet[i],
          key: i
        })
      }
    }
    if (result) {
      return (
        <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
          <Text>Dữ liệu nhịp tim gần đây:</Text>
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <View style={styles.flatview}>
                <Text style={styles.name}>{item.time}</Text>
                <Text style={styles.email}>{item.value}/bpm</Text>
              </View>
            )}
            keyExtractor={item => item.key.toString()}
          />
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  flatview: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5
  },
  name: {
    fontFamily: "Verdana",
    fontSize: 15,
    color: "#085cdb"
  },
  email: {
    color: "red",
    fontSize: 15,
  }
})
