import React, { Component } from 'react';
//import Clipboard from '@react-native-community/clipboard';
//import { connect } from 'react-redux';
//import { CONST } from '../../_config';
//import { dashboardActions, } from '../../_actions';
//import { userActions } from '../../_actions';
//import { alertActions } from '../../_actions';
//import { homeActions, } from "../../_actions";



import {
  StyleSheet, View, Text, SafeAreaView,
  Image, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';


//import { scaleRatio } from '../../helpers/index';
//import colors from '../../config/colors';
//import QRCode from 'react-native-qrcode-generator'
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { TextInput } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');
class Addnew extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }
  }





  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }




  render() {
   
    return (



        <View>

        </View>
        )
    }
  }
  
  
  
  
  
  export default Addnew;
  