import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import Home from '../screens/Home';

const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
    </Navigator>
  );
};

export default AppStack;
