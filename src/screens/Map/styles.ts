import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../COLORS';

interface MarkerProps {
  background: string;
}

export const Container = styled(View)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${COLORS.white};
`;

export const MapContainer = styled(View)`
  height: 75%;
  width: 100%;
`;

export const DetailsContainer = styled(View)`
  height: 25%;
  width: 100%;
  background: ${COLORS.white};
  border-top-width: 3px;
  border-top-color: ${COLORS.neutralBlack};
`;

export const MarkerContainer = styled(View)<MarkerProps>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const InnerMarkerCircle = styled(View)`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: transparent;
  border: 3px solid ${COLORS.neutralBlack};
`;

export const ButtonBack = styled(TouchableOpacity)`
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  left: 0;
  elevation: 25;
  z-index: 1;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
`;
