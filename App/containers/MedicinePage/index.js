import React from "React"
import { Container, Content } from "native-base"
import AddMedicine from "./AddMedicine"
import ListMedicines from "./ListMedicines"
import firebase from "react-native-firebase"
import config from "../../Constant"
import { withNavigation } from "react-navigation"
import {BackHandler} from "react-native"

class MedicinePage extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    const { navigate } = this.props.navigation
    navigate("Home")
  }
  componentDidMount() {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(config.opt)
    // }
  }

  render() {
    return (
      <Container>
        <Content>
          <AddMedicine />
          <ListMedicines />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(MedicinePage)
