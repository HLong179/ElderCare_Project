import React, {Component} from 'react';
import styled from 'styled-components';
import { Item } from 'native-base';

const StyledInput = styled(Item)`
    margin-top: 10;
    margin-bottom: 10;
`;

const CommonInput = (props) => {
    return (
        <StyledInput {...props}/>
    )
}


export default CommonInput;