import React from 'react';
import { View } from 'react-native'
import Styled from 'styled-components';
import StyledIcon from './styled/StyledIcon';
import StyledText from './styled/StyledText';

const StyledView = Styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 10px;
`;

function IconWithText(props) {
    return (
        <StyledView >
            <StyledIcon android={`md-${props.icon}`} ios={props.icon} color={props.color}></StyledIcon>
            <StyledText> {props.text} </StyledText>
        </StyledView>
    )
}

export default IconWithText;