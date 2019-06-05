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
import Spinner from "react-native-loading-spinner-overlay"
import SETTINGS from "../../../settings"
import moment from "moment"
import { connect } from "react-redux"
import { updateNote } from "../action"

class UpdateNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.modalVisible,
      script: this.props.noteData.script,
      title: this.props.noteData.title,
      id: this.props.noteData.id,
      spinner: false
    }
  }

  handleCancel = () => {
    this.setModalVisible(false)
    this.setState({
      modalVisible: false,
      title: "",
      script: "",
      spinner: false
    })
    this.props.handleVisible(false)
  }

  setModalVisible(visible) {
    this.props.handleVisible(visible)
    this.setState({ modalVisible: visible })
  }

  handleOK = async () => {
    const { title, script } = this.state
    if (!title) {
      Alert.alert("Lỗi", "Chưa nhập tiêu đề")
    } else if (!script) {
      Alert.alert("Lỗi", "Chưa nhập ghi chú")
    } else {
      await this.setState({
        spinner: true
      })

      fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/updateNote`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          time: moment().format("DD/MM/YYYY HH:mm:ss"),
          title: title,
          script: script,
          noteId: this.state.id
        })
      })
        .then(async response => {
          response = await response.json()

          this.setState(
            {
              title: null,
              script: null,
              spinner: false
            },
            () => {
              this.props.updateNote(response)
              this.setModalVisible(false)
              Toast.show({
                text: "Sửa ghi chú thành công",
                buttonText: "x",
                type: "success",
                duration: 3000
              })
            }
          )
        })
        .catch(error => {
          //error callback
          console.log("error ", error)
        })
    }
  }

  render() {
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
              <View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 24,
                    textAlign: "center",
                    marginTop: 30
                  }}
                >
                  Sửa ghi chú
                </Text>
              </View>
              <Content style={{ padding: 10 }}>
                <Form>
                  <View style={{ marginTop: 20 }}>
                    <Label style={{ marginTop: 30, marginBottom: 5 }}>
                      Tiêu đề ghi chú
                    </Label>
                    <Item regular>
                      <Input
                        onChangeText={title => this.setState({ title })}
                        value={this.state.title}
                      />
                    </Item>
                  </View>
                  <View>
                    <Label style={{ marginTop: 30 }}>Nội dung ghi chú</Label>
                    <Textarea
                      rowSpan={3}
                      bordered
                      onChangeText={script => this.setState({ script })}
                      value={this.state.script}
                    />
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

const mapDispatchToProps = dispatch => {
  return {
    updateNote: data => dispatch(updateNote(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UpdateNote)
