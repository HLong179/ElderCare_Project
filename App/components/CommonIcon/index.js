import React from 'react';
import styled from 'styled-components';
import { Icon } from 'native-base';


function CommonIcon(props) {
    return (
        <Icon android={`md-${props.name}`} ios={`ios-${props.name}`}></Icon>
    )
}
export default CommonIcon;