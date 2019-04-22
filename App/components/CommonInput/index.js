import React from 'react';
import styled from 'styled-components';
import {Container, Content, Form, Input, Item, Label} from 'native-base';



const StyledInput = styled(Input)`

`;

const  CommonInput = (props) => {
    return (
        <StyledInput {...props} autoCapitalize="none" returnKeyType = "next"/>
    )
};

export default CommonInput;