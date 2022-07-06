import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet
} from 'react-native';
import { CONST } from '../../_config';

import Screen from '../../components/Screen';

import { GiftedChat } from 'react-native-gifted-chat'

const { height, width } = Dimensions.get('window')

// import PINCode, {
//     hasUserSetPinCode,
//     resetPinCodeInternalStates,
//     deleteUserPinCode,
// } from "@haskkor/react-native-pincode";


class MyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issuesDetails: '',
      isUpdate: false,
      behavior: 'position',

      messages: '',
      formData: {
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        country: ""

      }
    }

  }

  componentDidMount() {

    this.props.dispatch(dashboardActions.getUserInfo())
    console.log("asddddddasdf:::::::::::::::::");

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dashboard.isUpdated) {
      return {
        ...nextProps,
        isUpdate: false,
      }
    } else {
      return {
        ...nextProps
      }
    }

  }
  handleInput = (text, name) => {

    // text, name, mobile, address, city, state, country
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }



  updateForm = () => {
    let { dashboard } = this.props;
    let { userInfo } = dashboard;
    this.setState({
      isUpdate: true, formData: {
        name: userInfo.name,
        mobile: userInfo.mobile,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        country: userInfo.country,

      }
    })
  }


  updatePersonalInformation = () => {
    let { formData } = this.state;
    this.props.dispatch(dashboardActions.updateUserInfo(formData, this.props));
    console.log("dfshgdj");
  }





  render() {
    let { formData, isUpdate } = this.state;
    let { dashboard } = this.props;
    let { userInfo, } = dashboard;
    console.log("userInfouserInfouserInfo   ", userInfo);



    return (
      <ScrollView>
        <KeyboardAvoidingView style={{ backgroundColor: 'black' }} behavior="position">

          <View style={{ alignSelf: 'center' }} >

            <View style={{ justifyContent: 'center', marginTop: 15 }}>

              {userInfo ? <View style={{ backgroundColor: '#13133', width: width - 50, borderRadius: 18, elevation: 8, borderWidth: 1, borderColor: '#131313' }}>
                <View style={{ borderRadius: 17, borderWidth: 1, borderColor: '#C79323' }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={{ color: 'white', fontSize: 16, marginTop: 5, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Personal Information</Text>
                    <TouchableOpacity
                      onPress={() => this.updateForm()}
                      style={{ height: 30, width: 40, backgroundColor: "#FFD218", borderRadius: 10, justifyContent: 'center' }}>
                      <Image style={{
                        width: 20,
                        height: 20,
                        alignSelf: 'center'
                      }} source={require('../../Statics/img/Sidebar/edit.png')} />

                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: 'white', fontSize: 10, marginLeft: 10 }}>Basic info, like your name and address, that you use on No platform.</Text>
                  <View style={{ justifyContent: 'center', marginTop: 10, backgroundColor: 'gray', height: 30 }}>
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 10 }}>Basic</Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>Full Name</Text>
                    {/* <Text style={{ fontSize: 15, marginRight: 10 }}>test</Text> */}


                    <View style={{ color: 'white', marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="Name"
                        value={!isUpdate ? userInfo.name : formData.name}
                        secureTextEntry={false}
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'name')}
                      />
                    </View>
                  </View>





                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>Mobile Numbe</Text>
                    {/* <Text style={{ fontSize: 15, marginRight: 10 }}>test</Text> */}


                    <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="Mobile Number"
                        value={!isUpdate ? userInfo.mobile : formData.mobile}
                        secureTextEntry={false}
                        keyboardType='numeric'
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'mobile')}
                      />
                    </View>
                  </View>


                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>Address</Text>
                    {/* <Text style={{ fontSize: 15, marginRight: 10 }}>test</Text> */}


                    <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="Address"
                        value={!isUpdate ? userInfo.address : formData.address}
                        secureTextEntry={false}
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'address')}
                      />
                    </View>
                  </View>




                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>City</Text>
                    {/* <Text style={{ fontSize: 15, marginRight: 10 }}>test</Text> */}


                    <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="City"
                        value={!isUpdate ? userInfo.city : formData.city}
                        secureTextEntry={false}
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'city')}
                      />
                    </View>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>State</Text>
                    {/* <Text style={{ fontSize: 15, marginRight: 10 }}>test</Text> */}


                    <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="State"
                        value={!isUpdate ? userInfo.state : formData.state}
                        secureTextEntry={false}
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'state')}
                      />
                    </View>
                  </View>

                  <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 20 }}>Country</Text>
                    <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#F6F6F6', marginTop: 5, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        placeholder="Country"
                        value={!isUpdate ? userInfo.country : formData.country}
                        secureTextEntry={false}
                        // value={formData.newpassword}
                        onChangeText={(text) => this.handleInput(text, 'country')}
                      />
                    </View>
                  </View>


                  {!isUpdate ?
                    <View style={{}}>
                      {/* <View style={{ backgroundColor: '#FFD218', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C79323' }}>
                                                <TouchableOpacity style={{ width: '100%' }}
                                                    onPress={() => this.updatePersonalInformation()}>
                                                    <Text style={{
                                                        textAlign: 'center',
                                                        color: '#fff',
                                                        fontWeight: 'bold',
                                                        fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                                                    }}>Save</Text>
                                                </TouchableOpacity>
                                            </View> */}
                    </View> :

                    <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, marginHorizontal: 20, marginBottom: 20, marginTop: 10, elevation: 8 }}>
                      <View style={{ backgroundColor: '#FFD218', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C79323' }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.updatePersonalInformation()}>
                          <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                          }}>update</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  }

                </View>
              </View> : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView >
    );


  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});






function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(MyProfile);
