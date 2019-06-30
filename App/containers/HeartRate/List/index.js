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
          <Text style={styles.title}>Dữ liệu gần đây:</Text>
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <View style={styles.flatview}>
                <Text style={styles.name}>{item.time}</Text>
                <Text style={styles.email}>{item.value} <Text style = {{fontWeight: "normal"}}>bpm</Text></Text>
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
    justifyContent: "space-around",
    paddingTop: 7
  },
  name: {
    fontFamily: "Verdana",
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  email: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold"
  },
  title : {
    paddingTop: 15,
    width: "70%",
    alignSelf: "center",
    borderTopWidth: 1.5,
    borderTopColor: '#d6d7da',
    fontSize: 18,
    color: "#085cdb",
    fontWeight: "bold",
    textAlign: "center"
  }
})
