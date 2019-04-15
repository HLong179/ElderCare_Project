import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Header, Content, Card, CardItem, Text, Body, Left, Icon, Right } from "native-base"
import { withNavigation } from 'react-navigation';

import CommonButton from '../../components/CommonButton'
import IconWithText from '../../components/IconWithText'
import CommonCard from '../../components/CommonCard'
import TextWrapper from '../../components/TextWrapper'
import CommonText from '../../components/CommonText'


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

  render () {
      console.log(this.props);
    return (
      <TouchableOpacity onPress={this.handleAddHeartData}>
        <CommonCard >
          <CardItem cardBody>
            <Left>
              <IconWithText icon="heart" text="Heart" color="tomato"></IconWithText>
            </Left>
            <Right>
              <CommonButton title="ADD"></CommonButton>
            </Right>
          </CardItem>
          <TextWrapper>
          <CommonText text="How is your heart rate?"></CommonText>
          </TextWrapper>
        </CommonCard>
      </TouchableOpacity>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

// const enhance = compose(
//     // connect(mapStateToProps, mapDispatchToProps),/
//     withNavigation 
// )
export default withNavigation(HeartCard);
