import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import Home from '../screens/Home';
import Maps from '../screens/Map';

const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="maps" component={Maps} />
    </Navigator>
  );
};

export default AppStack;
