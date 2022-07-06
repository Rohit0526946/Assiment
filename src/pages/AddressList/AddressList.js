import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text,
  Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

class AddressList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
      name: '',
      isShowModal: false,
      isShowSendModal: false,
      formData: {
        "name": "",
        "address": ""
      }
    }
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',
        isShowSendModal: false,
        name: '',
      }
    }
    if (nextProps.dashboard.addedSuccessfully) {
      return {
        ...nextProps,
        isShowModal: false,
        formData: {
          "name": "",
          "address": ""
        }
      }
    } else {
      return {
        ...nextProps
      }
    }
  }
  async componentDidMount() {

    this.props.dispatch(dashboardActions.getAddress());
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
  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }
  copyClipBoard = (text) => {

    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }
  submitAddressDetails = () => {
    let { formData } = this.state;
    console.log("formData  ", formData);
    this.props.dispatch(dashboardActions.addAddress(formData));
  }
  toggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  toggleSendModel = (data) => {
    if (data) {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: data.address,
        amount: '',
        name: data.name,
      })
    } else {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: '',
        amount: '',
        name: '',
      })
    }

  }
  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }
  sendFromWithOTP = (e) => {

    let { address, amount, otp } = this.state;

    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }
  sendFrom = (e) => {

    let { address, amount } = this.state;
    this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }
  render() {
    let { dashboard, users } = this.props;
    let { addressList } = dashboard;
    let formData = {}
    let { address, amount, failureMSG } = this.state;


    return (

      <SafeAreaView >

        <View style={{ width: width, height: height - 55, backgroundColor: 'lightgray', borderWidth: 1, borderColor: 'lightgray' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgray' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 5, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              {/* <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{}}>
                <Image source={require('../../Statics/img/Wallet/menu_white_png_icon.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity> */}
              <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                <Text style={{ fontSize: 20, color: 'black', textShadowOffset: { width: 1, height: 1 }, }}>My Account</Text>
                {/* <TouchableOpacity onPress={this.toggleModal}
                  style={{ height: 26, width: 26, backgroundColor: '#2DA4FE', borderRadius: 13, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                  <Text style={{ fontSize: 18, marginTop: -2, color: 'white', }}>+</Text>

                </TouchableOpacity> */}
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <Image style={{ width: 25, height: 25, }} source={require("../../Statics/img/ecomimg/Search.png")} />
                  </TouchableOpacity><TouchableOpacity>
                    <Image style={{ height: 25, width: 25, marginLeft: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>


            <>

              <View style={{ backgroundColor: 'white', marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ height: 75, width: 75, }} source={require('../../Statics/img/ecomimg/profile.png')} />
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Deepak kumar</Text>
                    <Text style={{ marginLeft: 10 }}>Begnning </Text>
                  </View>
                </View>
                <TouchableOpacity style={{ alignSelf: 'center', marginRight: 10 }}>
                  <Image style={{ height: 25, width: 25, }} source={require('../../Statics/img/ecomimg/rightarrow.png')} />
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: 'white', marginTop: 4 }}>
                <View style={{ margin: 10 }}>
                  <Text>6 fields left to complete</Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <View style={{ borderWidth: 5, borderColor: '#FF69B4', width: 200, borderRadius: 4 }}></View>
                  <View style={{ borderWidth: 5, borderColor: 'lightgray', width: 150, borderRadius: 3 }}></View>
                </View>
                <Text style={{ marginLeft: 15, fontSize: 13 }}>You can earn #50 points by  completing your profile</Text>

              </View>
            </>


            <ScrollView>
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/Headset.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>Help Center</Text>
                  </View>
                  <Text style={{ margin: 10, backgroundColor: 'lightblue', borderRadius: 15, borderWidth: 2, borderColor: 'lightblue', padding: 5, color: 'blue' }}>New</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/changelanguage.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>Change language</Text>
                  </View>
                  <Text style={{ margin: 10, backgroundColor: 'lightblue', borderRadius: 15, borderWidth: 2, borderColor: 'lightblue', padding: 5, color: 'blue' }}>New</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/myjourney.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>My Journey</Text>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/myfollowedshops.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>My Followed Shops</Text>
                  </View>
                  <Text style={{ margin: 10, backgroundColor: 'lightblue', borderRadius: 15, borderWidth: 2, borderColor: 'lightblue', padding: 5, color: 'blue' }}>New</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/mybankdetails.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>My Bank Details</Text>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/mysharedproducts.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>My Shared Products</Text>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/mypayment.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>My Payments</Text>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/refer&earn.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>Refer & Earn</Text>
                  </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/refer&earn.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>Spine</Text>
                  </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginTop: 5 }}>
                  <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../Statics/img/ecomimg/Wallet.png')} />
                    <Text style={{ margin: 5, fontWeight: '600' }}>Meesho credit</Text>
                  </View>

                </View>


              </>
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
  // console.log("state  ", JSON.stringify(state));
  return {
    loggingIn,
    users,
    dashboard
  };
}

export default connect(mapStateToProps)(AddressList);
