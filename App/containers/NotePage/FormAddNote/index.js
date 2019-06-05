import React from "react"
import { Modal, View, Alert, StyleSheet } from "react-native"
import {
  Button,
  Container,
  Content,
  Textarea,
  Label,
  Form,
  Input,
  Item,
  Text,
  Toast
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import Spinner from "react-native-loading-spinner-overlay"
import moment from "moment"
import SETTINGS from "../../../settings"

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.modalVisible,
      title: null,
      text: null,
      spinner: false
    }
  }

  handleCancel = () => {
    this.setModalVisible(false)
    this.setState({
      modalVisible: false,
      title: null,
      text: null,
      spinner: false
    })
    this.props.handleVisible(false)
  }

  setModalVisible(visible) {
    this.props.handleVisible(visible)
    this.setState({ modalVisible: visible })
  }

  handleOK = async () => {
    console.log("ok")
    const { title, text } = this.state
    if (!title) {
      Alert.alert("Lỗi", "Chưa nhập tiêu đề")
    } else if (!text) {
      Alert.alert("Lỗi", "Chưa nhập ghi chú")
    } else {
      await this.setState({
        spinner: true
      })
      const storage = await AsyncStorage.getItem("curUser")
      const objStorage = JSON.parse(storage)
      const elderId = objStorage.elderId
      let timeNow = new Date().getTime()

      fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/addNote`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          elderId: elderId,
          time: moment().format("DD/MM/YYYY HH:mm:ss"),
          title: title,
          script: text
        })
      })
        .then(async response => {
          response = await response.json()

          this.setState({
            title: null,
            text: null,
            spinner: false
          })
          this.setModalVisible(false)
          Toast.show({
            text: "Thêm ghi chú thành công",
            buttonText: "x",
            type: "success",
            duration: 2000
          })
        })
        .catch(error => {
          //error callback
          console.log("error ", error)
        })
    }
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
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
              <View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 24,
                    textAlign: "center",
                    marginTop: 30
                  }}
                >
                  Ghi chú quan trọng
                </Text>
              </View>
              <Content style={{ padding: 10 }}>
                <Form>
                  <View style={{ marginTop: 20 }}>
                    <Label style={{ marginTop: 30, marginBottom: 5 }}>
                      Tiêu đề ghi chú
                    </Label>
                    <Item regular>
                      <Input onChangeText={title => this.setState({ title })} />
                    </Item>
                  </View>
                  <View>
                    <Label style={{ marginTop: 30 }}>Nội dung ghi chú</Label>
                    <Textarea
                      rowSpan={3}
                      bordered
                      onChangeText={text => this.setState({ text })}
                    />
                  </View>
                </Form>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 100,
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

export default AddNote
