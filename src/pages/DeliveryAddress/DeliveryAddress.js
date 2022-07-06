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
import { ceil } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
class DeliveryAddress extends Component {
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
    // this.props.dispatch(userActions.userlogin(data, this.props));
  }

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        token: UserEmailToken,         
        otp: this.state.otp
      }
      // this.props.dispatch(userActions.validateOtp(data, this.props));
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
    // this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }



  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    // this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
}

  render() {
    let { dashboard } = this.props;
    // let { address, amount, failureMSG } = this.state;
    let { clientProfile } = dashboard;
    // let { transaction } = clientProfile ? clientProfile : {};



    return (

      <SafeAreaView >


        <View style={{ backgroundColor: 'lightgray' }}>


          <View style={{ paddingVertical: 12, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
              <Image source={require('../../Statics/img/comImg2/leftarrow.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'lightgray' }}>Delivery Address</Text>
          </View>

          <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 7 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}>
              <Image source={require('../../Statics/img/comImg2/ok.png')} />
              <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: '#45b6fe' }}></View>
              <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: '#45b6fe' }}>
                <Text style={{ color: '#45b6fe', }}>2</Text>
              </View>
              <View style={{ borderBottomWidth: 1, width: 73, borderBottomColor: 'lightgray' }}></View>
              <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                <Text style={{ color: 'lightgray', }}>3</Text>
              </View>
              <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: 'lightgray' }}></View>
              <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                <Text style={{ color: 'lightgray', }}>4</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 30 }}>
              <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 0 }}>Cart</Text>
              <Text style={{ fontSize: 14, paddingLeft: 50 }}>Address</Text>
              <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 40 }}>Payment</Text>
              <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 35 }}>Summary</Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 10, paddingLeft: 16 }}>
            <TouchableOpacity>
              <Text style={{ color: '#FF69B4', fontSize: 14, fontWeight: 'bold' }}> + ADD NEW ADDRESS</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#e3ecf5', marginTop: 1, paddingVertical: 10 }}>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 18 }}>Rohit Kumar</Text>
                <Image style={{}} source={require('../../Statics/img/comImg2/pinkeclips.png')} />
              </View>
              <View>
                <Text style={{ fontSize: 14, paddingTop: 10 }}> Flat no-15, Raj Niwas Noida sector 62,</Text>
                <Text style={{ fontSize: 14, paddingTop: 1 }}> Near metro station U.P.  201308</Text>
                <Text style={{ fontSize: 14, paddingTop: 8 }}> +918436759588</Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 13, paddingTop: 10, color: '#FF69B4', fontWeight: 'bold' }}> EDIT</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => this.gotoNextScreen('Payment')}>
                <View style={{ backgroundColor: '#FF69B4', marginTop: 17, paddingTop: 14, padding: 14, borderRadius: 6, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Deliver to this Address</Text>
                </View>
              </TouchableOpacity>
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
export default connect(mapStateToProps)(DeliveryAddress);
