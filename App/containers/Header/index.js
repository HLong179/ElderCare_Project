import React, {Component} from 'react';
import CommonIcon from '../../components/CommonIcon';
import {Header, Left, Body, Right, Button, Title} from 'native-base';
import BulbComponent from './BulbComponent';
import PersonComponent from './PersonComponent';
import MoreComponent from './MoreComponent';
import { MenuProvider } from 'react-native-popup-menu';



export default class HeaderMultipleIconExample extends Component {

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <CommonIcon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Health App</Title>
                </Body>
                <Right>
                    <BulbComponent/>
                    <PersonComponent/>
                    <MoreComponent/>


                </Right>
            </Header>
        );
    }
}