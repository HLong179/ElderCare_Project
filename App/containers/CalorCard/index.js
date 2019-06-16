import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Header, Content, Card, CardItem, Text, Body, Left, Icon, Right } from "native-base"
import { withNavigation } from 'react-navigation';
import { compose } from 'redux';

import CommonButton from '../../components/CommonButton'
import IconWithText from '../../components/IconWithText'
import CommonCard from '../../components/CommonCard'
import TextWrapper from '../../components/TextWrapper'
import CommonText from '../../components/CommonText'
import {withSocketContext} from '../../../socketContext'

class HeartCard extends Component {
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

  handleAddHeartData = () => {
      this.props.navigation.navigate("FormHeartRate");
  }

  toCaloDetail = () => {
    const { socket } = this.props;
    this.props.navigation.navigate("CalorDetail", { socket: JSON.stringify(socket) } );
  }

  render () {
    return (
      <TouchableOpacity onPress={this.toCaloDetail}>
        <CommonCard >
          <CardItem cardBody>
            <Left>
              <IconWithText icon="heart" text="Calo" color="tomato"></IconWithText>
            </Left>
          </CardItem>
          <TextWrapper>
          <CommonText text="Calo"></CommonText>
          </TextWrapper>
        </CommonCard>
      </TouchableOpacity>
    );
  }
}


const enhance = compose(
    withNavigation,
    withNavigation 
)
export default enhance(HeartCard);
