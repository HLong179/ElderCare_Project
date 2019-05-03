import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text } from 'native-base'
import StyledButton from './styled/StyledButton'
import StyledText from './styled/StyledText'

function CommonButton(props) {
    return (
      <StyledButton primary {...props} >
        <StyledText color={props.color}>{props.title}</StyledText>
      </StyledButton>
    )
}
export default CommonButton;
