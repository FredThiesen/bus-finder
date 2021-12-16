import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../COLORS';

interface MarkerProps {
  background: string;
}
interface DetailsProps {
  color?: string;
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

export const DetailsContainer = styled(View)`
  height: 25%;
  width: 100%;
  background: ${COLORS.white};
  border-top-width: 3px;
  border-top-color: ${COLORS.neutralBlack};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const DetailsTitle = styled(Text)`
  font-size: 18px;
  color: ${COLORS.neutralBlack};
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  /* text-align: center; */
  align-self: center;
`;

export const DetailsRow = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 5px;
`;

export const DetailsImage = styled(Image)`
  width: 50px;
  height: 50px;
  aspect-ratio: 1;
  tint-color: ${COLORS.primary};
`;
export const DetailsImageContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 5px;
`;
export const DetailsLabel = styled(Text)<DetailsProps>`
  font-size: 16px;
  color: ${props => (props.color ? props.color : COLORS.neutralBlack)};
  font-weight: normal;
  margin-bottom: 5px;
`;
export const DetailsInfoContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  padding: 5px;
`;

export const NestedText = styled(Text)`
  font-weight: bold;
  color: ${COLORS.neutralBlack};
`;

export const DetailsButton = styled(TouchableOpacity)`
  height: 45px;
  border-radius: 25px;
  background: ${COLORS.primary};
  width: 100%;
  /* margin-bottom: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailsButtonLabel = styled(Text)`
  font-size: 16px;
  color: ${COLORS.neutralBlack};
  font-weight: bold;
`;

export const DetailsModal = styled(Modal)`
  width: 85%;
  height: 85%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${COLORS.white};
  border-radius: 10px;

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
`;
