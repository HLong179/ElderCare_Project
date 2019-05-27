import React from "react"
import firebase from "firebase"
import { Image, Modal, View, CheckBox, Alert, StyleSheet } from "react-native"
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
} from "native-base"
import ImagePicker from "react-native-image-picker"
import Spinner from "react-native-loading-spinner-overlay"

class UpdateMedicine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.modalVisible,
      photo: null,
      imageUrl: this.props.medicineData.imageUrl,
      text: this.props.medicineData.script,
      imgName: this.props.medicineData.name,
      morning: !!this.props.medicineData.morning,
      afternoon: !!this.props.medicineData.afternoon,
      evening: !!this.props.medicineData.evening,
      blobFile: null,
      spinner: false
    }
  }

  handleCancel = () => {
    this.setModalVisible(false)
    this.setState({
      modalVisible: false,
      photo: null,
      text: "",
      imgName: "",
      morning: false,
      afternoon: false,
      evening: false,
      blobFile: null,
      spinner: false
    })
    this.props.handleVisible(false)
  }

  setModalVisible(visible) {
    this.props.handleVisible(visible)
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

  handleOK = async () => {
    const { photo, imgName, morning, afternoon, evening } = this.state
    if (!imgName) {
      Alert.alert("Lỗi", "Chưa nhập tên thuốc")
    } else if (!morning && !afternoon && !evening) {
      Alert.alert("Lỗi", "Chưa hẹn giờ uống thuốc")
    } else {
      this.setState({
        spinner: true
      })
      if (photo) {
        let source = this.state.blobFile
        if (!firebase.apps.length) {
          firebase.initializeApp(config.opt)
        }
        let storageRef = firebase
          .storage()
          .ref()
          .child(`${this.props.medicineData.elderId}/${this.state.imgName}.jpg`)
        storageRef
          .put(source, {
            contentType: "image/jpeg"
          })
          .then(snapshot => {
            storageRef.getDownloadURL().then(url => {
              firebase
                .database()
                .ref(
                  `Patients/${this.props.medicineData.elderId}/Medicines/${
                    this.props.medicineData.idMedicineFB
                  }`
                )
                .update({
                  imageUrl: url,
                  name: this.state.imgName,
                  script: this.state.text,
                  morning: ~~this.state.morning,
                  afternoon: ~~this.state.afternoon,
                  evening: ~~this.state.evening
                })
                .then(async data => {
                  //success callback
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
                    blobFile: null,
                    spinner: false
                  })
                  this.setModalVisible(false)
                })
                .catch(error => {
                  //error callback
                  console.log("error ", error)
                })
            })
          })
      }
      if (!photo) {
        firebase
          .database()
          .ref(
            `Patients/${this.props.medicineData.elderId}/Medicines/${
              this.props.medicineData.idMedicineFB
            }`
          )
          .update({
            imageUrl: this.state.imageUrl,
            name: this.state.imgName,
            script: this.state.text,
            morning: ~~this.state.morning,
            afternoon: ~~this.state.afternoon,
            evening: ~~this.state.evening
          })
          .then(async data => {
            //success callback
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
              blobFile: null,
              spinner: false
            })
            this.setModalVisible(false)
          })
          .catch(error => {
            //error callback
            console.log("error ", error)
          })
      }
    }
  }

  render() {
    const { photo } = this.state
    return (
      <View>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />

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
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {photo ? (
                        <Image
                          source={{
                            uri: photo.uri
                          }}
                          style={{
                            width: 300,
                            height: 300,
                            marginBottom: 20
                          }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: this.state.imageUrl
                          }}
                          style={{
                            width: 300,
                            height: 300,
                            marginBottom: 20
                          }}
                        />
                      )}
                    </View>
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
                        value={this.state.imgName}
                      />
                    </Item>
                  </View>
                  <View>
                    <Label style={{ marginTop: 30 }}>Ghi chú</Label>
                    <Textarea
                      rowSpan={3}
                      bordered
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
})

export default UpdateMedicine
