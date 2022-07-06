import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions, } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, SafeAreaView,
  Image, TouchableOpacity, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-generator'

const { width, height } = Dimensions.get('window');
class ReceiveCoin extends Component {
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
      showQRScanner: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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

    const options = {
      url: CONST.BACKEND_URL + `/overView`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": users ? "Bearer " + users.token : null
      }
    };

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
    let { dashboard } = this.props;
    // let { address, amount, failureMSG } = this.state;
    let { clientProfile } = dashboard;
    // let { transaction } = clientProfile ? clientProfile : {};



    return (

      <SafeAreaView >


        <View style={{ width: width, height: height - 55, backgroundColor: '#233446', borderWidth: 1, borderColor: '#2DA4FE' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 12, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image source={require('../../Statics/img/Profile/back-arrow.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'lightgray' }}>Receive Coin</Text>
            </View>

            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ fontSize: 22, marginTop: 20, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'lightgray' }}>Receive</Text>
            </View>

            <View style={{ backgroundColor: '#18222C', width: width - 50, borderRadius: 12, marginHorizontal: 19, elevation: 8, borderWidth: 1, borderColor: '#2DA4FE', marginTop: 25 }}>
              <View style={{ borderRadius: 11,  justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginHorizontal: 18, width: '100%', marginBottom: 20 }}>
                  <Text style={{ color: 'white', fontSize: 14, textAlign: 'left', marginTop: 10, marginLeft: 15, textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'white' }}>Address QR Code</Text>
                </View>

                <QRCode
                  value={clientProfile ? clientProfile.address : "NA"}
                  size={220}
                  bgColor='white'
                  fgColor='black' />

                <Text numberOfLines={1}
                  style={{
                    marginTop: 20,
                    fontSize: scaleRatio(2.1),
                    fontWeight: '600',
                    width: '80%',
                    textAlign: 'center',
                    color: 'white',
                  }}>{clientProfile ? clientProfile.address : "NA"}</Text>

                <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, width: width - 80, marginHorizontal: 20, marginBottom: 30, marginTop: 30, elevation: 8 }}>
                  <View
                    style={{ backgroundColor: '#2DA4FE', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE' }}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.copyClipBoard(clientProfile ? clientProfile.address : "NA")}>



                      <Text style={{
                        // marginTop: 13,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                        textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'lightgray'

                      }}>Copy</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>

            </View>
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
export default connect(mapStateToProps)(ReceiveCoin);
