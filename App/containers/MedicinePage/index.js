import React from "React"
import { Container, Content } from "native-base"
import AddMedicine from "./AddMedicine"
import ListMedicines from "./ListMedicines"
import firebase from "firebase"
import config from "../../Constant"

class MedicinePage extends React.Component {
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.opt)
    }
  }

  render() {
    return (
      <Container style={{ padding: 10 }}>
        <Content>
          <AddMedicine />
          <ListMedicines />
        </Content>
      </Container>
    )
  }
}

export default MedicinePage
