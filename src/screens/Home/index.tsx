import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {BusLineProps} from '../../interfaces/busLineProps';
import {saveBusLines} from '../../redux/actions/busLinesActions';
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
  const [isBusTabActive, setBusTabActive] = React.useState(false);
  const [isMinibusTabActive, setMinibusTabActive] = React.useState(false);
  const [isGeralTabActive, setGeralTabActive] = React.useState(true);
  const busLines: BusLineProps[] = useSelector((state: any) => state.busLines);

  const getBusLines = async () => {
    const busLines: BusLineProps[] | null = await fetchBusLines();
    return busLines;
  };

  const getMinibusLines = async () => {
    const minibusLines = await fetchMinibusLines();
    return minibusLines;
  };
  const getItineraries = async (id: string) => {
    console.log('id', id);
    const itineraries = await fetchItineraries(id);
    return itineraries;
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
              left
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
              left
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
              right
              onPress={() => selectTab('minibus')}>
              <TabImage
                isActive={isMinibusTabActive}
                source={require('../../assets/images/minibus.png')}
              />
            </TabButton>
            <TabText isActive={isMinibusTabActive}>Lotação</TabText>
          </TabButtonContainer>
        </TabContainer>
      </Container>
    </SafeAreaView>
  );
}
