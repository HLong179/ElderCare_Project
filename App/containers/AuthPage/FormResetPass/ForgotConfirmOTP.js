import React from "React"
import { View, BackHandler, StyleSheet, Alert } from "react-native"
import { Label, Form, Input, Content, Item } from "native-base"
import Button from "../../../components/CommonButton"

import { withNavigation } from "react-navigation"

class ForgotConfirmOTP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      otpCode: null
    }
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    this.props.navigation.goBack("ForgotInputPhone")
  }

  handleSubmit = () => {
    const { otpCode } = this.state
    if (!otpCode) {
      Alert.alert("Lỗi", "Chưa nhập mã OTP")
    } else {
      const { navigate } = this.props.navigation
      navigate("ForgotChangePassword")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Content
          style={{
            padding: 10
          }}
        >
          <Form>
            <View>
              <Label style={{ marginTop: 80, marginBottom: 10 }}>
                Vui lòng nhập mã OTP đã được gửi về điện thoại:
              </Label>
              <Item regular>
                <Input onChangeText={otpCode => this.setState({ otpCode })} />
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

export default withNavigation(ForgotConfirmOTP)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
