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

        <View style={{ width: width, height: height - 55, backgroundColor: '#233446', borderWidth: 1, borderColor: '#2DA4FE' }}>
          <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: width - 12, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: 'white' }}>
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{}}>
                <Image source={require('../../Statics/img/Wallet/menu_white_png_icon.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 },  }}>DaikiFintech</Text>
                <TouchableOpacity onPress={this.toggleModal}
                  style={{ height: 26, width: 26, backgroundColor: '#2DA4FE', borderRadius: 13, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                  <Text style={{ fontSize: 18, marginTop: -2, color: 'white', }}>+</Text>

                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              style={{
                width: '100%',
                height: '150%',
                top: 10,
                marginBottom: 30
              }}
            >
              {
                addressList && addressList.length ? addressList.map((element) => (
                  <View style={{ marginHorizontal: 18 }} key={element.id}>
                    <View style={{ backgroundColor: 'white', width: width - 50, borderRadius: 13, elevation: 8, borderWidth: 1, borderColor: '#2DA4FE', marginTop: 15 }}>
                      <View style={{ borderRadius: 12, borderWidth: 1, borderColor: '#2DA4FE' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginHorizontal: 15 }}>
                          <Text style={{ fontSize: 12, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>{element.name}</Text>

                          <TouchableOpacity onPress={() => this.toggleSendModel(element)}
                          >
                            <View
                              style={{ backgroundColor: '#2DA4FE', height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                              <Text style={{
                                marginHorizontal: 10,
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 10,
                                textShadowOffset: { width: 1, height: 1 }, 
                              }}>Send</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginHorizontal: 15, marginBottom: 10 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}> Address: </Text>
                            <Text style={{ fontSize: 12, width: '60%' }}>{element.address}</Text>
                          </View>
                          <TouchableOpacity onPress={() => this.copyClipBoard(element ? element.address : "NA")}
                          >
                            <View
                              style={{ backgroundColor: '#2DA4FE', height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
                              <Text style={{
                                marginHorizontal: 10,
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 10,
                                textShadowOffset: { width: 1, height: 1 }, 
                              }}>Copy</Text>
                            </View>
                          </TouchableOpacity>

                        </View>
                      </View>
                    </View>
                  </View>
                ))
                  : null
              }

            </ScrollView>

          </View>
        </View>

        <Modal isVisible={this.state.isShowModal}>

          <View style={{ alignItems: 'center' }}>

            <View style={{ backgroundColor: '#233446', width: width - 50, borderRadius: 18, elevation: 8, borderWidth: 1, borderColor: '#2DA4FE' }}>
              <View style={{ borderRadius: 17,  }}>

                <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 30, borderRadius: 10 }}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15 }}
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChangeText={(text) => this.handleInput(text, "name")}
                  />
                </View>

                <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15 }}
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChangeText={(text) => this.handleInput(text, "address")}
                  />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20 }}>

                  <View style={{ borderWidth: 1, borderColor: '#2DA4FE', width: '45%', borderRadius: 11, elevation: 8 }}>

                    <View
                      style={{ backgroundColor: 'black', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center',  }}>
                      <TouchableOpacity style={{ width: '100%' }}
                        onPress={this.toggleModal}>

                        <Text style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          textShadowOffset: { width: 1, height: 1 }, 
                        }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                  <View style={{ borderWidth: 1, borderColor: '#2DA4FE', width: '45%', borderRadius: 11, elevation: 8 }}>
                    <View
                      style={{ backgroundColor: '#2DA4FE', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE' }}>
                      <TouchableOpacity style={{ width: '100%' }}
                        onPress={() => this.submitAddressDetails()}>

                        <Text style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                          textShadowOffset: { width: 1, height: 1 }, 
                        }}>Create</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal isVisible={this.state.isShowSendModal}>
          <View style={{ backgroundColor: '#233446', width: width - 50, borderRadius: 12, marginHorizontal: 19, elevation: 8, borderWidth: 1, borderColor: '#2DA4FE', marginTop: 25 }}>
            <View style={{ borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>



              {
                users && !users.sendCoinTXOTPSuccess ?
                  <>
                    <View style={{ marginHorizontal: 18, width: '100%' }}>
                      <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'normal', color: 'lightgrey', textShadowOffset: { width: 1, height: 1 },  }}>
                          To {this.state.name ? `(${this.state.name})` : ''}</Text>
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Address"
                          name="address"
                          selectTextOnFocus={true}
                          onChangeText={(text) => this.handleLoginInput("address", text)}
                          value={address}
                        />
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Amount"
                          name="amount"
                          onChangeText={(text) => this.handleLoginInput("amount", text)}
                          value={amount}
                        />
                      </View>

                      <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20 }}>

                        <View style={{ borderWidth: 1, borderColor: '#2DA4FE', width: '45%', borderRadius: 11, elevation: 8 }}>

                          <View
                            style={{ backgroundColor: 'black', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center',  }}>
                            <TouchableOpacity style={{ width: '100%' }}
                              onPress={this.toggleSendModel}>
                              <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 15,
                                textShadowOffset: { width: 1, height: 1 }, 
                              }}>Cancel</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#131313', width: '45%', borderRadius: 11, elevation: 8 }}>
                          <View
                            style={{ backgroundColor: '#2DA4FE', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE' }}>
                            <TouchableOpacity style={{ width: '100%' }}
                              onPress={() => this.sendFrom()}>
                              <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 15,
                                textShadowOffset: { width: 1, height: 1 }, 
                              }}>Send</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                  :
                  <>
                    <Text style={{ padding: 19, fontSize: 22, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },  }}>Send Coin Verification</Text>
                    <View style={{ height: 45, width: width - 100, backgroundColor: '#F6F6F6', marginTop: 15, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        name="otp"
                        placeholder="Enter otp"
                        onChangeText={(text) => this.handleLoginInput("otp", text)}
                        value={this.state.otp}
                      />
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#131313', width: width - 100, borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>

                      <View
                        style={{ backgroundColor: '#FFD218', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C79323' }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.sendFromWithOTP()}>

                          <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15,
                            textShadowOffset: { width: 1, height: 1 }, 

                          }}>VERIFY AND PROCEED</Text>
                        </TouchableOpacity>
                      </View>

                    </View>

                  </>
              }

            </View>
          </View>
        </Modal>
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
