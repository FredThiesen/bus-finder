import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../COLORS';

export const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: 40px;
  background: ${COLORS.primary};
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

export const BackgroundImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  resize-mode: cover;
  top: 5%;
`;

export const Button = styled(TouchableOpacity)`
  height: 80px;
  width: 100%;
  background-color: ${COLORS.neutralGray};
  color: ${COLORS.neutralBlack};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;

export const ButtonLabel = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${COLORS.neutralBlack};
`;
