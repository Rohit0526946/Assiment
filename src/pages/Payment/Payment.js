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

class Payment extends Component {
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

        <View style={{ width: width, height: height - 25, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgray' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 5, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              {/* <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{}}>
                <Image source={require('../../Statics/img/Wallet/menu_white_png_icon.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity> */}
              <View style={{ flexDirection: 'row', width: '100%',  alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                  <Image source={require('../../Statics/img/ecomimg/sl.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'black', textShadowOffset: { width: 1, height: 1 },marginLeft:15 }}>Payment Method</Text>


                {/* <TouchableOpacity onPress={this.toggleModal}
                  style={{ height: 26, width: 26, backgroundColor: '#2DA4FE', borderRadius: 13, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                  <Text style={{ fontSize: 18, marginTop: -2, color: 'white', }}>+</Text>

                </TouchableOpacity> */}
                {/* <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity>
                    <Image style={{ width: 25, height: 25, }} source={require("../../Statics/img/ecomimg/Search.png")} />
                  </TouchableOpacity><TouchableOpacity>
                    <Image style={{ height: 25, width: 25, marginLeft: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
                  </TouchableOpacity>
                </View> */}
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
            <View>
              <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 7 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}>
                  <Image source={require('../../Statics/img/comImg2/ok.png')} />

                  <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: '#45b6fe' }}></View>
                  <Image source={require('../../Statics/img/comImg2/ok.png')} />

                  <View style={{ borderBottomWidth: 1, width: 73, borderBottomColor: '#45b6fe' }}></View>
                  <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: '#45b6fe' }}>
                    <Text style={{ color: '#45b6fe', }}>3</Text>
                  </View>

                  <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: 'lightgray' }}></View>
                  <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                    <Text style={{ color: 'lightgray', }}>4</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 30 }}>
                  <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 0 }}>Cart</Text>
                  <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 50 }}>Address</Text>
                  <Text style={{ fontSize: 14, paddingLeft: 40 }}>Payment</Text>
                  <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 35 }}>Summary</Text>
                </View>
              </View>


              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingLeft: 14, fontSize: 16, fontWeight: 'bold' }}>Select Payment Method</Text>
                  <View style={{ flexDirection: 'row', paddingLeft: 55 }}>
                    <Image source={require('../../Statics/img/comImg2/safeimg.png')} />
                    <View>
                      <Text style={{ padingleft: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>100% Safe </Text>
                      <Text style={{ padingleft: 5, fontSize: 12, fontWeight: 'bold', color: 'gray' }}>Payment</Text>
                    </View>
                  </View>
                </View>

                <View style={{ padding: 10, margin: 15, backgroundColor: '#ffe5ec' }}>
                  <TouchableOpacity>
                    <View style={{ flexDirection: 'row', }}>
                      <Image source={require('../../Statics/img/comImg2/safeimg.png')} />
                      <View style={{ paddingLeft: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FF69B4' }}>Pay online & get EXTRA Rs. 50 off</Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>Special Offer on UPI, Wallet, Netbanking, Cards</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                  <Text style={{ fontSize: 12, color: 'gray' }}>PAY ONLINE</Text>
                  <View style={{ borderBottomWidth: 1, width: 250, borderBottomColor: 'lightgray', marginLeft: 5 }}></View>
                </View>
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }}>
                    <View style={{ padding: 13, flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../Statics/img/comImg2/upi.png')} />
                      <Text style={{ paddingLeft: 5, fontSize: 15, fontWeight: 'semibold', marginLeft: 5 }}> UPI (Google Pay/PhonePe) </Text>
                    </View>
                    <Image source={require('../../Statics/img/comImg2/downarrow.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 4, paddingLeft: 5 }}>
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }}>
                    <View style={{ padding: 13, flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{}} source={require('../../Statics/img/comImg2/wallet.png')} />
                      <Text style={{ paddingLeft: 5, fontSize: 15, fontWeight: 'semibold', marginLeft: 5 }}> Wallet </Text>
                    </View>
                    <Image source={require('../../Statics/img/comImg2/downarrow.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 4, paddingLeft: 5 }}>
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }}>
                    <View style={{ padding: 13, flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{}} source={require('../../Statics/img/comImg2/debitcard.png')} />
                      <Text style={{ paddingLeft: 5, fontSize: 15, fontWeight: 'semibold', marginLeft: 5 }}> Debit/Credit Card </Text>
                    </View>
                    <Image source={require('../../Statics/img/comImg2/downarrow.png')} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 4, paddingLeft: 5 }}>
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }}>
                    <View style={{ padding: 13, flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{}} source={require('../../Statics/img/comImg2/bank.png')} />
                      <Text style={{ paddingLeft: 5, fontSize: 15, fontWeight: 'semibold', marginLeft: 5 }}> Net Banking </Text>
                    </View>
                    <Image source={require('../../Statics/img/comImg2/downarrow.png')} />
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                  <Text style={{ fontSize: 12, color: 'gray' }}>PAY IN CASH</Text>
                  <View style={{ borderBottomWidth: 1, width: 245, borderBottomColor: 'lightgray', marginLeft: 5 }}></View>
                </View>
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }}>
                    <View style={{ padding: 13, flexDirection: 'row', alignItems: 'center' }}>
                      <Image style={{}} source={require('../../Statics/img/comImg2/cashon.png')} />
                      <Text style={{ paddingLeft: 5, fontSize: 15, fontWeight: 'semibold', marginLeft: 5 }}> Cash on Delivery </Text>
                    </View>
                    <Image source={require('../../Statics/img/comImg2/downarrow.png')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 15, flexDirection: 'row' }}>
                <View>
                  <Text style={{ paddingLeft: 14, fontSize: 16, fontWeight: 'bold' }}> Reselling the Order? </Text>
                  <Text style={{ paddingLeft: 15, fontSize: 12, }}> Click on 'Yes' to add Final Price </Text>
                </View>
                <TouchableOpacity>
                  <View style={{ paddingLeft: 40 }}>
                    <View style={{ width: 50, padding: 4, backgroundColor: '#ffe1e6', borderRadius: 25, borderWidth: 1, borderColor: '#ff69b4', alignItems: 'center' }}>
                      <Text style={{ color: '#FF69B4', fontSize: 15, fontWeight: 'bold' }}>No</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{ paddingLeft: 10 }}>
                    <View style={{ width: 50, padding: 4, borderRadius: 25, borderWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                      <Text style={{ color: 'lightgray', fontSize: 15, fontWeight: 'bold' }}>Yes</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 13 }}>Clicking on 'Continue' will not deduct any money</Text>
              </View>

              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10, flexDirection: 'row', }}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                    <Image source={require('../../Statics/img/comImg2/Indrup.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>175</Text>
                  </View>
                  <View style={{ paddingLeft: 13, }}>
                    <TouchableOpacity>
                      <Text style={{ color: '#FF69B4', fontSize: 15, fontWeight: 'bold' }}> View Price Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity>
                  <View style={{ paddingLeft: 80, paddingTop: 5 }}>
                    <View style={{ width: 130, padding: 10, backgroundColor: '#FF69B4', borderRadius: 5, alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Continue</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

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
export default connect(mapStateToProps)(Payment);
