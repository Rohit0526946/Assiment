import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';


import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image
} from 'react-native';
const { height, width } = Dimensions.get('window')


class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      formData: {
        "name": "",
        "email": "",
        "mobile": "",
        "subject": "",
        "message": ""
      }
    }
  }
  componentDidMount() {

  }
  static getDerivedStateFromProps(nextProps) {

    if (nextProps.dashboard.submitEnquirySuccess) {
      return {
        ...nextProps,
        formData: {
          "name": "",
          "email": "",
          "mobile": "",
          "subject": "",
          "message": ""
        }

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
  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }
  gotoIntroScreen = () => {
    this.props.navigation.navigate('Intro1')
  }

  handleLoginInput = (text) => {
    this.setState({ email: text })
  }

   submitContactDetails = () => {
     let { formData } = this.state
     this.props.dispatch(dashboardActions.saveEnqiry(formData, this.props));
   }

  // onSubmitOTP = () => {
  //   const { users } = this.props;
  //   const { UserEmailToken } = users;
  //   if (this.state.otp !== 'NaN') {
  //     let data = {
  //       token: UserEmailToken,
  //       otp: this.state.otp
  //     }

  //     this.props.dispatch(userActions.validateOtp(data, this.props));
  //     this.props.navigation.navigate('Welcome')
  //   }
  // }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }


  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;

    return (
      <View style={{ width: width, height: height, backgroundColor: '#fff' }}>
        <View>
          <View>
            <View style={{ marginHorizontal: 18, }}>
              <View style={{}}>
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.props.navigation.goBack()}>
                  <Image style={{
                    width: 15,
                    height: 15,
                    marginTop: 10,
                    // backgroundColor: 'white',
                  }} source={require('../../Statics/img/comImg2/leftarrow.png')} />
                </TouchableOpacity>
                <Image style={{ height: 60, width: 60, alignSelf: 'center' }} source={require('../../Statics/img/Splash/logo1.png')} />
                <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>Contact Us</Text>
              </View>
            </View>
          </View>
          <>
            <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>

              <View style={{ backgroundColor: '#fff', width: width - 45, borderRadius: 18, borderWidth: 1, borderColor: 'lightgray' }}>
                <View style={{ borderRadius: 15, }}>
                  <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 30, borderRadius: 10 }}>
                    <TextInput
                      style={{ marginHorizontal: 10, fontSize: 15 }}
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChangeText={(text) => this.handleInput(text, "name")}
                    />
                  </View>
                  <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                    <TextInput
                      style={{ marginHorizontal: 10, fontSize: 15 }}
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChangeText={(text) => this.handleInput(text, "email")}
                    />
                  </View>
                  <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                    <TextInput
                      style={{ marginHorizontal: 10, fontSize: 15 }}
                      placeholder="Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChangeText={(text) => this.handleInput(text, "mobile")}
                    />
                  </View>
                  <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                    <TextInput
                      style={{ marginHorizontal: 10, fontSize: 15 }}
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChangeText={(text) => this.handleInput(text, "subject")}
                    />
                  </View>

                  <View style={{ marginHorizontal: 20, height: 60, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                    <TextInput
                      style={{ marginHorizontal: 10, fontSize: 15 }}
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChangeText={(text) => this.handleInput(text, "message")}
                    />
                  </View>

                  <View style={{ borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>

                    <View
                      style={{ backgroundColor: '#FF69B4', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FF69B4' }}>

                      <TouchableOpacity style={{ width: '100%' }}
                        onPress={() => this.submitContactDetails()}>

                        <Text style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>Submit</Text>
                      </TouchableOpacity>
                    </View>

                  </View>


                </View>
              </View>
            </View>
          </>
        </View>
      </View>
    )
  }
}
function mapStateToProps(state) {
  // //console.log("state Home::::::::::::  ", state);
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(ContactUs);
