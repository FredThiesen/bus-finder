import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import Home from '../screens/Home';
import Intro from '../screens/Intro';
import Maps from '../screens/Map';

const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="intro" component={Intro} />
      <Screen name="home" component={Home} />
      <Screen name="maps" component={Maps} />
    </Navigator>
  );
};

export default AppStack;
