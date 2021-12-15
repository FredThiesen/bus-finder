import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useSelector} from 'react-redux';
import {ItineraryProps} from '../../interfaces/itineraryProps';
import {COLORS} from '../../COLORS';
import {SafeAreaView} from 'react-native-safe-area-context';
import bbox from '@turf/bbox';
import {lineString as makeLineString} from '@turf/helpers';
import {
  ButtonBack,
  Container,
  DetailsContainer,
  InnerMarkerCircle,
  MapContainer,
  MarkerContainer,
} from './styles';
const {width, height} = Dimensions.get('window');
import BackSvg from '../../assets/svg/back.svg';
import {useNavigation} from '@react-navigation/core';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoicmljYXJkb3RoaWVzZW4iLCJhIjoiY2tyZ20zZmQyNjduYjJ2bW44emVudHc1MyJ9.jVil7RnJzjTVC6YU_RnokQ',
);

interface Coord {
  lat: string;
  lng: string;
}

const Maps = () => {
  const navigation = useNavigation();
  const itinerary: ItineraryProps = useSelector(
    (state: any) => state.itineraries,
  );
  const [shape, setShape] = React.useState<any>(null);
  const [bounds, setBounds] = React.useState<any>(null);

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

  useEffect(() => {
    // cameraRef.current?.fitBounds();
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
        console.log('setando bounds com ', bounds);
        setBounds(bounds);
        const middle = Math.floor(itinerary.coords.length / 2);

        //   featureCollection: Mapbox.geoUtils.addToFeatureCollection(
        //     this.state.featureCollection,
        //     Mapbox.geoUtils.makeFeature({ type: 'Point', coordinates: location }, { icon: iconImage, key: key }),
        // ),
      }
    }
  }, [itinerary]);

  return (
    <Container>
      <MapContainer>
        <ButtonBack onPress={handleReturn}>
          <BackSvg />
        </ButtonBack>
        <MapboxGL.MapView
          style={styles.map}
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
      <DetailsContainer></DetailsContainer>
    </Container>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  originCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 200,
  },
  destinationCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.neutralGray,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 200,
  },

  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.neutralBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.neutralGray,
  },
});
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
