import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {BusLineProps} from '../../interfaces/busLineProps';
import {MinibusLineProps} from '../../interfaces/minibusLineProps';
import {saveBusLines} from '../../redux/actions/busLinesActions';
import {saveItineraries} from '../../redux/actions/itinerariesActions';
import {saveMinibusLines} from '../../redux/actions/minibusLinesActions';
import {fetchBusLines} from '../../services/getBusLines';
import {fetchItineraries} from '../../services/getItineraries';
import {fetchMinibusLines} from '../../services/getMinibusLines';
import MapSvg from '../../assets/svg/map.svg';
import {
  CardImage,
  Container,
  InputContainer,
  InputLabel,
  LineCard,
  LineCardImageContainer,
  LineCardText,
  LineCardTextContainer,
  MapButton,
  MapButtonContainer,
  NestedText,
  StyledInput,
  TabButton,
  TabButtonContainer,
  TabContainer,
  TabImage,
  TabText,
} from './styles';
import {COLORS} from '../../COLORS';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [isBusTabActive, setBusTabActive] = React.useState(false);
  const [isMinibusTabActive, setMinibusTabActive] = React.useState(false);
  const [isGeralTabActive, setGeralTabActive] = React.useState(true);

  const [searchValue, setSearchValue] = React.useState<string>('');

  const [mergedLines, setMergedLines] = React.useState<BusLineProps[]>([]);
  const [filteredBusLines, setFilteredBusLines] = React.useState<
    BusLineProps[]
  >([]);
  const [filteredMinibusLines, setFilteredMinibusLines] = React.useState<
    BusLineProps[]
  >([]);
  const [filteredMergedLines, setFilteredMergedLines] = React.useState<
    BusLineProps[]
  >([]);
  const {busLines, minibusLines} = useSelector((state: any) => state);

  const getBusLines = async () => {
    const busLinesResponse = await fetchBusLines();
    if (busLinesResponse) {
      dispatch(saveBusLines(busLinesResponse));
    } else {
      Alert.alert('Erro', 'Não foi possível carregar as linhas de ônibus.');
    }
  };

  const getMinibusLines = async () => {
    const minibusLinesResponse = await fetchMinibusLines();
    if (minibusLinesResponse) {
      dispatch(saveMinibusLines(minibusLinesResponse));
    } else {
      Alert.alert('Erro', 'Não foi possível carregar as linhas de lotação.');
    }
  };

  const getItineraries = async (id: string) => {
    const itineraries = await fetchItineraries(id);
    return itineraries;
  };

  const handleFetchItinerary = async (id: string) => {
    getItineraries(id).then(itineraries => {
      if (itineraries) {
        dispatch(saveItineraries(itineraries));
        //@ts-ignore
        navigation.navigate('maps');
      } else {
        Alert.alert('Erro', 'Não foi possível carregar o itinerário.');
      }
    });
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

  const handleSearch = () => {
    const filteredBusLines = busLines.filter(
      (busLine: BusLineProps) =>
        busLine.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
        busLine.codigo.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const filteredMinibusLines = minibusLines.filter(
      (minibusLine: BusLineProps) =>
        minibusLine.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
        minibusLine.codigo.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredBusLines(filteredBusLines);
    setFilteredMinibusLines(filteredMinibusLines);
    setFilteredMergedLines([...filteredBusLines, ...filteredMinibusLines]);
  };

  const renderLine = (line: BusLineProps | MinibusLineProps, index: number) => (
    <>
      <LineCard>
        <LineCardImageContainer>
          {line.id.length > 3 ? (
            <CardImage source={require('../../assets/images/bus.png')} />
          ) : (
            <CardImage source={require('../../assets/images/minibus.png')} />
          )}
        </LineCardImageContainer>
        <LineCardTextContainer>
          <LineCardText>
            <NestedText>Linha: </NestedText>
            {line.nome}
          </LineCardText>
          <LineCardText>
            <NestedText>Código: </NestedText>
            {line.codigo}
          </LineCardText>
        </LineCardTextContainer>
        <MapButtonContainer>
          <MapButton onPress={() => handleFetchItinerary(line.id)}>
            <MapSvg style={{transform: [{scale: 0.65}]}} />
            <LineCardText fontSize="13px" color={COLORS.primary}>
              <NestedText>Itinerário</NestedText>
            </LineCardText>
          </MapButton>
        </MapButtonContainer>
      </LineCard>
    </>
  );

  const initiateRequestTimer = () => {
    setTimeout(() => {
      if (loading) {
        Alert.alert(
          'Está demorando...',
          'O servidor está demorando muito para responder. Aguarde...',
        );
      }
    }, 5000);
  };

  useEffect(() => {
    setLoading(true);
    getBusLines();
    getMinibusLines();
    initiateRequestTimer();
  }, []);

  useEffect(() => {
    if (busLines && minibusLines) {
      if (busLines.length > 0 && minibusLines.length > 0) {
        setMergedLines(minibusLines.concat(busLines));
        setFilteredMergedLines(minibusLines.concat(busLines));
        setFilteredBusLines(busLines);
        setFilteredMinibusLines(minibusLines);
        setLoading(false);
      }
    }
  }, [busLines, minibusLines]);

  useEffect(() => {
    if (searchValue.length > 0) {
      handleSearch();
    } else {
      setFilteredBusLines(busLines);
      setFilteredMinibusLines(minibusLines);
      setFilteredMergedLines(mergedLines);
    }
  }, [searchValue]);

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

        <InputContainer>
          <InputLabel>
            {isGeralTabActive
              ? 'Buscar linha de transporte'
              : isBusTabActive
              ? 'Buscar linha de ônibus'
              : 'Buscar linha de lotação'}
          </InputLabel>
          <StyledInput
            placeholder={'Digite o nome ou o código da linha'}
            onChange={e => setSearchValue(e.nativeEvent.text)}
          />
        </InputContainer>

        {loading && (
          <ActivityIndicator
            style={{marginTop: 50}}
            size={100}
            color={COLORS.primary}
          />
        )}

        {isMinibusTabActive && (
          <FlatList
            data={filteredMinibusLines}
            renderItem={({item, index}) => renderLine(item, index)}
            keyExtractor={item => item.id}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews
          />
        )}
        {isBusTabActive && (
          <FlatList
            data={filteredBusLines}
            renderItem={({item, index}) => renderLine(item, index)}
            keyExtractor={item => item.id}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews
          />
        )}
        {isGeralTabActive && (
          <FlatList
            data={filteredMergedLines}
            renderItem={({item, index}) => renderLine(item, index)}
            keyExtractor={item => item.id}
            initialNumToRender={30}
            maxToRenderPerBatch={10}
            removeClippedSubviews
          />
        )}
      </Container>
    </SafeAreaView>
  );
}
