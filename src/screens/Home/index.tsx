import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {BusLineProps} from '../../interfaces/busLineProps';
import {saveBusLines} from '../../redux/actions/busLinesActions';
import {saveItineraries} from '../../redux/actions/itinerariesActions';
import {fetchBusLines} from '../../services/getBusLines';
import {fetchItineraries} from '../../services/getItineraries';
import {fetchMinibusLines} from '../../services/getMinibusLines';
import {
  Container,
  TabButton,
  TabButtonContainer,
  TabContainer,
  TabImage,
  TabText,
} from './styles';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isBusTabActive, setBusTabActive] = React.useState(false);
  const [isMinibusTabActive, setMinibusTabActive] = React.useState(false);
  const [isGeralTabActive, setGeralTabActive] = React.useState(true);
  const busLines: BusLineProps[] = useSelector((state: any) => state.busLines);

  const getBusLines = async () => {
    const busLinesResponse: BusLineProps[] | null = await fetchBusLines();
    return busLinesResponse;
  };

  const getMinibusLines = async () => {
    const minibusLinesResponse = await fetchMinibusLines();
    return minibusLinesResponse;
  };

  const getItineraries = async (id: string) => {
    console.log('id', id);
    const itineraries = await fetchItineraries(id);
    return itineraries;
  };

  const handleFetchItinerary = async () => {
    getItineraries('80').then(itineraries => {
      if (itineraries) {
        dispatch(saveItineraries(itineraries));
      }
    });
    //@ts-ignore
    navigation.navigate('maps');
  };

  const selectTab = (tab: string) => {
    switch (tab) {
      case 'bus':
        setBusTabActive(true);
        setMinibusTabActive(false);
        setGeralTabActive(false);
        break;
      case 'minibus':
        setBusTabActive(false);
        setMinibusTabActive(true);
        setGeralTabActive(false);
        break;
      case 'geral':
        setBusTabActive(false);
        setMinibusTabActive(false);
        setGeralTabActive(true);
        break;
    }
  };

  useEffect(() => {
    getBusLines().then(busLines => {
      if (busLines) {
        dispatch(saveBusLines(busLines));
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as linhas de ônibus.');
      }
    });

    getMinibusLines().then(minibusLines => {
      if (minibusLines) {
        dispatch(saveBusLines(minibusLines));
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as linhas de lotação.');
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <TabContainer>
          <TabButtonContainer>
            <TabButton
              isActive={isGeralTabActive}
              onPress={() => selectTab('geral')}>
              <TabImage
                isActive={isGeralTabActive}
                source={require('../../assets/images/all.png')}
              />
            </TabButton>
            <TabText isActive={isGeralTabActive}>Todos</TabText>
          </TabButtonContainer>
          <TabButtonContainer>
            <TabButton
              isActive={isBusTabActive}
              onPress={() => selectTab('bus')}>
              <TabImage
                isActive={isBusTabActive}
                source={require('../../assets/images/bus.png')}
              />
            </TabButton>
            <TabText isActive={isBusTabActive}>Ônibus</TabText>
          </TabButtonContainer>
          <TabButtonContainer>
            <TabButton
              isActive={isMinibusTabActive}
              onPress={() => selectTab('minibus')}>
              <TabImage
                isActive={isMinibusTabActive}
                source={require('../../assets/images/minibus.png')}
              />
            </TabButton>
            <TabText isActive={isMinibusTabActive}>Lotação</TabText>
          </TabButtonContainer>
        </TabContainer>
        <TouchableOpacity
          //@ts-ignore
          onPress={handleFetchItinerary}
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#ccc',
          }}>
          <Text>Ver itinerário</Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
}
