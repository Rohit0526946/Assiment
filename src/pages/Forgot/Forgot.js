import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {
  View, Text, Dimensions, TouchableOpacity, ImageBackground, TextInput,Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')


class Forgot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: ''
    }
  }
  static getDerivedStateFromProps(nextProps) {

    if (nextProps.users.UserLoginFailure) {
      return {
        ...nextProps,
        failureMSG: 'Please enter valid username!'

      }
    }
    if (nextProps.users.UserLoginOTPFailure) {
      return {
        ...nextProps,
        failureOTPMSG: 'Invalid OTP or expired!'

      }
    }
    if (nextProps.users.UserLoginEmailSuccess) {
      return {
        ...nextProps,
        showLogin: false

      }
    }
    else {
      return {
        ...nextProps
      }
    }

  }
  async componentDidMount() {
    await AsyncStorage.removeItem('UserData');
  }
  handleLoginInput = (text) => {
    this.setState({ email: text })
  }
  handleLoginInputPassword = (text) => {
    this.setState({ password: text })
  }

  submitLogin = () => {
    let data = {
      email: this.state.email,
    }
    this.props.dispatch(userActions.forgotPassword(data, this.props));
  }

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        email: this.state.email,
        password: this.state.password,
        otp: this.state.otp
      }

      this.props.dispatch(userActions.validateOtp(data, this.props));
    }
  }



  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }
  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }
  render() {
    let { email, password, failureMSG } = this.state;

    return (
      <View>
      <View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
  <Image style={{marginLeft:20}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/1w.png')} />

  <Image style={{marginLeft:112}}source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/2ndh.png')} />
    <Image
          style={{marginLeft:100}}
         
         source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/3rdf.png')} />

  </View>



      </View>
    )
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(Forgot);