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

class ProductDetails extends Component {
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

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
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


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 20, }}>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
              <Image source={require('../../Statics/img/comImg2/leftarrow.png')} style={{ height: 15, width: 15, marginTop: 6 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginLeft: 10, color: 'black' }}>Product Details</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity>
              <Image style={{ width: 25, height: 25, }} source={require("../../Statics/img/ecomimg/Search.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={{ height: 25, width: 25, marginLeft: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: width, height: height - 55, backgroundColor: 'white', borderWidth: 1, borderColor: '#2DA4FE' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

            <View style={{ backgroundColor: 'pink', flexDirection: 'row' }}>
              <Image source={require('../../Statics/img/comImg2/location.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain', alignSelf: 'center', marginLeft: 15 }} />
              <Text style={{ margin: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Delivery to jaipur -326555</Text>
            </View>


            <ScrollView>
              <TouchableOpacity>
                <Image source={require('../../Statics/img/comImg2/wallet1.png')} style={{ height: scaleRatio(35), width: scaleRatio(49), alignSelf: 'center' }} />
              </TouchableOpacity>
              {/* <Text style={{ margin: 10 }}> 6 Similar Products</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity >
                  <Image source={require('../../Statics/img/comImg2/wallet4.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../Statics/img/comImg2/wallet5.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../Statics/img/comImg2/wallet3.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../Statics/img/comImg2/wallet4.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../Statics/img/comImg2/wallet5.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../../Statics/img/comImg2/wallet6.png')} style={{ height: scaleRatio(10), width: scaleRatio(7.5), borderRadius: 10, borderWidth: 1, borderColor: 'lightgray' }} />
                </TouchableOpacity>
              </View> */}
              <Text style={{ color: 'gray', marginTop: 10, marginLeft: 10, fontSize: 15 }}>Stylish Men's Brown Leather Wallet</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 }}>
                <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../Statics/img/comImg2/indrup.png')} />
                  <Text style={{ fontSize: 22, fontWeight: 'bold', paddingLeft: 3 }}>106</Text>
                  <Image style={{ marginLeft: 5, }} source={require('../../Statics/img/comImg2/indrupe.png')} />
                  <Text style={{ fontSize: 14, fontWeight: 'semibold', textDecorationLine: 'line-through' }}>124</Text>
                  <Text style={{ fontSize: 16, color: 'green', fontWeight: 'semibold', paddingLeft: 10, }}>15% off</Text>
                </View>
                <View style={{ alignItems: 'center', }}>
                  <TouchableOpacity>
                    <View style={{ borderWidth: 1, borderColor: 'gray', width: 100, padding: 5, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'row', }}>
                      <Image style={{ }} source={require('../../Statics/img/comImg2/bxcart.png')} />
                      <Text style={{ color: '#000'}}>Add to Cart </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>



              <View style={{ width: 200, padding: 3, backgroundColor: '#88d8c0', borderRadius: 10, marginHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
                <Image style={{}} source={require('../../Statics/img/comImg2/currency.png')} />
                <Text style={{ color: '#00c170', fontSize: 14, }}> 83 with 2 Special Offers</Text>
                <TouchableOpacity>
                  <View style={{ borderWidth: 1.5, borderColor: '#00c170', borderRadius: 10, marginLeft: 5, width: 15, height: 15, alignItems: 'center' }}>
                    <Image style={{ marginLeft: 2, }} source={require('../../Statics/img/comImg2/rightarr.png')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 18, paddingTop: 5 }}>
                <Image source={require('../../Statics/img/comImg2/indrup3.png')} />
                <Text style={{ paddingLeft: 2, }}>50 Off | discount on 1st order....</Text>
              </View>
              <View style={{ paddingLeft: 18, paddingTop: 4 }}>
                <Text style={{}}>Free Delivery</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: 'green', borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ color: '#fff' }}>3.4 </Text>
                  <Image source={require('../../Statics/img/comImg2/Frame2.png')} />
                </View>
                <Text style={{ paddingLeft: 5, paddingTop: 8, fontSize: 13, color: 'gray' }}>23905 ratings </Text>
              </View>

              <View style={{ backgroundColor: '#fff', marginTop: 10, paddingVertical: 12, paddingLeft: 18, borderTopWidth: 3, borderTopColor: 'lightgray' }}>
                <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.gotoNextScreen('MyCart')}>
                    <View style={{ alignItems: 'center', borderWidth: 1, borderColor: 'gray', width: 150, padding: 10, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                      {/* <Image style={{ marginLeft: 15 }} source={require('../../Statics/img/comImg2/bxcart.png')} /> */}
                      <Text style={{ color: '#000', paddingLeft: 5 }}>Continue Shoping </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.gotoNextScreen('DeliveryAddress')}>
                    <View style={{ borderWidth: 1, width: 150, padding: 10, borderColor: '#FF69B4', borderRadius: 5, marginLeft: 18, backgroundColor: '#FF69B4' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={require('../../Statics/img/comImg2/Vector1.png')} />
                        <Image source={require('../../Statics/img/comImg2/Vector1.png')} />
                        <Text style={{ color: '#fff', paddingLeft: 5 }}>Buy Now</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>

            </ScrollView>



            {/* 
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
            </> */}

            {/* 
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
            </ScrollView> */}












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

export default connect(mapStateToProps)(ProductDetails);
