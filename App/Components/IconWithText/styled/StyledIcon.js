import Styled, {css} from 'styled-components';
import { Icon } from 'native-base';
import { Platform } from 'react-native'


const StyledIcon = Styled(Icon)`
  color: ${props =>  props.color || 'white'};
  margin-right: 3px;
`;

export default StyledIcon;