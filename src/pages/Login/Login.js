import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {
  View, Text, Dimensions,
  TouchableOpacity, ImageBackground, TextInput, Image,Button,ScrollView
} from 'react-native';

const { height, width } = Dimensions.get('window')
class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      time: {},
      seconds: 120
    },
      this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  // static getDerivedStateFromProps(nextProps, prevState) {

  //   if (nextProps.users.UserLoginFailure) {
  //     return {
  //       ...nextProps,
  //       failureMSG: 'Please enter valid username!'

  //     }
  //   }
  //   if (nextProps.users.UserLoginOTPFailure) {
  //     return {
  //       ...nextProps,
  //       failureOTPMSG: 'Invalid OTP or expired!'

  //     }
  //   }
  //   if (nextProps.users.UserLoginEmailSuccess) {
  //     return {
  //       ...nextProps,
  //       showLogin: false

  //     }
  //   }
  //   else {
  //     return {
  //       ...nextProps
  //     }
  //   }

  // }

  // secondsToTime(secs) {
  //   let hours = Math.floor(secs / (60 * 60));

  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);

  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }
  // startTimer() {
  //   if (this.timer == 0 && this.state.seconds > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  // }

  // countDown() {
  //   let seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });

  //   if (seconds == 0) {
  //     clearInterval(this.timer);
  //   }
  // }
  // async componentDidMount() {

  // }
  // handleLoginInput = (text) => {
  //   this.setState({ email: text })
  // }
  // handleLoginInputPassword = (text) => {
  //   this.setState({ password: text })
  // }

  // submitLogin = () => {

  //   let data = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   }
  //   this.props.dispatch(userActions.userlogin(data, this.props));
  //   this.startTimer()
  // }

 


  // handleVerificationInput = (text) => {
  //   this.setState({ otp: text })
  // }

  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }

  render() {
    return (
<ScrollView>
      <View>
      <View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
  <Image style={{marginLeft:20}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/1w.png')} />
  <Image style={{marginLeft:112}}source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/2ndh.png')} />
    <Image style={{marginLeft:100}} 
       source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/3rdf.png')} />
  </View>
  <View>
<View style={{alignSelf:'center',marginTop:20}}>
<Image style={{}}source={require('/home/pnd50/Desktop/rohit/src/images/ecomimg/jkj.png')} />
{/* /home/pnd50/Desktop/rohit/src/images/ecomimg/jkj.png */}
{/* /home/pnd50/Desktop/rohit/src/images/ecomimg/jh.png */}
<Image style={{marginLeft:35}}source={require('/home/pnd50/Desktop/rohit/src/images/ecomimg/jh.png')} />
</View>
<View style={{margin:30}}>
<View style={{flexDirection:'row'}}>
<View>
<Text style={{marginTop:14,fontWeight:'bold'}} >Tag ID</Text>
</View>
<View>
<TextInput style={{width:230,marginBottom:10,backgroundColor:'lightgray',marginLeft:50,borderRadius:20}}>#1212 </TextInput>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View>
<Text style={{marginTop:14,fontWeight:'bold'}} >Name</Text>
</View>
<View>
<TextInput style={{width:230,marginBottom:10,backgroundColor:'lightgray',marginLeft:50,borderRadius:20}}>#1212 </TextInput>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View>
<Text style={{marginTop:14,fontWeight:'bold'}} >Breed</Text>
</View>
<View>
<TextInput style={{width:230,marginBottom:10,backgroundColor:'lightgray',marginLeft:50,borderRadius:20}}>#1212 </TextInput>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View>
<Text style={{marginTop:14,fontWeight:'bold'}} >Birth  </Text>
</View>
<View>
<TextInput style={{width:230,marginBottom:10,backgroundColor:'lightgray',marginLeft:50,borderRadius:20}}>#1212 </TextInput>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View>
<Text style={{marginTop:14,fontWeight:'bold'}} >whight</Text>
</View>
<View>
<TextInput style={{width:230,marginBottom:10,backgroundColor:'lightgray',marginLeft:50,borderRadius:20}}>#1212 </TextInput>
</View>
</View>
</View>
<View style={{flexDirection:'row' ,width:300,backgroundColor:'lightgray',height:50,marginLeft:30,marginRight:30,borderRadius:20}}>

<Text style={{marginTop:15}}>    Medical Detail</Text>

<Image style={{marginLeft:180,marginTop:20}}source={require('/home/pnd50/Desktop/rohit/src/images/ecomimg/jyh.png')} />
</View>
<TouchableOpacity>
<View style={{backgroundColor:'blue',height:50,width:100,marginLeft:230,marginTop:20,borderRadius:20}}>
<Text style={{color:'#fff',textAlign:'center',fontSize:20,fontWeight:'bold',paddingTop:10}}>Done</Text>
</View>

</TouchableOpacity>
<View style={{marginBottom:40}}></View>

</View>

</View>
</ScrollView>
    )
  }
}

  

export default Login;