import React, {Component} from 'react';
import styled from 'styled-components';
import { Item, Input  } from 'native-base';

const StyledInput = styled(Item)`
    margin-top: 10;
    margin-bottom: 10;
    text-transform: none;
`;

const CommonInput = (props) => {
    return (
        <StyledInput {...props}     
        >
        </StyledInput>
    )
}


export default CommonInput;