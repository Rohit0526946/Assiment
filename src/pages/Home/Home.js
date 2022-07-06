import React, { Component } from 'react';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { homeActions, } from "../../_actions";
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, ScrollView, TextInput,
  Image, TouchableOpacity, FlatList, Linking, SafeAreaView, Dimensions, RefreshControl
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
//  await AsyncStorage.removeItem('UserData');
//  let userData = await AsyncStorage.getItem("UserData");
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph
// } from 'react-native-chart-kit'
// const screenWidth = Dimensions.get("window").width;

const { width, height } = Dimensions.get('window');



// const data = {
//   labels: [1, 2, 3, 4, 5, 6],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43],
//       // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//       strokeWidth: 2 // optional
//     }
//   ],
//   legend: ["Rainy Days"] // optional
// };


// const chartConfig = {
//   backgroundGradientFrom: "#1E2923",
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: "#08130D",
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   useShadowColorFromDataset: false // optional
// };



// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

class Home extends Component {
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
      refreshing: false
    }
  }


  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ refreshing: false })

    }, 3000);
    wait(1000).then(() => refreshing(false));
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.setState({ showQRScanner: false, address: e.data });
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

    this.props.dispatch(homeActions.getArrivalsList());


  }


  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }



  addToCart = async (data) => {
    console.log("data  ", data);
    let products = JSON.parse(await AsyncStorage.getItem("products"));
    if (products && products.length > 0) {
      let currentPrductindex = products.findIndex((element) => (element.id === data.id));

      if (currentPrductindex >= 0) {
        products[currentPrductindex]['count'] += 1;
        let { product, productTotal } = products[currentPrductindex];
        products[currentPrductindex].subTotal = products[currentPrductindex].count * product.newPrice



        await AsyncStorage.setItem("products", JSON.stringify(products))
        // let totalAmount = products.reduce((a, b) => ({ subTotal: a.subTotal + b.subTotal }));
        // console.log("totalAmounttotalAmount  ", totalAmount);
        // this.setState({ products })



      } else {
        let product = {
          id: data.id,
          product: data,
          count: 1,
          subTotal: data.newPrice

        }
        products.push(product)
        await AsyncStorage.setItem("products", JSON.stringify(products))
      }

      AsyncStorage.getItem("products").then(async (value) => {
        let products = JSON.parse(value);
        let totalAmount = products.reduce((a, b) => ({ subTotal: a.subTotal + b.subTotal }));
        console.log("totalAmounttotalAmount  ", totalAmount);
        await AsyncStorage.setItem("totalAmount", totalAmount)
        // this.setState({ products })
        // this.setState({ totalAmount })
      });

    } else {
      let product = [{
        id: data.id,
        product: data,
        count: 1,
        subTotal: data.newPrice
      }]
      await AsyncStorage.setItem("products", JSON.stringify(product))
    }


    console.log("productsproductsproducts   ", products);


  }

  render() {
  

    return (




<View>
  <View style={{flexDirection:'row',backgroundColor:'green',alignItems:'center'}}>
  <Image style={{marginLeft:20}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/1w.png')} />

  <Image style={{marginLeft:112}}source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/2ndh.png')} />
    <Image
          style={{marginLeft:100}}
         
         source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/3rdf.png')} />

  </View>
  <View style={{flexDirection:'row',marginTop:20}}>
<Text style={{marginLeft:20}}> Cow</Text>
<Text style={{marginLeft:250}}>See all</Text>
  </View>
<View style={{flexDirection:'row'}}>

  
  <View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10,}} >

 <Image style={{height:80,width:80,alignSelf
:'center',marginTop:25}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/ajay.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Breed 1</Text>
</View>


<View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10}} >

<Image style={{height:100,width:100,alignSelf:'center'}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/cow.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Breed 1</Text>
<Text style={{textAlign:'center',fontWeight:'bold'}}>20</Text>
</View>



  
</View>
<View>
  <Text style={{margin:10}}>Explore</Text>
</View>




<View style={{flexDirection:'row',}}>

  
  <View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10,}} >

 <Image style={{height:80,width:80,alignSelf
:'center',marginTop:25}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/qw.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Veterinary</Text>
</View>


<View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10}} >

<Image style={{height:100,width:100,alignSelf:'center'}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/qwr.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Market</Text>

</View>



  
</View>



<View style={{flexDirection:'row',}}>

  
  <View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10,}} >

 <Image style={{height:80,width:80,alignSelf
:'center',marginTop:25}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/pepar.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Veterinary</Text>
</View>


<View style={{height:150,width:150,backgroundColor:'lightgray',marginLeft:20,marginTop:10}} >

<Image style={{height:100,width:100,alignSelf:'center'}} source={require('/home/pnd50/Desktop/rohit/src/Statics/img/Home/pen.png')} />
<Text style={{textAlign:'center',marginTop:10,fontWeight:'bold'}}>Market</Text>

</View>



  
</View>







</View>
 

       

   






    )
  }
}


function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard, home } = state;

  // console.log("homehomehomehomehomehomehome",home)


  return {
    loggingIn,
    users,
    home,
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
export default connect(mapStateToProps)(Home);
