import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';

const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {/* <Screen name="orderProducts" component={orderProducts} /> */}
    </Navigator>
  );
};

export default AppStack;
