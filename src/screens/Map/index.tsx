import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation} from '@react-navigation/core';
import bbox from '@turf/bbox';
import {lineString as makeLineString} from '@turf/helpers';
import React, {useEffect} from 'react';
import {FlatList, Linking, Modal, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BackSvg from '../../assets/svg/back.svg';
import {COLORS} from '../../COLORS';
import {ItineraryProps} from '../../interfaces/itineraryProps';
import {
  ButtonBack,
  Container,
  DetailsButton,
  DetailsButtonLabel,
  DetailsContainer,
  DetailsImage,
  DetailsImageContainer,
  DetailsInfoContainer,
  DetailsLabel,
  DetailsModal,
  DetailsRow,
  DetailsTitle,
  InnerMarkerCircle,
  MapContainer,
  MarkerContainer,
  NestedText,
} from './styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoicmljYXJkb3RoaWVzZW4iLCJhIjoiY2tyZ20zZmQyNjduYjJ2bW44emVudHc1MyJ9.jVil7RnJzjTVC6YU_RnokQ',
);

const Maps = () => {
  const navigation = useNavigation();
  const itinerary: ItineraryProps = useSelector(
    (state: any) => state.itineraries,
  );
  const [shape, setShape] = React.useState<any>(null);
  const [bounds, setBounds] = React.useState<any>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [linkArray, setLinkArray] = React.useState<string[]>([]);

  const renderShape = () => {
    return (
      <MapboxGL.ShapeSource
        key={'index'}
        id={`index`}
        //@ts-ignore
        shape={shape}>
        <MapboxGL.LineLayer
          key={'index'}
          id={'index'}
          // @ts-ignore
          style={layerStyle.route}
        />
      </MapboxGL.ShapeSource>
    );
  };

  const renderMarkers = () => {
    return (
      <>
        <MapboxGL.PointAnnotation
          id="origin"
          title="origin location"
          coordinate={itinerary.coords[0]}>
          <MarkerContainer background={COLORS.yellow}>
            <InnerMarkerCircle></InnerMarkerCircle>
          </MarkerContainer>
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation
          id="destination"
          title="destination location"
          coordinate={itinerary.coords[itinerary.coords.length - 1]}>
          <MarkerContainer background={COLORS.neutralGray}>
            <InnerMarkerCircle></InnerMarkerCircle>
          </MarkerContainer>
        </MapboxGL.PointAnnotation>
      </>
    );
  };

  const handleReturn = () => {
    setShape(null);
    setBounds(null);
    navigation.goBack();
  };

  const initializeLinkArray = () => {
    const linkArray: string[] = [];
    itinerary.coords.forEach((coord: any, index: number) => {
      linkArray.push(
        `geo:${coord[1]},${coord[0]}q=${coord[1]},${coord[0]}?z=16`,
      );
    });
    setLinkArray(linkArray);
  };

  const renderLink = (link: string, index: number) => {
    console.log(link);
    return (
      <Text style={{color: 'blue'}} onPress={() => Linking.openURL(link)}>
        Parada {index + 1}
      </Text>
    );
  };
  useEffect(() => {
    if (itinerary) {
      if (itinerary.coords) {
        let line = makeLineString(itinerary.coords);

        const bboxResult = bbox(line);
        const northEast = [bboxResult[0], bboxResult[1]];
        const southWest = [bboxResult[2], bboxResult[3]];
        const bounds = {
          ne: northEast,
          sw: southWest,
        };
        setShape(line);
        setBounds(bounds);
        initializeLinkArray();
      }
    }
  }, [itinerary]);

  return (
    <Container>
      <DetailsModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <DetailsContainer>
          <DetailsTitle>{itinerary.name}</DetailsTitle>
          <FlatList
            data={linkArray}
            renderItem={({item, index}) => renderLink(item, index)}
            keyExtractor={item => item}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews
          />
        </DetailsContainer>
      </DetailsModal>
      <MapContainer>
        <ButtonBack onPress={handleReturn}>
          <BackSvg />
        </ButtonBack>
        <MapboxGL.MapView
          style={{flex: 1}}
          rotateEnabled={false} // desabilita função de rotacionar o mapa
          compassEnabled={false} // desabilita bússola do mapa
          logoEnabled={false} // desabilita o logo do mapbox
          pitchEnabled={false} // desabilita o pitch do mapa
          zoomEnabled={true} // habilita o zoom do mapa
        >
          <MapboxGL.Camera
            zoomLevel={13}
            bounds={bounds}
            padding={{
              paddingLeft: 70,
              paddingRight: 70,
              paddingTop: 70,
              paddingBottom: 70,
            }}
          />
          {/* {coords && renderCoords()} */}
          {shape && renderShape()}
          {shape && renderMarkers()}
        </MapboxGL.MapView>
      </MapContainer>
      <DetailsContainer>
        <DetailsTitle>{itinerary.name}</DetailsTitle>
        <DetailsRow>
          <DetailsImageContainer>
            <DetailsLabel>
              <NestedText>Tipo de transporte:</NestedText>
            </DetailsLabel>
            {itinerary.lineId.length > 3 && (
              <>
                <DetailsImage source={require('../../assets/images/bus.png')} />
                <DetailsLabel color={COLORS.primary}>Ônibus</DetailsLabel>
              </>
            )}
            {itinerary.lineId.length < 4 && (
              <>
                <DetailsImage
                  source={require('../../assets/images/minibus.png')}
                />
                <DetailsLabel color={COLORS.primary}>Lotação</DetailsLabel>
              </>
            )}
          </DetailsImageContainer>
          <DetailsInfoContainer>
            <DetailsLabel>
              <NestedText>Código: </NestedText>
              {itinerary.code}
            </DetailsLabel>
            <DetailsLabel>
              <NestedText>Número de paradas: </NestedText>
              {itinerary.coords.length}
            </DetailsLabel>
            <DetailsButton
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <DetailsButtonLabel>Ver paradas</DetailsButtonLabel>
            </DetailsButton>
          </DetailsInfoContainer>
        </DetailsRow>
      </DetailsContainer>
    </Container>
  );
};

const layerStyle = {
  route: {
    lineColor: COLORS.primary,
    lineWidth: 5,
    lineOpacity: 1,
    lineCap: 'round',
    // lineJoin: 'round',
  },
};
export default Maps;
