import React, {Component} from 'react';
import {Header, Left, Body, Right, Title} from 'native-base';
import BulbComponent from './BulbComponent';
import PersonComponent from './PersonComponent';
import MoreComponent from './MoreComponent';


export default class HeaderMultipleIconExample extends Component {

    render() {
        return (
            <Header>
                <Left />
                <Body>
                    <Title>Health App</Title>
                </Body>
                <Right>
                    {/*<BulbComponent/>*/}
                    <PersonComponent/>
                    {/*<MoreComponent/>*/}
                </Right>
            </Header>
        );
    }
}