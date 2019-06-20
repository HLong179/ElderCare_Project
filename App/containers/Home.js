import React, { Component } from "react"
import { BackHandler, View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Col, Row, Grid } from "react-native-easy-grid"
import { YellowBox } from "react-native"

// import HeaderWithIcon from "./Header";
import FooterTabs from "./FooterTabs"

import { Container, Header, Content } from "native-base"

// import FoodCard from "./FoodCard";
import SleepCard from "./SleepCard"
import WeightCard from "./WeightCard"
import MedicineCard from "./MedicineCard"
import HeartCard from "./HeartCard"
import SetTimeCard from "./SetTimeCard";
import CalorCard from "./CalorCard";
import WeightChartCard from "./Weight";
class Home extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   socket: null
    // }
  }
  componentWillMount() {
    YellowBox.ignoreWarnings([
      "Warning: ListView",
      "Setting a timer for a long",
      "Warning: Can't perform a React state",
      "Possible Unhandled"
    ])
  }
   componentDidMount() {
    // this.connectSocket();   


    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack()
      return true
    })
    // try {
    //   // const data =  AsyncStorage.getItem("curUser")
    //   // if (data!= null) {
    //   //     alert(data);
    //   // }
    // } catch (err) {
    //   console.log(err)
    // }
  }

  

  render() {
    // console.log("this socket we've created: ", this.state.socket)
    // console.log("test stringify: ",JSON.stringify(this.state.socket));
    return (
      // <SocketProvider socket={this.state.socket}>
        <Container>
          {/*<HeaderWithIcon />*/}
          <Content padder>
            <Grid>
              <Row>
                <Col>
                  <HeartCard  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CalorCard />
                </Col>
              </Row>
              <Row>
                <Col>
                  <WeightChartCard />
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  <SleepCard />
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <WeightCard />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MedicineCard />
                </Col>
              </Row>

              <Row>
                <Col>
                  <SetTimeCard />
                </Col>
              </Row>
             
            </Grid>
          </Content>
          <FooterTabs />
        </Container>
      // </SocketProvider>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default Home
