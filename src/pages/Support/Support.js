import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput, ScrollView
} from 'react-native';
import { CONST } from '../../_config';

import Screen from '../../components/Screen';
const { height, width } = Dimensions.get('window')

import PINCode, {
  hasUserSetPinCode,
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";


class Support extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issuesDetails: '',
      formData: {
        name: "",

      }
    }
  }

  componentDidMount() {
    this.props.dispatch(dashboardActions.getTicketList())
    console.log("asddddddasdf:::::::::::::::::");

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dashboard.ticketCreate) {
      return {
        ...nextProps,
        formData: {
          name: "",
        }
      }
    } else {
      return {
        ...nextProps
      }
    }

  }
  handleInput = (text, name) => {

    console.log("abc::::::::::::", name);
    console.log("abc::::::::::::", text);
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }

  createTicket = () => {
    let { formData } = this.state
    this.props.dispatch(dashboardActions.createTicket(formData, this.props));

  }


  chatScreen = (router, ticket) => {
    this.props.navigation.navigate(router, { ticket })
  }




  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { ticketList } = dashboard;
    return (

      <View style={{ width: width, height: height, backgroundColor: 'black', borderWidth: 3, borderColor: '#131313' }}>
        <View style={{ flex: 1, borderWidth: 3, borderColor: '#C79323' }} >

          <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#d9d9d9', paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
              <Image style={{ width: 30, height: 30, height: 30 }} source={require('../../Statics/img/Profile/back-arrow.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Support</Text>
          </View>


          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <View style={{
              backgroundColor: '#131313',
              width: width - 50, borderRadius: 18, elevation: 8,
              borderWidth: 1, borderColor: '#131313'
            }}>

              <View style={{ borderRadius: 17, borderWidth: 1, borderColor: '#C79323' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>CREATE TICKET</Text>
                <View style={{ marginHorizontal: 20, height: 75, backgroundColor: '#F6F6F6', marginTop: 30, borderRadius: 10 }}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, textAlignVertical: 'top' }}
                    placeholder="Mension issues in details..."
                    name="name"
                    secureTextEntry={false}
                    value={formData.name}
                    numberOfLines={2}
                    onChangeText={(text) => this.handleInput(text, "name")}
                  />
                </View>
                <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, marginHorizontal: 20, marginBottom: 15, marginTop: 40, elevation: 8 }}>
                  <View
                    style={{ backgroundColor: '#FFD218', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C79323' }}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => { this.createTicket("Chat",) }}
                    >
                      <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                      }}>Create Ticket</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>


          <ScrollView style={{}}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>TICKET LIST</Text>


              {
                ticketList && ticketList.length > 0 ?
                  // [1,2,3,4].map((element)=>())
                  ticketList.map((element) => (
                    <View style={{
                      backgroundColor: 'white',
                      width: width - 50, borderRadius: 18, elevation: 8,
                      borderWidth: 1, borderColor: '#131313',
                      marginTop: 10
                    }}>
                      <View style={{ borderRadius: 17, borderWidth: 1, borderColor: '#C79323', height: 50, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, margin: 5, width: 90, lineHeight: 16, }}>Name : {element.name}</Text>
                        <Text style={{ alignSelf: 'center', margin: 5, fontSize: 12, }}>Date : 2021-09-25</Text>
                        <TouchableOpacity style={{ width: 65, backgroundColor: '#FFD218', height: 25, alignSelf: 'center', borderRadius: 15, margin: 5 }}
                          onPress={() => { this.chatScreen("Chat", element) }}>
                          <Text style={{ alignSelf: 'center', fontSize: 12, marginTop: 3 }}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  ))
                  : <View style={{
                    backgroundColor: 'white',
                    width: width - 50, borderRadius: 18, elevation: 8,
                    borderWidth: 1, borderColor: '#131313',
                    marginTop: 10
                  }}>
                    <View style={{ borderRadius: 17, borderWidth: 1, borderColor: '#C79323', height: 50, flexDirection: 'row', justifyContent: 'space-between', }}>
                      <Text style={{ alignSelf: 'center', fontSize: 12, margin: 5 }}>Name : abc</Text>
                      <Text style={{ alignSelf: 'center', margin: 5, fontSize: 12, }}>Date : 2021-09-25</Text>
                      <TouchableOpacity style={{ width: 65, backgroundColor: '#FFD218', height: 25, alignSelf: 'center', borderRadius: 15, margin: 5 }}
                        onPress={() => { }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, marginTop: 3 }}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              }



            </View>
          </ScrollView>
        </View>
      </View>
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
export default connect(mapStateToProps)(Support);
