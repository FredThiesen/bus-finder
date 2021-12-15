import {Dimensions, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {COLORS} from '../../COLORS';

interface StyledProps {
  isActive?: boolean;
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