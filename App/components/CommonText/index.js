import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'native-base'

const StyledText = styled(Text)`
    line-height: 40px;
`;

function CommonText(props) {
    return (
        <StyledText>
            {props.text}
        </StyledText>
    )
}

export default CommonText;