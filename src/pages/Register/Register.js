import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import {
  View, Text, Dimensions, TouchableOpacity, ImageBackground, TextInput, TouchableNativeFeedbackComponent,Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: ''
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

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
  handleNameInput = (text) => {
    this.setState({ name: text })
  }
  handleNumberInput = (text) => {
    this.setState({ mobile: text })
  }
  handleLoginInput = (text) => {
    this.setState({ email: text })
  }
  handleLoginInputPassword = (text) => {
    this.setState({ password: text })
  }
  handleLoginconfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
  }

  submitLogin = () => {
    let data = {
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword

    }
    this.props.dispatch(userActions.register(data, this.props));
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
    let { email, password, name, mobile, confirmPassword } = this.state;

    return (

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{}} >

          <View style={{ marginTop: 25, alignItems: 'center' }}>
          <Image style={{ height: 60, width: 60 }} source={require('../../Statics/img/Splash/logo1.png')} />
            <Text style={{ fontSize: 27, fontWeight: 'bold' }}> SIGN UP </Text>
          </View>

          <View style={{ alignItems: 'center', position: 'absolute', marginTop: height / 2 - 200, marginHorizontal: 20 }}>
            {this.state.showLogin ?
              <>
                <View style={{ justifyContent: 'space-between', height: height - (height / 2 - 200), paddingBottom: 10 }}>
                  <View style={{ backgroundColor: '#fff', width: width - 40, borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }}>
                    <View style={{ borderRadius: 10, }}>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Name"
                          name="Name"
                          // secureTextEntry={true}
                          onChangeText={(text) => this.handleNameInput(text)}
                          value={name}
                        />
                      </View>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#F6F6F6', marginTop: 25, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Mobile"
                          name="Mobile"
                          onChangeText={(text) => this.handleNumberInput(text)}
                          value={mobile}
                        />
                      </View>

                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Email"
                          name="Email"
                          // secureTextEntry={true}
                          onChangeText={(text) => this.handleLoginInput(text)}
                          value={email} />
                      </View>

                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Password"
                          name="Password"
                          secureTextEntry={true}
                          onChangeText={(text) => this.handleLoginInputPassword(text)}
                          value={password}
                        />
                      </View>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Confirm password"
                          name="Confirmpassword"
                          secureTextEntry={true}
                          onChangeText={(text) => this.handleLoginconfirmPassword(text)}
                          value={confirmPassword}
                        />
                      </View>

                      <View style={{ borderRadius: 6, marginHorizontal: 14, marginBottom: 15, marginTop: 25, elevation: 4 }}>
                        <View style={{ backgroundColor: '#FF69B4', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderColor: '#FF69B4' }}>

                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.submitLogin()}>
                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}> Sign up </Text>

                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 5, paddingBottom: 20 }}>
                        <Text style={{ fontSize: 14 }}>Already have an Account ?</Text>
                        <TouchableOpacity onPress={() => this.gotoIntroScreen('Login')}>
                          <Text style={{ color: '#FF69B4', fontSize: 14, paddingLeft: 5, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                </View>
              </>
              :
              <>
                <Text style={{ padding: 19, fontSize: 22, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>Verification</Text>
                <Text style={{ paddingLeft: 20, fontSize: 14, fontWeight: 'normal', textShadowOffset: { width: 1, height: 1 }, }}>
                  OTP sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text>
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 2,
                    marginLeft: 20,
                    width: 320,
                    borderBottomColor: '#3498eb',
                    borderLeftColor: '#fff',
                    borderRightColor: '#fff',
                    borderTopColor: '#fff'
                  }}
                  name="otp"
                  onChangeText={(text) => this.handleVerificationInput(text)}
                  value={this.state.otp}
                />
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginTop: 15,
                  width: 350,
                  textAlign: 'center',
                  color: '#34cceb', textShadowOffset: { width: 1, height: 1 },
                }}>Expire in: 1:20</Text>
                <TouchableOpacity onPress={() => this.onSubmitOTP()}>
                  <View
                    style={{
                      width: 220,
                      height: 50,
                      backgroundColor: '#3498eb',
                      borderRadius: 50,
                      marginTop: 25,
                      marginLeft: 70, elevation: 8

                    }}

                  >
                    <Text style={{
                      marginTop: 13,
                      textAlign: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 15, textShadowOffset: { width: 1, height: 1 },

                    }}>VERIFY AND PROCEED</Text>
                  </View>
                </TouchableOpacity>
              </>}
          </View>
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
export default connect(mapStateToProps)(Login);