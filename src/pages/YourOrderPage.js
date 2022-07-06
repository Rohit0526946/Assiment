import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
  View, Text, Dimensions,
  Image, TouchableOpacity, BackHandler, Alert
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')


class initialSelectionscreen extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
    }
  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    navigate('NewScreen');
  }

  // handleBackButton = () => {
  //     Alert.alert(
  //         'Exit App',
  //         'Exiting the application?', [{
  //             text: 'Cancel',
  //             onPress: () => console.log('Cancel Pressed'),
  //             style: 'cancel'
  //         }, {
  //             text: 'OK',
  //             onPress: () => BackHandler.exitApp()
  //         },], {
  //         cancelable: false
  //     }
  //     )
  //     return true;
  // }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {

    return (

      <View style={{ backgroundColor: 'lightgray',height:height-50 }}>
        <View style={{flex:1}}>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <Text style={{ margin: 10, fontSize: 18 }}>ORDERS</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Image style={{ width: 25, height: 25, margin: 10 }} source={require('../Statics/img/ecomimg/Search.png')} />
            </TouchableOpacity><TouchableOpacity>
              <Image style={{ height: 25, width: 25, margin: 10 }} source={require('../Statics/img/ecomimg/cart.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <>
            <View style={{ backgroundColor: 'white', marginTop: 2 }}>
              <Text style={{ fontSize: 18, margin: 10, fontWeight: 'bold' }}>Your Order</Text>
              <View style={{ flexDirection: 'row', margin: 10, borderRadius: 5, borderWidth: 3, borderColor: 'lightgray' }}>
                <Image style={{ height: 30, width: 30, marginTop: 5, marginLeft: 10 }} source={require('../Statics/img/ecomimg/Search1.png')} />
                <TextInput placeholder='Search by Customer,product,or order ID'></TextInput>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 20 }}>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'pink', backgroundColor: 'lightpink', width: 40, height: 30, padding: 5, paddingLeft: 10, color: '#FF69B4' }}>All</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Ordered</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Shipped</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Delivered</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 5, alignItems: 'center' }}>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, paddingLeft: 10, padding: 2 }}>Cancelled</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 80, height: 30, padding: 5, paddingLeft: 10 }}>Ordered</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 60, height: 30, padding: 5, paddingLeft: 10 }}>return</Text>
                <Text style={{ borderRadius: 15, borderWidth: 2, borderColor: 'lightgray', backgroundColor: 'lightgray', width: 60, height: 30, padding: 5, paddingLeft: 10 }}>Other</Text>
              </View>
            </View>
            <View style={{ backgroundColor: 'white' }}>
              <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>1st April</Text>
            </View>
            <View style={{ marginTop: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text>Order ID  480111962191</Text>
              <Text style={{ marginLeft: 60 }}>Send to other </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}> other </Text>

            </View>
            <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
              <Text>Supplier</Text>
              <Text style={{ marginLeft: 5 }}>:</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>hk traders</Text>
            </View>

            <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Image style={{ height: 50, width: 50, marginTop: 5, }} source={require('../Statics/img/ecomimg/wallet1.png')} />
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Text>Prepaid Order</Text>
                  <Text>Stylish Men's Brown Leather Wallet</Text>
                  <Text>Prepaid Order</Text>
                </View>
              </View>

              <Image style={{ height: 23, width: 23, marginTop: 5, marginLeft: 10, alignSelf: 'center' }} source={require('../Statics/img/ecomimg/rightarrow.png')} />
            </View>
            <View style={{ backgroundColor: 'white', marginTop: 1 }}>
              <Text style={{ marginTop: 15, margin: 10 }}>Rate Your experiance</Text>
              <View style={{ flexDirection: 'row', marginBottom:10 }}>
                
                <TouchableOpacity>
                <Image style={{ height: 30, width: 30, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image style={{ height: 30, width: 30, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image style={{ height: 30, width: 30, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image style={{ height: 30, width: 30, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image style={{ height: 30, width: 30, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Star.png')} />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ marginTop: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text>Order ID  480111962191</Text>
              <Text style={{ marginLeft: 60 }}>Send to other </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}> other </Text>

            </View>
            
            <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
              <Text>Supplier</Text>
              <Text style={{ marginLeft: 5 }}>:</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5 }}>KAMLESH ENTERPRIS SUB</Text>
            </View>

            <View style={{ marginTop: 1, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 60}}>
              <Image style={{ height: 50, width: 50, marginTop: 5, }} source={require('../Statics/img/ecomimg/wallet1.png')} />
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Text>Prepaid Order</Text>
                  <Text>Stylish Men's Brown Leather Wallet</Text>
                  <Text>Prepaid Order</Text>
                </View>
              </View>

              <Image style={{ height: 23, width: 23, marginTop: 5, marginLeft: 10, alignSelf: 'center' }} source={require('../Statics/img/ecomimg/rightarrow.png')} />
            </View>
          </>
        </ScrollView>

      </View>
      </View>
















































      //    <View style={{ flex: 1, backgroundColor: 'black', borderWidth: 1, }}>
      //     <View style={{ backgroundColor: 'white', height: 15 }}>
      //     </View>

      //     <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 5 }}>
      //     <TouchableOpacity>
      //      <Image style={{ width: 28, height: 20, marginBottom: 5, marginLeft: 5 }} source={require('../Statics/img/ecomimg/sl.png')} /></TouchableOpacity>
      //      <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>ORDER  DETAILS</Text>
      //     </View>

      //     <ScrollView>
      //     <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', paddingBottom: 10 }}>
      //      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
      //       <Text style={{ fontWeight: 'bold' }}> Sub Order ID 48025452_1 </Text>
      //       <TouchableOpacity>
      //       <Text style={{ fontWeight: 'bold', color: 'red' }}>COPY</Text>
      //       </TouchableOpacity>
      //      </View>

      //      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
      //       <Text style={{ color: 'gray' }}> Payment Mode </Text>
      //       <Text style={{ fontWeight: 'bold', }}> Online</Text>
      //      </View>
      //     </View>

      //     <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', }}>
      //      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      //       <View style={{ flexDirection: 'row' }}><Image style={{ margin: 15, height: 25, width: 25 }} source={require('../Statics/img/ecomimg/Headset.png')} />
      //        <Text style={{ marginTop: 12, fontSize: 17 }}  >Help Center</Text>
      //       </View>

      //       <View style={{ flexDirection: 'row' }}><View style={{ borderRadius: 10, backgroundColor: '#DCDCFF', alignSelf: 'center', width: 40, height: 25 }}>
      //        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'blue' }}>NEW</Text>
      //       </View>
      //       <TouchableOpacity>
      //       <Image style={{ margin: 15, height: 25, width: 25 }} source={require('../Statics/img/ecomimg/sd.png')} />
      //       </TouchableOpacity>
      //       </View>
      //       {/* <View style={{flexDirection:'row'}}> <View style={{borderRadius:10,backgroundColor:'lightblue'}}><Text>NEW</Text></View></View>

      //                 </View> */}
      //      </View>
      //     </View>

      //     <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', paddingBottom: 6, paddingTop: 5 }}>
      //      <View style={{ flexDirection: 'row' }}>
      //       <Image style={{ margin: 15, height: 30, width: 30 }} source={require('../Statics/img/ecomimg/pay.png')} />
      //       <View>
      //        <View style={{ flexDirection: 'row' }}>
      //         <Text style={{ color: 'green', fontSize: 18, marginTop: 3 }}>Margin:$0</Text>
      //         <Text style={{ marginTop: 7, fontSize: 12 }}> (Margin for the below Product)</Text>
      //        </View>
      //        <Text style={{ fontSize: 14, }}>Please Contect margin from your customer</Text>
      //       </View>
      //      </View>
      //     </View>

      //     <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 5 }}>
      //      <View>
      //       <Text style={{ fontSize: 22, marginLeft: 15, paddingBottom: 20, paddingTop: 10 }}>Product Details</Text>
      //      </View>
      //      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      //       <TouchableOpacity>
      //       <View style={{ borderRadius: 10, borderWidth: 1 }}>
      //        <Image style={{ margin: 3, height: 80, width: 80, }} source={require('../Statics/img/ecomimg/hp.jpeg')} />
      //       </View>
      //       </TouchableOpacity>
      //       <View>
      //        <Text style={{ marginTop: 7, fontSize: 14, }}>Stylish HeadPhone With Wireless </Text>
      //        <Text style={{ marginTop: 7, fontSize: 14 }}> Product: Available,  Qty: 1</Text>
      //        <Text style={{ marginTop: 7, fontSize: 14, }}> $ 120</Text>
      //       </View>
      //       <View style={{ marginTop: 15 }}>
      //       <TouchableOpacity>
      //        <Image style={{ height: 25, width: 25, }} source={require('../Statics/img/ecomimg/sd.png')} />
      //        </TouchableOpacity>
      //       </View>
      //      </View>
      //     </View>

      //     <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 5, margin: 10 }}>
      //      <View>
      //       <Text style={{ marginLeft: 15, }}>Rate your experiance</Text>
      //      </View>
      //      <View style={{ margin: 10, flexDirection: 'row' }}>
      //      <TouchableOpacity>
      //       <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../Statics/img/ecomimg/Star.png')} />
      //       </TouchableOpacity><TouchableOpacity>
      //       <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../Statics/img/ecomimg/Star.png')} />
      //       </TouchableOpacity><TouchableOpacity>
      //       <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../Statics/img/ecomimg/Star.png')} />
      //       </TouchableOpacity><TouchableOpacity>
      //       <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../Statics/img/ecomimg/Star.png')} />
      //       </TouchableOpacity><TouchableOpacity>
      //       <Image style={{ height: 25, width: 25, marginLeft: 15 }} source={require('../Statics/img/ecomimg/Star.png')} />
      //       </TouchableOpacity>
      //      </View>

      //     </View>



      //     <View style={{ paddingBottom: 10 }}>

      //      <Text style={{ fontSize: 20, fontWeight: '500', margin: 10, marginLeft: 15 }}>Order Tracking</Text>
      //                  <View style={{ flexDirection: 'row' }}>
      //      <View style={{ marginLeft: 35, marginTop: 10 }}>

      //       <View style={{ height: 15, width: 15, backgroundColor: '#46C646', borderRadius: 25 }}></View>
      //       <View style={{ borderLeftWidth: 2, borderColor: 'green', height: 40, width: 6, marginLeft: 6 }}></View>
      //       <View style={{ height: 15, width: 15, backgroundColor: '#46C646', borderRadius: 25 }}></View>
      //       <View style={{ borderLeftWidth: 2, borderColor: 'green', height: 40, width: 6, marginLeft: 6 }}></View>
      //       <View style={{ height: 15, width: 15, backgroundColor: 'green', borderRadius: 25 }}></View>

      //      </View>
      //      <View style={{ marginLeft: 14 }}>
      //       <Text style={{ fontWeight: '600', fontSize: 17 }}>Order Placed</Text>
      //       <Text>11:31pm ,1 April 2022</Text>
      //       <Text style={{ fontWeight: '600', fontSize: 17, paddingTop: 15 }}>Shiping</Text>
      //       <Text>3 April 2022</Text>
      //       <Text style={{ fontWeight: '600', fontSize: 17, paddingTop: 15 }}>Delivered</Text>
      //       <Text style={{ fontWeight: '400', fontSize: 15, }}>Your Item Has Been Delivered</Text>

      //       <Text>11:31pm ,1 April 2022</Text>
      //      </View>

      // </View>
      //     </View >

      //     <View style={{ flexDirection: 'row', margin: 5 }}>
      //      <Text style={{ color: 'red', fontWeight: '700', marginLeft: 30 }}>SHOW MORE</Text>
      //      <TouchableOpacity>
      //      <Image style={{ height: 20, width: 20, marginLeft: 5 }} source={require('../Statics/img/ecomimg/Down.png')} />
      //      </TouchableOpacity>
      //     </View>


      //     </ScrollView>

      //    </View >



      // <View style={{ borderBottomWidth: 5, borderBottomColor: 'lightgray', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

      //             <View style={{}}> <Image style={{ margin: 10 }} source={require('../Statics/img/ecomimg/Vector1.png')} />
      //             </View>
      //             <View></View>
      //           </View>

      // <View style={{ flex: 1, borderWidth: 1, borderColor: '#2DA4FE' }} >
      //                  <View style={{ marginTop: 30, height: 50, width: width, flexDirection: 'row', alignItems: 'center' }}>
      //                      <View style={{ height: '100%', width: 20, backgroundColor: '#2DA4FE', borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
      //                      <Text style={{ fontSize: 30, color: '#2DA4FE', textShadowOffset: { width: 1, height: 1 }, }}> WELCOME </Text>
      //                  </View>

      //                  <View style={{ flex: 0.9, marginTop: 100 }}>
      //                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      //                          <Image style={{ height: 230, width: 230 }} source={require('../Statics/img/Wallet/logo2.png')} />
      //                          <Text style={{ fontSize: 22, color: 'white', textShadowOffset: { width: 1, height: 1 }, }}> DaikiFintech </Text>
      //                      </View>

      //                      <View style={{ borderWidth: 1, borderColor: '#2DA4FE', borderRadius: 5, marginHorizontal: 20, marginTop: 40, marginBottom: 20, elevation: 8 }}>
      //                          <View style={{ backgroundColor: '#2DA4FE', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE', borderRadius: 5 }}>
      //                              <TouchableOpacity style={{ width: '100%' }}
      //                                  onPress={() => this.gotoNextScreen('Login')}
      //                              >
      //                                  <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, }}> LOGIN </Text>
      //                              </TouchableOpacity>
      //                          </View>
      //                      </View>

      //                      <View style={{ borderWidth: 1, borderColor: '#2DA4FE', borderRadius: 5, marginHorizontal: 20, marginBottom: 20, elevation: 8 }}>
      //                          <View style={{ backgroundColor: '#2DA4FE', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2DA4FE' }}>
      //                              <TouchableOpacity style={{ width: '100%' }}
      //                                  onPress={() => this.gotoNextScreen('Register')}>
      //                                  <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, }}> REGISTER </Text>
      //                              </TouchableOpacity>
      //                          </View>
      //                      </View>
      //                  </View>
      //             </View> 




    )
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(initialSelectionscreen);