import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Header, Content, Card, CardItem, Text, Body, Left, Icon, Right } from "native-base"

import CommonButton from '../../Components/CommonButton'
import IconWithText from '../../Components/IconWithText'
import CommonCard from '../../Components/CommonCard'
import TextWrapper from '../../Components/TextWrapper'
import CommonText from '../../Components/CommonText'


class SleepCard extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  render () {
    return (
      <TouchableOpacity>
        <CommonCard >
          <CardItem cardBody>
            <Left>
              <IconWithText icon="moon" text="Sleep" color="blue"></IconWithText>
            </Left>
            <Right>
              <CommonButton title="ADD"></CommonButton>
            </Right>
          </CardItem>
          <TextWrapper>
          <CommonText text="How do you sleep?"></CommonText>
          </TextWrapper>
        </CommonCard>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepCard)
