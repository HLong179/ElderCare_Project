import React, { Component } from 'react'
import { BackHandler, View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Col, Row, Grid } from 'react-native-easy-grid';

// import HeaderWithIcon from "./Header";
import FooterTabs from "./FooterTabs";

import { Container, Header, Content } from 'native-base';


// import FoodCard from "./FoodCard";
import SleepCard from "./SleepCard"
import WeightCard from './WeightCard'
import MedicineCard from './MedicineCard'
import HeartCard from './HeartCard'


class Home extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true;
        })
        try {
            const data = await AsyncStorage.getItem('curUser');
            // if (data!= null) {
            //     alert(data);
            // }
        }
        catch(err){
            console.log(err);
        }
    }
    

    render () {
        return (
            <Container >
                {/*<HeaderWithIcon />*/}
                <Content padder>
                    <Grid >
                        <Row>
                            <Col>
                                <HeartCard/>
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
                                <MedicineCard />
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

export default (Home)