import React from "React"
import { Image } from "react-native"
import { Container, Card, CardItem, Text, Body, Content } from "native-base"
import drug from "../../images/drugs.jpg"
import MedicineDetails from "../MedicineDetail"
import AddMedicine from "./AddMedicine"

class MedicinePage extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <AddMedicine />
          <MedicineDetails />
        </Content>
      </Container>
    )
  }
}

export default MedicinePage
