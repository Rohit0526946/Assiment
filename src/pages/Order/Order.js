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

class Order extends Component {
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

    
<View></View>
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
export default connect(mapStateToProps)(Order);
