/*Example of RealM Database in React Native*/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../pages/Splash';
import initialSelectionscreen from '../pages/initialSelectionscreen';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Forgot from '../pages/Forgot/Forgot';
import BottomTab from './BottomTab';
import Sidebar from './Sidebar';
import Profile from '../pages/Profile/Profile';
import ContactUs from '../pages/ContactUs/ContactUs';
import MyCart from '../pages/MyCart/MyCart';

import ReceiveCoin from '../pages/ReceiveCoin/ReceiveCoin';
import Order from '../pages/Order/Order';
import Account from '../pages/Account/Account';
import Home from '../pages/Home/Home';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Payment from '../pages/Payment/Payment';
import DeliveryAddress from '../pages/DeliveryAddress/DeliveryAddress';

import { dashboardActions } from '../_actions';

import PINCode, {
  hasUserSetPinCode,
} from "@haskkor/react-native-pincode";
import Support from '../pages/Support/Support';
import Product from '../pages/Product/Product';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import Addnew from '../pages/Addnew/Addnew';

const RouteStack = createStackNavigator();

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userData: '',
      isLoading: true,
      showPinLock: false,
      PINCodeStatus: "enter",
    }
  }

  async componentDidMount() {
    this._showEnterPinLock()
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1000);
  }



  _showEnterPinLock = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      this.setState({ PINCodeStatus: "enter", showPinLock: true });
    } else {

    }
  };

  _finishProcess = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {

      this.setState({ showPinLock: false });
    }
  };

  render() {

    let { users } = this.props;
    let { token } = users;
    let { isLoading } = this.state;

    let isLoggedIn = false;

    if (token) {
      isLoggedIn = false
    }

    return (
      <>{isLoading ?
        <>
          <Splash />
        </>
        :

        <SafeAreaProvider>
          <NavigationContainer>
            {!isLoggedIn ?
              // <RouteStack.Navigator headerMode='none' initialRouteName="SelectionScreen">
              //   <RouteStack.Screen name='SelectionScreen' component={Home} />
              //   <RouteStack.Screen name="Login" component={Login} />
              //   <RouteStack.Screen name="Register" component={Register} />
              //   <RouteStack.Screen name="Forgot" component={Forgot} />
              //   <RouteStack.Screen name="BottomTab" component={BottomTab} />
              //   <RouteStack.Screen name="Home" component={Sidebar} />
              //   <RouteStack.Screen name="Profile" component={Profile} />
              //   <RouteStack.Screen name="ContactUs" component={ContactUs} />
              //   <RouteStack.Screen name="MyCart" component={MyCart} />
              //   <RouteStack.Screen name="DeliveryAddress" component={DeliveryAddress} />


              //   <RouteStack.Screen name="Support" component={Support} />
              //   <RouteStack.Screen name="Product" component={Product} />
              //   <RouteStack.Screen name="OrderHistory" component={OrderHistory} />
              //   <RouteStack.Screen name="ProductDetails" component={ProductDetails} />
              //   <RouteStack.Screen name="Payment" component={Payment} />

              // </RouteStack.Navigator>

              <RouteStack.Navigator headerMode='none' initialRouteName='Home'>
              <RouteStack.Screen name='SelectionScreen' component={initialSelectionscreen} />
              <RouteStack.Screen name="BottomTab" component={BottomTab} />
              <RouteStack.Screen name="Home" component={Sidebar} />
              <RouteStack.Screen name="Profile" component={Profile} />
              <RouteStack.Screen name="MyCart" component={MyCart} />
              <RouteStack.Screen name="Payment" component={Payment} />
              <RouteStack.Screen name="ContactUs" component={ContactUs} />

              <RouteStack.Screen name="Support" component={Support} />
              <RouteStack.Screen name="ProductDetails" component={ProductDetails} />

              <RouteStack.Screen name="DeliveryAddress" component={DeliveryAddress} />
              <RouteStack.Screen name="OrderHistory" component={OrderHistory} />

              <RouteStack.Screen name="Product" component={Product} />
              <RouteStack.Screen name="Order" component={Order} />
              <RouteStack.Screen name="ReceiveCoin" component={ReceiveCoin} />

              <RouteStack.Screen name="Account" component={Account} />
              <RouteStack.Screen name="Login" component={Login} />
              <RouteStack.Screen name="Register" component={Register} />
              <RouteStack.Screen name="Forgot" component={Forgot} />
          
            </RouteStack.Navigator>

           

              :
              <RouteStack.Navigator headerMode='none' initialRouteName='Home'>
                <RouteStack.Screen name='SelectionScreen' component={initialSelectionscreen} />
                <RouteStack.Screen name="BottomTab" component={BottomTab} />
                <RouteStack.Screen name="Home" component={Sidebar} />
                <RouteStack.Screen name="Profile" component={Profile} />
                <RouteStack.Screen name="MyCart" component={MyCart} />
                <RouteStack.Screen name="Payment" component={Payment} />
                <RouteStack.Screen name="ContactUs" component={ContactUs} />

                <RouteStack.Screen name="Support" component={Support} />
                <RouteStack.Screen name="ProductDetails" component={ProductDetails} />

                <RouteStack.Screen name="DeliveryAddress" component={DeliveryAddress} />
                <RouteStack.Screen name="OrderHistory" component={OrderHistory} />

                <RouteStack.Screen name="Product" component={Product} />
                <RouteStack.Screen name="Order" component={Order} />
                <RouteStack.Screen name="ReceiveCoin" component={ReceiveCoin} />

                <RouteStack.Screen name="Account" component={Account} />
                <RouteStack.Screen name="Login" component={Login} />
                <RouteStack.Screen name="Register" component={Register} />
                <RouteStack.Screen name="Forgot" component={Forgot} />
                <RouteStack.Screen name="Addnew" component={Addnew} />
              </RouteStack.Navigator>
            }
          </NavigationContainer>
        </SafeAreaProvider>
      }
        {this.state.showPinLock && (
          <View style={{ height: '100%', width: '100%', backgroundColor: 'white', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <PINCode
              status={this.state.PINCodeStatus}
              touchIDDisabled={true}
              finishProcess={() => this._finishProcess()}
            />
          </View>
        )}
      </>
    );
  }
}


function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(Routes);