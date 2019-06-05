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
  Spinner,
  Toast
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
// import UpdateMedicine from "./UpdateMedicine"
import { connect } from "react-redux"
import { getNotes, removeNote } from "../action"
import SETTINGS from "../../../settings"

class ListNotes extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      loading: false,
      modalVisible: false,
      dataUpdate: null,
      notes: []
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
    fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/getNotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: elderId
      })
    }).then(async response => {
      response = await response.json()
      this.props.getNotes(response)
      this.setState({
        notes: this.props.notes,
        loading: false
      })
    })
  }

  deleteRow = (data, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow()
    fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/removeNote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteId: data.id
      })
    })
    this.props.removeNote(data.id)
    Toast.show({
      text: "Đã xóa ghi chú",
      buttonText: "x",
      duration: 3000,
      type: "success"
    })
  }

  handleVisible = visible => {
    this.setState({
      modalVisible: visible
    })
  }
  render() {
    console.log(this.props.notes.notes)
    return (
      <View>
        {this.state.loading ? (
          <View style={styles.textStyle}>
            <Spinner color="blue" />
          </View>
        ) : !this.state.notes.notes[0] ? (
          <View style={styles.textStyle}>
            <Text>Hiện tại chưa có ghi chú</Text>
          </View>
        ) : (
          <List
            style={{ marginTop: 30 }}
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.props.notes.notes)}
            renderRow={data => (
              <ListItem thumbnail>
                <Body>
                  <Text>{data.title}</Text>
                  <Text>{data.script}</Text>
                  <Text note>{data.time}</Text>
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
                    modalVisible: true
                    // dataUpdate: data
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

        {/* {this.state.modalVisible && (
          <UpdateNote
            medicineData={this.state.dataUpdate}
            modalVisible={true}
            handleVisible={this.handleVisible}
          />
        )} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    minHeight: 200,
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

const mapStateToProps = state => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotes: data => dispatch(getNotes(data)),
    removeNote: id => dispatch(removeNote(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNotes)
