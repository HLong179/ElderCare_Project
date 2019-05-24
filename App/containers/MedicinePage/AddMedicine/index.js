import React from "react"
import {
  Image,
  ScrollView,
  Modal,
  TouchableHighlight,
  View,
  Alert
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
} from "native-base"
import Dialog from "react-native-dialog"
import moment from "moment"
import firebase from "react-native-firebase"
import ImagePicker from "react-native-image-picker"
import styled from "styled-components"
import AsyncStorage from "@react-native-community/async-storage"
import SETTINGS from "../../../settings"

const Wrapper = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10;
  margin-right: 10;
  text-align: center;
  align-self: center;
  margin-bottom: 20;
`

class AddMedicine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      elderId: "",
      photo: null,
      text: ""
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  handleChoosePhoto = () => {
    const options = {}
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          photo: response
        })
      }
    })
  }
  handleOK = () => {
    let source = "data:image/jpeg;base64," + this.state.photo.data
    console.log(source)
    fetch(`http://${SETTINGS.LOCAL_IP}:6900/medicine/getImageUrl`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        elderId: this.state.elderId,
        imageName: this.state.photo.fileName,
        base64Url: source
      })
    })
      .then(async response => {
        response = await response.json()
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { photo } = this.state
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
                  <Label style={{ marginTop: 30 }}>Ghi chú</Label>
                  <Textarea
                    rowSpan={2}
                    bordered
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
              </Form>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40
                }}
              >
                <Button
                  light
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
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
      </View>
    )
  }
}

export default AddMedicine
