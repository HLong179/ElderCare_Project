import React, { Component } from "react"
import { ListView } from "react-native"
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "firebase"

class ListMedicines extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      medicineDatas: []
    }
  }

  componentDidMount = async () => {
    const storage = await AsyncStorage.getItem("curUser")
    const objStorage = JSON.parse(storage)
    const elderId = objStorage.elderId
    const patientsRef = firebase.database().ref("Patients")
    await patientsRef.on("value", snapshot => {
      let patients = snapshot.val()[elderId]["Medicines"]
      for (let patient in patients) {
        let data = patients[patient]
        data.idMedicineFB = patient
        this.setState({
            medicineDatas: [...this.state.medicineDatas, data]
        })
      }
    })
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData })
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return (
        <List
          style={{ marginTop: 30 }}
          leftOpenValue={75}
          rightOpenValue={-75}
          dataSource={this.ds.cloneWithRows(this.state.medicineDatas)}
          renderRow={data => (
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: data.imageUrl }} />
              </Left>
              <Body>
                <Text>{data.name}</Text>
                <Text note numberOfLines={2}>
                  {data.script}
                </Text>
                <Text note numberOfLines={1}>
                  {data.morning ? "Sáng" : null}{" "}
                  {data.afternoon ? " Trưa " : null} {data.evening ? "Tối" : null}
                </Text>
              </Body>
            </ListItem>
          )}
          renderLeftHiddenRow={data => (
            <Button full onPress={() => alert("hello")}>
              <Icon active name="information-circle" />
            </Button>
          )}
          renderRightHiddenRow={(data, secId, rowId, rowMap) => (
            <Button
              full
              danger
              onPress={_ => this.deleteRow(secId, rowId, rowMap)}
            >
              <Icon active name="trash" />
            </Button>
          )}
        />
    )
  }
}

export default ListMedicines
