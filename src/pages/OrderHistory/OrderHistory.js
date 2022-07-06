import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';


import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image, FlatList, ScrollView
} from 'react-native';
const { height, width } = Dimensions.get('window')


class OrderHistory extends Component {
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

      <View style={{ width: width, height: height-30, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray' }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgray' }} >

          <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#d9d9d9', paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
              <Image style={{ width: 26, height: 26, height: 26 }} source={require('../../Statics/img/ecomimg/sl.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, }}>Order History</Text>
          </View>

          <ScrollView>
            <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', paddingBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ fontWeight: 'bold' }}> Sub Order ID 48025452_1 </Text>
                <TouchableOpacity>
                  <Text style={{ fontWeight: 'bold', color: 'red' }}>COPY</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Text style={{ color: 'gray' }}> Payment Mode </Text>
                <Text style={{ fontWeight: 'bold', }}> Online</Text>
              </View>
            </View>

            <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}><Image style={{ margin: 15, height: 25, width: 25 }} source={require('../../Statics/img/ecomimg/Headset.png')} />
                  <Text style={{ marginTop: 12, fontSize: 17 }}  >Help Center</Text>
                </View>

                <View style={{ flexDirection: 'row' }}><View style={{ borderRadius: 10, backgroundColor: '#DCDCFF', alignSelf: 'center', width: 40, height: 25 }}>
                  <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'blue' }}>NEW</Text>
                </View>
                  <TouchableOpacity>
                    <Image style={{ margin: 15, height: 25, width: 25 }} source={require('../../Statics/img/ecomimg/sd.png')} />
                  </TouchableOpacity>
                </View>
                {/* <View style={{flexDirection:'row'}}> <View style={{borderRadius:10,backgroundColor:'lightblue'}}><Text>NEW</Text></View></View>
                
                </View> */}
              </View>
            </View>

            <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', paddingBottom: 6, paddingTop: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ margin: 15, height: 30, width: 30 }} source={require('../../Statics/img/ecomimg/pay.png')} />
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'green', fontSize: 18, marginTop: 3 }}>Margin:$0</Text>
                    <Text style={{ marginTop: 7, fontSize: 12 }}> (Margin for the below Product)</Text>
                  </View>
                  <Text style={{ fontSize: 14, }}>Please Contect margin from your customer</Text>
                </View>
              </View>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 5 }}>
              <View>
                <Text style={{ fontSize: 22, marginLeft: 15, paddingBottom: 20, paddingTop: 10 }}>Product Details</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity>
                  <View style={{ borderRadius: 10, borderWidth: 1 }}>
                    <Image style={{ margin: 3, height: 80, width: 80, }} source={require('../../Statics/img/ecomimg/hp.jpeg')} />
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={{ marginTop: 7, fontSize: 14, }}>Stylish HeadPhone With Wireless </Text>
                  <Text style={{ marginTop: 7, fontSize: 14 }}> Product: Available,  Qty: 1</Text>
                  <Text style={{ marginTop: 7, fontSize: 14, }}> $ 120</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <TouchableOpacity>
                    <Image style={{ height: 25, width: 25, }} source={require('../../Statics/img/ecomimg/sd.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 5, margin: 10 }}>
              <View>
                <Text style={{ marginLeft: 15, }}>Rate your experiance</Text>
              </View>
              <View style={{ margin: 10, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity><TouchableOpacity>
                  <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity><TouchableOpacity>
                  <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity><TouchableOpacity>
                  <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity><TouchableOpacity>
                  <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
              </View>

            </View>



            <View style={{ paddingBottom: 10 }}>

              <Text style={{ fontSize: 20, fontWeight: '500', margin: 10, marginLeft: 15 }}>Order Tracking</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: 35, marginTop: 10 }}>

                  <View style={{ height: 15, width: 15, backgroundColor: '#46C646', borderRadius: 25 }}></View>
                  <View style={{ borderLeftWidth: 2, borderColor: 'green', height: 40, width: 6, marginLeft: 6 }}></View>
                  <View style={{ height: 15, width: 15, backgroundColor: '#46C646', borderRadius: 25 }}></View>
                  <View style={{ borderLeftWidth: 2, borderColor: 'green', height: 40, width: 6, marginLeft: 6 }}></View>
                  <View style={{ height: 15, width: 15, backgroundColor: 'green', borderRadius: 25 }}></View>

                </View>
                <View style={{ marginLeft: 14 }}>
                  <Text style={{ fontWeight: '600', fontSize: 17 }}>Order Placed</Text>
                  <Text>11:31pm ,1 April 2022</Text>
                  <Text style={{ fontWeight: '600', fontSize: 17, paddingTop: 15 }}>Shiping</Text>
                  <Text>3 April 2022</Text>
                  <Text style={{ fontWeight: '600', fontSize: 17, paddingTop: 15 }}>Delivered</Text>
                  <Text style={{ fontWeight: '400', fontSize: 15, }}>Your Item Has Been Delivered</Text>

                  <Text>11:31pm ,1 April 2022</Text>
                </View>

              </View>
            </View >

            <View style={{ flexDirection: 'row', margin: 5 }}>
              <Text style={{ color: 'red', fontWeight: '700', marginLeft: 30 }}>SHOW MORE</Text>
              <TouchableOpacity>
                <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../../Statics/img/ecomimg/Down.png')} />
              </TouchableOpacity>
            </View>
            <View style={{height:20}}></View>


          </ScrollView>



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
export default connect(mapStateToProps)(OrderHistory);
