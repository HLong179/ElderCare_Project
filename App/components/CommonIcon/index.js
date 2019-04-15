import React from 'react';
import styled from 'styled-components';
import { Icon } from 'native-base';

// const StyledIcon = styled(Icon)`
//   margin-right: 15px;
// `;


function CommonIcon(props) {
    return (
        <Icon android={`md-${props.name}`} ios={`ios-${props.name}`}></Icon>
    )
}
export default CommonIcon;