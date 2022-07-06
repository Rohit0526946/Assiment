import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions, } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import { homeActions, } from "../../_actions";



import {
  StyleSheet, View, Text, SafeAreaView,
  Image, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';


import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-generator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');
class Product extends Component {
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

      <SafeAreaView >
<View>
<View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
  <Image style={{marginLeft:20}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/1w.png')} />

  <Image style={{marginLeft:112}}source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/2ndh.png')} />
    <Image
          style={{marginLeft:100}}
         
         source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/3rdf.png')} />

  </View>
  <View style={{alignSelf:'center'}}>
  <TextInput
        style={{height: 40,width:300,backgroundColor:'lightgray',margin:40,marginTop:20,borderRadius:10}}
        placeholder="Search here"
        onChangeText={newText => setText(newText)}
       /></View>

<Text style={{marginLeft:10,fontWeight:'bold'}} >Sort By ! New:</Text>


<View style={{flexDirection:'row'}}>

  
  <View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10,}} >
<TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')}>
 <Image style={{height:80,width:80,alignSelf
:'center',marginTop:25}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/ajay.png')} />
</TouchableOpacity>

<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Breed 1</Text>
</View>


<View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10}} >

<Image style={{height:100,width:100,alignSelf:'center'}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/cow.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Breed 1</Text>
<Text style={{textAlign:'center',fontWeight:'bold'}}>20</Text>
</View>



  
</View>




</View>

     
      </SafeAreaView>

    )
  }
}





export default Product;
