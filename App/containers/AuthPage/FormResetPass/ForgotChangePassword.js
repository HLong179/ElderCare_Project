import React from "React"
import { View, BackHandler, StyleSheet, Alert } from "react-native"
import { Label, Form, Input, Content, Item } from "native-base"
import Button from "../../../components/CommonButton"

import { withNavigation } from "react-navigation"

class ForgotChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null
    }
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    this.props.navigation.goBack("ForgotConfirmOTP")
  }

  handleSubmit = () => {
    const { password } = this.state
    if (!password) {
      Alert.alert("Lỗi", "Chưa thay đổi mật khẩu")
    } else {
      const { navigate } = this.props.navigation
      navigate("Login")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Content
          style={{
            padding: 10,
            width: "100%"
          }}
        >
          <Form>
            <View>
              <Label style={{ marginTop: 80, marginBottom: 10 }}>
                Nhập mật khẩu mới:
              </Label>
              <Item regular>
                <Input onChangeText={password => this.setState({ password })} />
              </Item>
            </View>
          </Form>
          <Button
            style={{ marginTop: 50 }}
            onPress={this.handleSubmit}
            title={"Xác nhận"}
          />
        </Content>
      </View>
    )
  }
}

export default withNavigation(ForgotChangePassword)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
