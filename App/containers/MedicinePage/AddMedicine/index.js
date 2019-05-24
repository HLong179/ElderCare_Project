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
import AsyncStorage from "@react-native-community/async-storage"
import ImagePicker from "react-native-image-picker"
import CommonButton from "../../../components/CommonButton"
import CommonItem from "../../../components/CommonItemInput"
import styled from "styled-components"

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
    console.log("OK")
  }
  render() {
    const { photo } = this.state
    console.log(this.state)
    return (
      // <Container>
      //   <Content>
      //     <Button title="Nhập đơn thuốc" onPress={this.showDialog} />
      //     <Dialog.Container visible={this.state.dialogVisible}>
      //       <Dialog.Title>Nhập đơn thuốc</Dialog.Title>
      //       <ScrollView>
      //         <Form>
      //           {photo && (
      //             <Image
      //               source={{ uri: photo.uri }}
      //               style={{
      //                 width: 200,
      //                 height: 200,
      //                 marginBottom: 20,
      //                 flex: 1,
      //                 justifyContent: "center"
      //               }}
      //             />
      //           )}
      //           <Button title="Choose photo" onPress={this.handleChoosePhoto} />
      //           <Label style={{ marginTop: 20 }}>Ghi chú</Label>
      //           <Textarea
      //             rowSpan={2}
      //             bordered
      //             onChangeText={text => this.setState({ text })}
      //           />
      //         </Form>
      //       </ScrollView>

      //       <Dialog.Button label="Hủy" onPress={this.handleCancel} />
      //       <Dialog.Button label="OK" onPress={this.handleOK} />
      //     </Dialog.Container>
      //   </Content>
      // </Container>
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
