import React, { Component } from 'react';
import { Container, Header, Left, Body, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

class CommonHeader extends Component {
    constructor(props) {
        super(props);
    }

    onHandleGoBack = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onHandleGoBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>

                </Header>
            </Container>
        );
    }
}

export default withNavigation(CommonHeader)