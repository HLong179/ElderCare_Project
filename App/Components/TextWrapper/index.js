import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'native-base'
const Wrapper = styled(View)`
    margin-left: 10px;
    flex-direction: row;
    margin-bottom: 10px;
`;

const StyledText = styled(Text)`
     font-size: 40px;
     line-height: 40px;
`;

function TextWrapper(props) {
    return (
        <Wrapper>
            <StyledText>
                {props.text}
            </StyledText>
            {props.children}
        </Wrapper>
    )
}

export default TextWrapper;