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
  Title
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import Spinner from "react-native-loading-spinner-overlay"

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
    const { title, text } = this.state
    if (!title) {
      Alert.alert("Lỗi", "Chưa nhập tiêu đề")
    } else if (!imgName) {
      Alert.alert("Lỗi", "Chưa nhập ghi chú")
    } else {
      await this.setState({
        spinner: true
      })
      const storage = await AsyncStorage.getItem("curUser")
      const objStorage = JSON.parse(storage)
      const elderId = objStorage.elderId
      //   let storageRef = firebase
      //     .storage()
      //     .ref()
      //     .child(`${elderId}/${this.state.imgName}.jpg`)
      //   storageRef
      //     .put(source, {
      //       contentType: "image/jpeg"
      //     })
      //     .then(snapshot => {
      //       storageRef.getDownloadURL().then(url => {
      //         firebase
      //           .database()
      //           .ref(`Patients/${elderId}/Medicines`)
      //           .push({
      //             elderId: elderId,
      //             imageUrl: url,
      //             name: this.state.imgName,
      //             script: this.state.text,
      //             morning: ~~this.state.morning,
      //             afternoon: ~~this.state.afternoon,
      //             evening: ~~this.state.evening
      //           })
      //           .then(async data => {
      //             //success callback
      //             this.setState({
      //               modalVisible: false,
      //               loading: false,
      //               elderId: "",
      //               photo: null,
      //               text: "",
      //               imgName: "",
      //               morning: false,
      //               afternoon: false,
      //               evening: false,
      //               blobFile: null,
      //               spinner: false
      //             })
      //             this.setModalVisible(false)
      //           })
      //           .catch(error => {
      //             //error callback
      //             console.log("error ", error)
      //           })
      //       })
      //     })
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
              <View >
                <Text style={{fontWeight: "500", fontSize: 24, textAlign: "center", marginTop: 30}}>Ghi chú quan trọng</Text>
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
