import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {ActivityIndicator, Alert, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import MapSvg from '../../assets/svg/map.svg';
import {COLORS} from '../../COLORS';
import {BusLineProps} from '../../interfaces/busLineProps';
import {MinibusLineProps} from '../../interfaces/minibusLineProps';
import {saveBusLines} from '../../redux/actions/busLinesActions';
import {saveItineraries} from '../../redux/actions/itinerariesActions';
import {saveMinibusLines} from '../../redux/actions/minibusLinesActions';
import {fetchBusLines} from '../../services/getBusLines';
import {fetchItineraries} from '../../services/getItineraries';
import {fetchMinibusLines} from '../../services/getMinibusLines';
import {
  CardImage,
  Container,
  InputContainer,
  InputLabel,
  LineCard,
  LineCardImageContainer,
  LineCardText,
  LineCardTextContainer,
  LoadingIndicator,
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
      Alert.alert('Erro', 'N??o foi poss??vel carregar as linhas de ??nibus.');
    }
  };

  const getMinibusLines = async () => {
    const minibusLinesResponse = await fetchMinibusLines();
    if (minibusLinesResponse) {
      dispatch(saveMinibusLines(minibusLinesResponse));
    } else {
      Alert.alert('Erro', 'N??o foi poss??vel carregar as linhas de lota????o.');
    }
  };

  const getItineraries = async (id: string) => {
    const itineraries = await fetchItineraries(id);
    return itineraries;
  };

  const handleFetchItinerary = async (id: string) => {
    setLoading(true);
    initiateRequestTimer();
    getItineraries(id).then(itineraries => {
      if (itineraries) {
        dispatch(saveItineraries(itineraries));
        //@ts-ignore
        navigation.navigate('maps');
        setLoading(false);
      } else {
        Alert.alert('Erro', 'N??o foi poss??vel carregar o itiner??rio.');
        setLoading(false);
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

  const renderLine = (line: BusLineProps | MinibusLineProps) => (
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
            <NestedText>C??digo: </NestedText>
            {line.codigo}
          </LineCardText>
        </LineCardTextContainer>
        <MapButtonContainer>
          <MapButton onPress={() => handleFetchItinerary(line.id)}>
            <MapSvg style={{transform: [{scale: 0.65}]}} />
            <LineCardText fontSize="13px" color={COLORS.primary}>
              <NestedText>Itiner??rio</NestedText>
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
          'Est?? demorando...',
          'O servidor est?? demorando muito para responder. Aguarde...',
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
            <TabText isActive={isBusTabActive}>??nibus</TabText>
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
            <TabText isActive={isMinibusTabActive}>Lota????o</TabText>
          </TabButtonContainer>
        </TabContainer>

        <InputContainer>
          <InputLabel>
            {isGeralTabActive
              ? 'Buscar linha de transporte'
              : isBusTabActive
              ? 'Buscar linha de ??nibus'
              : 'Buscar linha de lota????o'}
          </InputLabel>
          <StyledInput
            placeholderTextColor={'#999'}
            placeholder={'Digite o nome ou o c??digo da linha'}
            onChange={e => setSearchValue(e.nativeEvent.text)}
          />
        </InputContainer>

        {loading && <LoadingIndicator size={100} color={COLORS.primary} />}

        {isMinibusTabActive &&
          (filteredMinibusLines.length > 0 ? (
            <FlatList
              data={filteredMinibusLines}
              renderItem={({item}) => renderLine(item)}
              keyExtractor={item => item.id}
              maxToRenderPerBatch={10}
              initialNumToRender={10}
              removeClippedSubviews
            />
          ) : (
            !loading && (
              <LineCardText>Nenhum resultado para '{searchValue}'</LineCardText>
            )
          ))}

        {isBusTabActive &&
          (filteredBusLines.length > 0 ? (
            <FlatList
              data={filteredBusLines}
              renderItem={({item}) => renderLine(item)}
              keyExtractor={item => item.id}
              maxToRenderPerBatch={10}
              initialNumToRender={10}
              removeClippedSubviews
            />
          ) : (
            !loading && (
              <LineCardText>Nenhum resultado para '{searchValue}'</LineCardText>
            )
          ))}
        {isGeralTabActive &&
          (filteredMergedLines.length > 0 ? (
            <FlatList
              data={filteredMergedLines}
              renderItem={({item}) => renderLine(item)}
              keyExtractor={item => item.id}
              initialNumToRender={30}
              maxToRenderPerBatch={10}
              removeClippedSubviews
            />
          ) : (
            !loading && (
              <LineCardText>Nenhum resultado para '{searchValue}'</LineCardText>
            )
          ))}
      </Container>
    </SafeAreaView>
  );
}
