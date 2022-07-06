import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';


import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image, FlatList
} from 'react-native';
const { height, width } = Dimensions.get('window')


class TransactionHistory extends Component {
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
        "mobile": "",
        "email": "",
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
          "mobile": "",
          "email": "",
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

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        token: UserEmailToken,
        otp: this.state.otp
      }

      this.props.dispatch(userActions.validateOtp(data, this.props));
      this.props.navigation.navigate('Welcome')
    }
  }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }


  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;

    return (

      <View style={{ width: width, height: height, backgroundColor: '#233446', borderWidth: 1, borderColor: '#2DA4FE' }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

          <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#d9d9d9', paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
              <Image style={{ width: 30, height: 30, height: 30 }} source={require('../../Statics/img/Profile/back-arrow.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 },  }}>Transaction History</Text>
          </View>



          <View style={{ alignItems: 'center' }}>

            <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 15, color: 'lightgray', textShadowOffset: { width: 1, height: 1 },  }}>Transactions History</Text>

            <View style={{ width: width - 50, marginHorizontal: 19, height: "80%", marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: '#2DA4FE', }}>
              <View style={{ flex: 1, borderTopLeftRadius: 9, borderTopRightRadius: 9, borderWidth: 1, borderColor: '#2DA4FE', justifyContent: 'center', alignItems: 'center', backgroundColor: '#131313' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 0, marginTop: 40, backgroundColor: '#2DA4FE', height: 40, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>

                  <View style={{ height: '100%', width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15,color:'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>TXID</Text>
                  </View>

                  <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15,color:'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>TYPE</Text>
                  </View>


                  <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15,color:'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>TIME(GMT)</Text>
                  </View>
                </View>

                <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginBottom: 5 }}>
                  <FlatList
                    // data={transaction}
                    // keyExtractor={(transaction) => transaction.txid.toString()}
                    numColumns={1}
                    renderItem={({ item, index }) => (

                      <View style={{ flexDirection: 'row', height: 40, borderTopWidth: 1, borderTopColor: 'lightgrey' }}>
                        <View style={{ height: '100%', width: '40%', justifyContent: 'center', alignItems: 'center' }}   >
                          <Text onPress={() => { Linking.openURL('http://172.104.190.31/tx/' + item.txid) }} style={{ color: 'white', fontSize: 12, fontWeight: 'bold', color: '#1E90FF', textShadowOffset: { width: 1, height: 1 },  }}>{item && item.txid ? item.txid.substring(0, 8) + "..." : "XXX"}</Text>
                        </View>

                        <View style={{ height: '100%', width: '30%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', color: item.category == 'send' ? 'black' : '#32CD32', textShadowOffset: { width: 1, height: 1 },  }}>{item && item.category ? item.category : ""}</Text>
                        </View>

                        <View style={{ height: '100%', width: '30%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>{
                            moment(item.time * 1000).format('YYYY-MM-DD')
                          }</Text>
                        </View>
                      </View>

                    )}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* </> */}
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
export default connect(mapStateToProps)(TransactionHistory);
