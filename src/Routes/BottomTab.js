import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert } from 'react-native';

import Home from '../pages/Home/Home';
import Order from '../pages/Order/Order';
import ReceiveCoin from '../pages/ReceiveCoin/ReceiveCoin';
import Account from '../pages/Account/Account';
import Product from '../pages/Product/Product';

import PINCode, {
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";


const Tab = createBottomTabNavigator();

const BottomTab = (props) => {
  function handlePick() {
    Alert.alert(
      "Comfirmation!",
      "Are you sure, Do want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            props.navigation.navigate("Login");
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
            await AsyncStorage.removeItem('UserData');
            await deleteUserPinCode();
            await resetPinCodeInternalStates();
          }
        }
      ]
    )
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconLink;
          let Label;

          if (route.name === 'Home') {
            Label = 'Home'
            iconLink = focused
              ? require('../Statics/img/Home/home_black.png')
              : require('../Statics/img/Home/home_grey.png');

          }

          else if (route.name === 'Products') {
            Label = 'Products'
            iconLink = focused
              ? require('../Statics/img/Home/product_black.png')
              : require('../Statics/img/Home/product_white.png');
          }

          else if (route.name === 'Orders') {
            Label = 'Orders'
            iconLink = focused
              ? require('../Statics/img/Home/Shopping_black.png')
              : require('../Statics/img/Home/Shopping_white.png');
          }

          else if (route.name === 'Account') {
            Label = 'Account'
            iconLink = focused
              ? require('../Statics/img/Home/contact_black.png')
              : require('../Statics/img/Home/contact_grey.png');
          }

          // You can return any component that you like here!
          return (
            <>
              <Image style={{
                width: 30,
                height: 30,
                margin: 3
              }} source={iconLink} />
            </>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          backgroundColor: '#fff'

        },
      }}

    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={Product} />
      <Tab.Screen name="Orders" component={Order} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default (BottomTab);
