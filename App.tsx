/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import AppStack from './src/navigations/appStack';
import {saveBusLines} from './src/redux/actions/busLinesActions';
import store from './src/redux/store/store';
import {fetchBusLines} from './src/services/getBusLines';

// const getBusLines = async () => {
//   const busLines = await fetchBusLines();
//   console.log(busLines);
//   return busLines;
// };

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
