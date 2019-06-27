import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList,TouchableHighlight } from "react-native";

export default class App extends Component {
  render() {
    const { data } = this.props;
    console.log("data", data);
    let result = [];
    if (data) {
      let labelLength = data.labels.length;
      for (let i = labelLength - 1; i > labelLength - 3; i--) {
        result.push({
          time: data.labels[i],
          value: data.dataSet[i]
        });
      }
    }
    if (result) {
      return (
        <View >
          <FlatList
            data={result}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, separators }) => (
              <View style={styles.flatview}>
                <Text style={styles.name}>{item.time}</Text>
                <Text style={styles.email}>{item.value}</Text>
              </View>
            )}
            keyExtractor={item => item.email}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
    flatview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        flexDirection: "row",
    },
  name: {
    fontFamily: "Verdana",
    fontSize: 12,
    marginRight: 10,

  },
  email: {
    color: "red",
    marginRight: 10,
  }
});
