import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './appStack';

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
