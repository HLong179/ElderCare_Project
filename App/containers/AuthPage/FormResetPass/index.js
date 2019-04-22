import React, { Component } from 'react';
import { Text } from 'react-native';
import Wrapper from '../../../components/CommonWrapper';
import { Content, Form, Icon} from 'native-base';
import Item from "../../../components/CommonItemInput";
import Input from "../../../components/CommonInput";

class resetPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idString: ''
        }
    }

    render() {
        return (
            <Wrapper>
                <Content>
                    <Text style={{alignSelf: "center"}}>Please enter your information below</Text>
                    <Form>
                        <Item >
                            <Input placeholder="ID (Email or phone number)" onChangeText={this.handleChangeEmail}/>
                            <Icon active name="mail"/>
                        </Item>
                    </Form>

                </Content>


            </Wrapper>

        );
    }
}

export default resetPass;

