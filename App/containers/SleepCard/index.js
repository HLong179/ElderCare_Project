import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Header, Content, Card, CardItem, Text, Body, Left, Icon, Right } from "native-base"

import CommonButton from '../../components/CommonButton'
import IconWithText from '../../components/IconWithText'
import CommonCard from '../../components/CommonCard'
import TextWrapper from '../../components/TextWrapper'
import CommonText from '../../components/CommonText'


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



export default SleepCard
