import { Text } from 'native-base';
import styled from 'styled-components';

const StyledText = styled(Text)`
  color: ${props => props.color ? "grey" : "white"};
  font-weight: bold;
`;

export default StyledText;