import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid';

import HeaderWithIcon from "./Header";
import FooterTabs from "./FooterTabs";

import { Container, Header, Content } from 'native-base';


import FoodCard from "./FoodCard";
import SleepCard from "./SleepCard"
import WeightCard from './WeightCard'
import WaterCard from './WaterCard'
import HeartCard from './HeartCard'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyle'

class Home extends Component {
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
      <Container >
        <HeaderWithIcon />
          <Content padder>
      <Grid >
        <Row>
          <Col>
            <HeartCard/>
          </Col>
        </Row>
        <Row>
          <Col>
            <FoodCard/>
          </Col>
        </Row>
        <Row>
          <Col>
            <SleepCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <WeightCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <WaterCard />
          </Col>
        </Row>
      </Grid>
      </Content>
      <FooterTabs />
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
