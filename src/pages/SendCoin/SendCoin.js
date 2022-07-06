import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';

import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, SafeAreaView, ScrollView,
  Image, TouchableOpacity, TextInput, Dimensions
} from 'react-native';
import { scaleRatio, Images } from '../../helpers/index';
import colors from '../../config/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';

const { width, height } = Dimensions.get('window');

class SendCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      address: '',
      amount: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      showDetails: false,
      showQRScanner: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',

      }
    }
    if (nextProps.dashboard.getEmployeeHappinessSuccess) {
      return {
        ...nextProps,
        trackMessage: 'You can see getEmployeeHappinessSuccess here!'
      }
    } else {
      return {
        ...nextProps
      }
    }
  }

  onSuccess = e => {
    this.setState({ showQRScanner: false, address: e.data })
  };

  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }

  onGetOTP = () => {
    let data = {
      username: this.state.email
    }
    this.props.dispatch(userActions.userlogin(data, this.props));
  }

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        token: UserEmailToken,
        otp: this.state.otp
      }
      this.props.dispatch(userActions.validateOtp(data, this.props));
    }
  }

  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.navigationSave(this.props));

    const { navigation } = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      let { users } = this.props;

      let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": users ? "Bearer " + users.token : null
      });
      const requestOptions = {
        method: "POST",
        headers: header
      }
      fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.code === 3) {
            this.props.navigation.navigate("Login")
          }
        });
    });

    let { users } = this.props;

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": users ? "Bearer " + users.token : null
    });
    const requestOptions = {
      method: "POST",
      headers: header
    }
    fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.code === 3) {
          this.props.navigation.navigate("Login")
        }
      });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  sendFrom = (e) => {
    let { address, amount } = this.state;
    this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  sendFromWithOTP = (e) => {
    let { address, amount, otp } = this.state;
    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
}



  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { users } = this.props;
    let { address, amount } = this.state;

    return (

      <SafeAreaView >

        <View style={{ width: width, height: height - 55, backgroundColor: 'white', borderWidth: 1, borderColor: '#2DA4FE' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 5, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              {/* <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{}}>
                <Image source={require('../../Statics/img/Wallet/menu_white_png_icon.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity> */}
              <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flexDirection:'row' ,justifyContent:'center'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                  <Image source={require('../../Statics/img/ecomimg/sl.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain',marginTop:5 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'black', textShadowOffset: { width: 1, height: 1 },marginLeft:15 }}>Order</Text>
                </View>

                {/* <TouchableOpacity onPress={this.toggleModal}
                  style={{ height: 26, width: 26, backgroundColor: '#2DA4FE', borderRadius: 13, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                  <Text style={{ fontSize: 18, marginTop: -2, color: 'white', }}>+</Text>

                </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity>
                    <Image style={{ width: 25, height: 25, }} source={require("../../Statics/img/ecomimg/Search.png")} />
                  </TouchableOpacity><TouchableOpacity>
                    <Image style={{ height: 25, width: 25, marginLeft: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* <View style={{ height: 50, paddingHorizontal: 20, width: width - 5, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image source={require('../../Statics/img/ecomimg/sl.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 22, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Orders</Text>
              
              <TouchableOpacity>
              <Image style={{ width: 25, height: 25, margin: 10 }} source={require('../../Statics/img/ecomimg/Search.png')} />
            </TouchableOpacity><TouchableOpacity>
              <Image style={{ height: 25, width: 25, margin: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
            </TouchableOpacity>
            </View> */}

            <ScrollView>
              <>
                <View style={{ backgroundColor: 'white', marginTop: 2 }}>
                  <Text style={{ fontSize: 18, margin: 10, fontWeight: 'bold' }}>Your Order</Text>
                  <View style={{ flexDirection: 'row', margin: 10, borderRadius: 5, borderWidth: 3, borderColor: 'lightgray' }}>
                    <Image style={{ height: 30, width: 30, marginTop: 5, marginLeft: 10 }} source={require('../../Statics/img/ecomimg/Search1.png')} />
                    <TextInput placeholder='Search by Customer,product,or order ID'></TextInput>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 20 }}>
                    <TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'pink', backgroundColor: 'lightpink', width: 40, height: 30, padding: 5, paddingLeft: 10, color: '#FF69B4' }}>All</Text>
                    </TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Ordered</Text>
                    </TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Shipped</Text>
                    </TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Delivered</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 5, alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, paddingLeft: 10, padding: 2 }}>Cancelled</Text></TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Ordered</Text>
                    </TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 60, height: 30, padding: 5, paddingLeft: 10 }}>return</Text></TouchableOpacity><TouchableOpacity>
                    <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 60, height: 30, padding: 5, paddingLeft: 10 }}>Other</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                  <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>1st April</Text>
                </View>
                <View style={{ marginTop: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <Text>Order ID  480111962191</Text>
                  <Text style={{ marginLeft: 60 }}>Send to other </Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}> other </Text>

                </View>
                <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
                  <Text>Supplier</Text>
                  <Text style={{ marginLeft: 5 }}>:</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>hk traders</Text>
                </View>

                <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Image style={{ height: 50, width: 50, marginTop: 5, }} source={require('../../Statics/img/ecomimg/wallet1.png')} />
                  <View style={{ alignItems: 'center' }}>
                    <View>
                      <Text>Prepaid Order</Text>
                      <Text>Stylish Men's Brown Leather Wallet</Text>
                      <Text>Prepaid Order</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => this.gotoNextScreen('OrderHistory')}>
                  <Image style={{ height: 23, width: 23, marginTop: 5, marginLeft: 10, alignSelf: 'center' }} source={require('../../Statics/img/ecomimg/rightarrow.png')} /></TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 1 }}>
                  <Text style={{ marginTop: 15, margin: 10 }}>Rate Your experiance</Text>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                    <TouchableOpacity>
                      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={{ marginTop: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <Text>Order ID  480111962191</Text>
                  <Text style={{ marginLeft: 60 }}>Send to other </Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}> other </Text>

                </View>

                <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
                  <Text>Supplier</Text>
                  <Text style={{ marginLeft: 5 }}>:</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>KAMLESH ENTERPRIS SUB</Text>
                </View>

                <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 60 }}>
                  <Image style={{ height: 50, width: 50, marginTop: 5, }} source={require('../../Statics/img/ecomimg/wallet1.png')} />
                  <View style={{ alignItems: 'center' }}>
                    <View>
                      <Text>Prepaid Order</Text>
                      <Text>Stylish Men's Brown Leather Wallet</Text>
                      <Text>Prepaid Order</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                  <Image style={{ height: 23, width: 23, marginTop: 5, marginLeft: 10, alignSelf: 'center' }} source={require('../../Statics/img/ecomimg/rightarrow.png')} /></TouchableOpacity>
                </View>
              </>
            </ScrollView>







          </View>
        </View>

      </SafeAreaView>

    )
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
const styles = StyleSheet.create({
  screen: {

    backgroundColor: colors.light,
    padding: 6

  },
  itemContainer: {

    marginRight: 16,
    marginLeft: 6
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  }
});
export default connect(mapStateToProps)(SendCoin);
