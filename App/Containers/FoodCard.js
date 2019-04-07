import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Header, Content, Card, CardItem, Text, Body, Left, Icon, Right } from "native-base"

import CommonButton from '../Components/CommonButton/index'
import IconWithText from '../Components/IconWithText/index'
import CommonCard from '../Components/CommonCard'
import TextWrapper from '../Components/TextWrapper'

class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calo: 0
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return 
             
    })
  }

  render () {
    const { calo } = this.state;
    return (
      <TouchableOpacity>
        <CommonCard >
          <CardItem cardBody>
            <Left>
              <IconWithText icon="pizza" text="Food" color="green"></IconWithText>
            </Left>
            <Right>
              <CommonButton title="ADD" onPress={() => alert('click food')}></CommonButton>
            </Right>
          </CardItem>
          <View>
            <TextWrapper text={calo}>
            <Text style={{lineHeight: 40}}>/2150Kcal</Text>
            </TextWrapper>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FoodCard)
