import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {BackgroundImage, Button, ButtonLabel, Container} from './styles';

export default function Intro() {
  const navigation = useNavigation();
  return (
    <Container>
      <BackgroundImage source={require('../../assets/images/intro.png')} />
      {/* @ts-ignore */}
      <Button onPress={() => navigation.navigate('home')}>
        <ButtonLabel>Começar!</ButtonLabel>
      </Button>
    </Container>
  );
}
