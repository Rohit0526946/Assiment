import React, { useState, useEffect } from 'react';
import { Root } from "native-base";
import { store } from './src/_helpers/store';
import { Provider } from 'react-redux';
import Routes from './src/Routes/Routes';
import { PersistGate } from "redux-persist/lib/integration/react";

import { SafeAreaView, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';


//Import external files
// import AsyncStorage from '@react-native-community/async-storage';

//Import external files
// import Splash from '../pages/Splash';
// import Intro1 from './src/pages/IntroScreens/Intro1';
// import Login from './src/pages/Login/Login';
// import Welcome from './src/pages/Welcome/Welcome';
// import FirstSurvey from './src/pages/Survey/FirstSurvey';


// import { RouteStackNavigation, AuthStackNavigation, Loading } from './Routes/Routes';


// const RouteStack = createStackNavigator();
// const Drawer = createDrawerNavigator();


function App() {

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Root>
        <Routes />
      </Root>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;