import React, { Component } from "react"
import { BackHandler, TouchableOpacity, View } from "react-native"
import { CardItem, Left } from "native-base"
import { withNavigation } from "react-navigation"

import IconWithText from "../../components/IconWithText"
import CommonCard from "../../components/CommonCard"
import TextWrapper from "../../components/TextWrapper"
import CommonText from "../../components/CommonText"
import styled from "styled-components"

const StyledButtonsContainer = styled(View)`
  flexDirection: row,
  margin-bottom: 10px;
`

class MedicineCard extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack()
      return true
    })
  }

  toListMedicines = () => {
    this.props.navigation.navigate("MedicinePage")
  }
  render() {
    return (
      <TouchableOpacity onPress={this.toListMedicines}>
        <CommonCard>
          <CardItem cardBody>
            <Left>
              <IconWithText icon="medkit" text="Thuốc" color="blue" />
            </Left>
          </CardItem>

          <TextWrapper>
            <CommonText text="Quản lý thuốc" />
          </TextWrapper>
        </CommonCard>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withNavigation(MedicineCard)
