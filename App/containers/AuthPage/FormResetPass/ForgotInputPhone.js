import React from "React"
import { View, BackHandler, StyleSheet, Alert } from "react-native"
import { Label, Form, Input, Content, Item } from "native-base"
import Button from "../../../components/CommonButton"

import { withNavigation } from "react-navigation"

class ForgotInputPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: null
    }
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    this.props.navigation.goBack(null)
  }

  handleSubmit = () => {
    const { phone } = this.state
    if (!phone) {
      Alert.alert("Lỗi", "Chưa nhập số điện thoại")
    } else {
      const { navigate } = this.props.navigation
      navigate("ForgotConfirmOTP")
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
                Vui lòng nhập số điện thoại để gửi mã xác nhận:
              </Label>
              <Item regular>
                <Input onChangeText={phone => this.setState({ phone })} />
              </Item>
            </View>
          </Form>
          <Button
            style={{ marginTop: 50 }}
            onPress={this.handleSubmit}
            title={"Gửi OTP"}
          />
        </Content>
      </View>
    )
  }
}

export default withNavigation(ForgotInputPhone)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
