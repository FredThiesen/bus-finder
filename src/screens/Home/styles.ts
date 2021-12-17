import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {COLORS} from '../../COLORS';

interface StyledProps {
  isActive?: boolean;
}

interface CardProps {
  fontSize?: string;
  color?: string;
}

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: ${COLORS.white};
  padding: 10px;
`;

export const TabContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 70px;
  margin-top: 10px;
  margin-bottom: 40px;
`;
export const TabButtonContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: auto;
`;
export const TabButton = styled(TouchableOpacity)<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  height: 100%;
  background: ${props =>
    props.isActive ? COLORS.primary : COLORS.neutralGray};
  border-radius: 15px;
  padding: 15px;
`;
export const TabImage = styled(Image)<StyledProps>`
  width: 30px;
  aspect-ratio: 1;
  tint-color: ${props => (props.isActive ? COLORS.white : COLORS.neutralBlack)};
`;
export const TabText = styled(Text)<StyledProps>`
  font-size: 18px;
  color: ${props => (props.isActive ? COLORS.primary : COLORS.neutralBlack)};
  padding-left: 10px;
  padding-right: 10px;
`;
export const LineCard = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background: ${COLORS.neutralGray};
  height: 80px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const LineCardImageContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 15%;
  height: 100%;
`;
export const LineCardTextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 65%;
  height: 100%;
`;

export const LineCardText = styled(Text)<CardProps>`
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: ${props => (props.color ? props.color : COLORS.neutralBlack)};
  font-weight: normal;
  width: 100%;
`;

export const NestedText = styled(Text)`
  font-weight: bold;
  color: ${COLORS.primary};
`;

export const CardImage = styled(Image)`
  width: 30px;
  height: 30px;
  aspect-ratio: 1;
  tint-color: ${COLORS.primary};
`;

export const MapButtonContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: auto;
`;

export const MapButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 5px;
  elevation: 5;
`;

export const InputContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: auto;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const InputLabel = styled(Text)`
  font-size: 18px;
  color: ${COLORS.neutralBlack};
  font-weight: normal;
  margin-bottom: 5px;
`;

export const StyledInput = styled(TextInput)`
  width: 75%;
  height: 45px;
  border-radius: 15px;
  font-size: 15px;
  background: ${COLORS.neutralGray};
  color: ${COLORS.neutralBlack};
  padding: 10px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  position: absolute;
  top: 50%;
  align-self: center;
  z-index: 1;
`;
