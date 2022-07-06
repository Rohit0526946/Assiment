import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';

import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, SafeAreaView,
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

        <View style={{ width: width, height: height - 55, backgroundColor: '#233446', borderWidth: 1, borderColor: '#2DA4FE' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 12, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image source={require('../../Statics/img/Profile/back-arrow.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 22, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Send  Coin</Text>
            </View>

            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ fontSize: 22, marginTop: 20, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Send</Text>
            </View>

            <View style={{ backgroundColor: '#18222C', width: width - 50, borderRadius: 12, marginHorizontal: 19, elevation: 8, borderWidth: 1, borderColor: '#2DA4FE', marginTop: 25 }}>
              <View style={{ borderRadius: 11,  justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ marginHorizontal: 18, width: '100%', marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 10, marginLeft: 15, textShadowRadius: 1, color: 'white', textShadowColor: 'white' }}>Send Coin</Text>
                </View>

                {users && !users.sendCoinTXOTPSuccess ?
                  <>
                    <View style={{ marginHorizontal: 18, width: '100%' }}>
                      <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, textAlign: 'left', marginLeft: 10, textShadowRadius: 1, color: 'white', textShadowColor: 'white' }}>To</Text>
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 5 }} onPress={() => this.setState({ showQRScanner: true })}>
                          <Image style={{ width: 20, height: 20, }} source={require('../../Statics/img/Wallet/qr-code.png')} />
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Address"
                          name="address"
                          selectTextOnFocus={true}
                          onChangeText={(text) => this.handleLoginInput("address", text)}
                          value={address}
                        />
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Amount"
                          name="amount"
                          onChangeText={(text) => this.handleLoginInput("amount", text)}
                          value={amount}
                        />
                      </View>
                      <View style={{ borderWidth: 1, borderColor: '#2DA4FE', borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>
                        <View style={{ backgroundColor: '#2DA4FE', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE' }}>

                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.sendFrom()}>
                            <Text style={{ fontSize: 17, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> SEND </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                  :
                  <>
                    <Text style={{ padding: 19, fontSize: 22, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Send Coin Verification</Text>

                    <View style={{ height: 45, width: width - 100, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        name="otp"
                        placeholder="Enter otp"
                        onChangeText={(text) => this.handleLoginInput("otp", text)}
                        value={this.state.otp}
                      />
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#131313', width: width - 100, borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>
                      <View
                        style={{ backgroundColor: '#FFD218', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C79323' }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.sendFromWithOTP()}>

                          <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15,
                            textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'

                          }}>VERIFY AND PROCEED</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>}
              </View>
            </View>
          </View>
        </View>
        {this.state.showQRScanner == true ?
          <View style={{ flex: 1, height: height, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', position: 'absolute' }}>
            <QRCodeScanner
              onRead={this.onSuccess}
              topContent={
                <TouchableOpacity onPress={() => this.setState({ showQRScanner: false })}>
                  <Text style={{ fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
              }

            />
          </View> : <View />
        }
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
