import React, { Component } from "react"
import { ListView, Alert, StyleSheet } from "react-native"
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  View,
  Spinner
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import firebase from "firebase"
import UpdateMedicine from "./UpdateMedicine"

class ListMedicines extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      medicineDatas: [],
      loading: false,
      modalVisible: false,
      dataUpdate: null
    }
  }
  componentWillMount() {
    this.setState({
      loading: true
    })
  }

  componentDidMount = async () => {
    const storage = await AsyncStorage.getItem("curUser")
    const objStorage = JSON.parse(storage)
    const elderId = objStorage.elderId
    const patientsRef = firebase.database().ref("Patients")
    patientsRef.on("value", snapshot => {
      let patients = snapshot.val()[elderId]["Medicines"]
      this.setState(
        {
          medicineDatas: []
        },
        () => {
          let { medicineDatas } = this.state
          for (let patient in patients) {
            let data = patients[patient]
            data.idMedicineFB = patient
            medicineDatas.push(data)
          }
          this.setState({
            medicineDatas,
            loading: false
          })
        }
      )
    })
  }

  deleteRow = (data, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow()
    firebase
      .database()
      .ref(`Patients/${data.elderId}/Medicines/${data.idMedicineFB}`)
      .remove()
  }

  handleVisible = visible => {
    this.setState({
      modalVisible: visible
    })
  }
  render() {
    return (
      <View>
        {this.state.loading ? (
          <View style={styles.textStyle}>
            <Spinner color="blue" />
          </View>
        ) : !this.state.medicineDatas[0] ? (
          <View style={styles.textStyle}>
            <Text>Bạn chưa thêm đơn thuốc</Text>
          </View>
        ) : (
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
                    {data.morning ? " Sáng " : null}
                    {data.afternoon ? " Trưa " : null}
                    {data.evening ? " Tối " : null}
                  </Text>
                </Body>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button
                style={styles.btnLayout}
                full
                info
                onPress={() =>
                  this.setState({
                    modalVisible: true,
                    dataUpdate: data
                  })
                }
              >
                <Icon active name="create" />
                <Text style={{ marginTop: 5 }}>Sửa</Text>
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                style={styles.btnLayout}
                full
                danger
                onPress={() =>
                  Alert.alert(
                    "Thông báo",
                    "Bạn chắc chắn xóa thuốc này",
                    [
                      {
                        text: "Hủy",
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: () =>
                          this.deleteRow(data, secId, rowId, rowMap)
                      }
                    ],
                    { cancelable: false }
                  )
                }
              >
                <Icon active name="trash" />
                <Text style={{ marginTop: 5 }}>Xóa</Text>
              </Button>
            )}
          />
        )}
        {this.state.modalVisible && (
          <UpdateMedicine
            medicineData={this.state.dataUpdate}
            modalVisible={true}
            handleVisible={this.handleVisible}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    minHeight: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "gray"
  },
  btnLayout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ListMedicines
