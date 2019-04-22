import React, {Component} from 'react';
import {Container, Content, Form, Input, Item, Label} from 'native-base';
import styled from 'styled-components';
import CommonItem from '../../components/CommonItemInput';
import CommonButton from '../../components/CommonButton';

const Wrapper = styled(Container)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10;
    margin-right: 10;
    text-align: center;
    align-self: center;
`;

class AddRelative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleTextChange = (value) =>{
        console.log(value);
        this.setState({
            email: value
        })
    }
    handleSubmit = e =>{
        alert(this.state.email);
    }

    render() {
        return (
            <Wrapper>
                <Content>
                    <Form>
                        <CommonItem stackedLabel>
                            <Label>Relatives Email/Phone</Label>
                            <Input onChangeText={this.handleTextChange}/>
                        </CommonItem>
                        <CommonButton style={{alignSelf: 'center'}}  onPress={this.handleSubmit} title="Add Relative"/>
                    </Form>
                </Content>
            </Wrapper>

        );

    }
}

export default AddRelative;