import React from "react"
// import firebase from "react-native-firebase"
import firebase from "firebase"
import {
  Image,
  Modal,
  View,
  CheckBox,
  StyleSheet,
  ActivityIndicator
} from "react-native"
import {
  Button,
  Container,
  Content,
  Textarea,
  Label,
  Form,
  Input,
  Item,
  Text
  // ListItem,
  // CheckBox,
  // Body
} from "native-base"
import moment from "moment"
import ImagePicker from "react-native-image-picker"
import styled from "styled-components"
import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../../settings"
import config from "../../../Constant"

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
})

class AddMedicine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false,
      elderId: "",
      photo: null,
      text: "",
      imgName: "",
      morning: false,
      afternoon: false,
      evening: false,
      blobFile: null
    }
  }
  componentDidMount = async () => {
    const storage = await AsyncStorage.getItem("curUser")
    const objStorage = JSON.parse(storage)

    this.setState({
      elderId: objStorage.elderId,
      permission: objStorage.permission
    })
  }
  handleCancel = () => {
    this.setModalVisible(false)
    this.setState({
      modalVisible: false,
      loading: false,
      elderId: "",
      photo: null,
      text: "",
      imgName: "",
      morning: false,
      afternoon: false,
      evening: false,
      blobFile: null
    })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  handleChoosePhoto = () => {
    const options = {}
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        const { uri } = response
        this.uriToBlob(uri).then(v => {
          this.setState({
            photo: response,
            blobFile: v
          })
        })
      }
    })
  }
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response)
      }

      xhr.onerror = function() {
        // something went wrong
        reject(new Error("uriToBlob failed"))
      }

      // this helps us get a blob
      xhr.responseType = "blob"

      xhr.open("GET", uri, true)
      xhr.send(null)
    })
  }

  handleOK = () => {
    let source = this.state.blobFile
    firebase.initializeApp(config.opt)
    if (firebase) {
      let storageRef = firebase
        .storage()
        .ref()
        .child(`${this.state.elderId}/${this.state.imgName}.jpg`)
      storageRef
        .put(source, {
          contentType: "image/jpeg"
        })
        .then(snapshot => {
          storageRef.getDownloadURL().then(url => {
            fetch(`http://${SETTINGS.LOCAL_IP}:6900/medicine/addMedicine`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                elderId: this.state.elderId,
                imageUrl: url,
                name: this.state.imgName,
                script: this.state.text,
                morning: ~~this.state.morning,
                afternoon: ~~this.state.afternoon,
                evening: ~~this.state.evening
              })
            })
              .then(async response => {
                response = await response.json()
                this.setModalVisible(false)
                console.log(response)
                this.setState({
                  modalVisible: false,
                  loading: false,
                  elderId: "",
                  photo: null,
                  text: "",
                  imgName: "",
                  morning: false,
                  afternoon: false,
                  evening: false,
                  blobFile: null
                })
              })
              .catch(error => {
                console.log(error)
              })
          })
        })
    }
  }

  render() {
    const { photo } = this.state
    console.log(this.state.blobFile)
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Container>
            <Content style={{ padding: 10 }}>
              <Form>
                <View style={{ marginTop: 20 }}>
                  {photo && (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Image
                        source={{ uri: photo.uri }}
                        style={{
                          width: 300,
                          height: 300,
                          marginBottom: 20
                        }}
                      />
                    </View>
                  )}
                  <Button block info onPress={this.handleChoosePhoto}>
                    <Text>Chọn ảnh</Text>
                  </Button>
                </View>
                <View>
                  <Label style={{ marginTop: 30, marginBottom: 5 }}>
                    Tên thuốc
                  </Label>
                  <Item regular>
                    <Input
                      onChangeText={imgName => this.setState({ imgName })}
                    />
                  </Item>
                </View>
                <View>
                  <Label style={{ marginTop: 30 }}>Ghi chú</Label>
                  <Textarea
                    rowSpan={3}
                    bordered
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Label style={{ marginTop: 30, marginBottom: 10 }}>
                    Hẹn giờ uống thuốc
                  </Label>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.morning}
                      onValueChange={() =>
                        this.setState({ morning: !this.state.morning })
                      }
                    />
                    <Text style={{ marginTop: 5 }}> Buổi sáng</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.afternoon}
                      onValueChange={() =>
                        this.setState({ afternoon: !this.state.afternoon })
                      }
                    />
                    <Text style={{ marginTop: 5 }}> Buổi trưa</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.evening}
                      onValueChange={() =>
                        this.setState({ evening: !this.state.evening })
                      }
                    />
                    <Text style={{ marginTop: 5 }}> Buổi tối</Text>
                  </View>
                </View>
              </Form>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40,
                  marginBottom: 50
                }}
              >
                <Button
                  light
                  onPress={this.handleCancel}
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>HỦY</Text>
                </Button>
                <Button
                  info
                  onPress={this.handleOK}
                  style={{
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>OK</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </Modal>

        <Button
          block
          info
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text>NHẬP ĐƠN THUỐC</Text>
        </Button>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    )
  }
}

export default AddMedicine
