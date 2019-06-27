import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import moment from "moment";
import List from "../List";

class HeartDetail extends React.Component {
  render() {
    const { selectedDate, selectedValue, type, data } = this.props;
    console.log("this.props,", this.props);
    return (
      <Wrapper>
        {type === "ngày" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "stretch",
                height: 30
              }}
            >
              <Text style={styles.selected}>{`${moment(
                selectedDate,
                "DD-MM-YYYY"
              ).format("DD - MM")}`}</Text>
              <Text style={styles.selected}>{`${selectedValue}/bpm`}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <List data={data} />
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "stretch",
                height: 30
              }}
            >
              <Text style={styles.selected}>{`${moment(
                selectedDate,
                "DD-MM-YYYY"
              )
                .subtract(7, "days")
                .format("DD-MM")} - ${moment(selectedDate, "DD-MM-YYYY").format(
                "DD-MM"
              )}`}</Text>
              {/* <Text style={styles.selected}>
                {moment(new Date()).format("DD/MM/YYYY")}
              </Text> */}
              <Text style={styles.selected}>{`${selectedValue} / bpm`}</Text>

            </View>
            <View style={{ flexDirection: "row" }}>
                <List data={data} />
              </View>
          </View>
        )}
      </Wrapper>
    );
  }
}

export default HeartDetail;

const Wrapper = styled(View)`
  align-items: center;
  .selected {
    color: red;
    margin-left: 6;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  selected: {
    color: "red",
    marginLeft: 6,
    fontSize: 14
  }
});
