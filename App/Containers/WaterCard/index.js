import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Button, CardItem, Text, Left, Right, Icon } from "native-base"

import IconWithText from '../../Components/IconWithText'
import CommonCard from '../../Components/CommonCard'
import TextWrapper from '../../Components/TextWrapper'
import CommonText from '../../Components/CommonText'
import CommonIcon from '../../Components/CommonIcon'
import styled from 'styled-components';

const StyledButtonsContainer = styled(View)`
  flexDirection: row,
  margin-bottom: 10px;
`;


class WaterCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numOfGlass: 0,
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }
  handleAddGlass = () => {
    const { numOfGlass } = this.state;
    this.setState({ numOfGlass: numOfGlass + 1})
  }
  handleRemoveOneGlass = () => {
    const { numOfGlass } = this.state;
    if(numOfGlass > 0) {
      this.setState({numOfGlass: numOfGlass - 1})
    } else 
    return;
  }

  render () {
    const { numOfGlass } = this.state;
    console.log(this.state)
    return (
      <TouchableOpacity>
        <CommonCard>
          <CardItem cardBody>
            <Left>
              <IconWithText icon="water" text="water" color="blue" />
            </Left>
          </CardItem>

          <TextWrapper text={numOfGlass}>
            <CommonText text="/Glass" />

            <Right>
              <View style={{ flexDirection: "row" }}>
                <Button transparent onPress={this.handleRemoveOneGlass} >{<CommonIcon name="remove" />}</Button>
                <Button transparent onPress={this.handleAddGlass}>
                  {<CommonIcon name="add-circle" />}
                </Button>
              </View>
            </Right>
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

export default connect(mapStateToProps, mapDispatchToProps)(WaterCard)
