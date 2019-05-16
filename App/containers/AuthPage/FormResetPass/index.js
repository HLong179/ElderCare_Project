import React, { Component } from 'react';
import { Text } from 'react-native';
import Wrapper from '../../../components/CommonWrapper';
import { Content, Form, Icon, Input} from 'native-base';
import Item from "../../../components/CommonItemInput";

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
                    <Text style={{alignSelf: "center"}}>Nhập thông tin vào ô bên dưới để lấy lại mật khẩu</Text>
                    <Form>
                        <Item >
                            <Input placeholder="ID (Email hoặc số điện thoại)" onChangeText={this.handleChangeEmail}/>
                            <Icon active name="mail"/>
                        </Item>
                    </Form>

                </Content>


            </Wrapper>

        );
    }
}

export default resetPass;

