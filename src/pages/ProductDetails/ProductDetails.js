import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text,
  Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions, Lineheight,
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.route.params

    }
  }


  componentDidMount() {

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
    let data = this.state.data

    console.log('hjvghuvhyuvguvvhjvhjvhjv', data);


    return (

      <SafeAreaView >
        <View style={{ width: width, height: height - 30, backgroundColor: 'white', }}>
          <View style={{ flex: 1, }} >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 20, }}>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                  <Image source={require('../../Statics/img/comImg2/leftarrow.png')} style={{ height: 15, width: 15, marginTop: 6 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 10, color: 'black' }}>Product Details</Text>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity>
                  <Image style={{ width: 25, height: 25, }} source={require("../../Statics/img/ecomimg/Search.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart', data)}>
                  <Image style={{ height: 25, width: 25, marginLeft: 10, Lineheight: 10 }} source={require('../../Statics/img/ecomimg/cart.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView>
              <View style={{ paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: 'lightgray' }}>
                <View style={{ alignItems: 'center' }}>

                  <Image style={{ height: 160, width: 160 }} source={{ uri: data.imageLink }} />
                  <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <TouchableOpacity style={{}}>
                      <Image source={require('../../Statics/img/comImg/Ellipse.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 8 }}>
                      <Image source={require('../../Statics/img/comImg/Ellipse.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 8 }}>
                      <Image source={require('../../Statics/img/comImg/Ellipse.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 8 }}>
                      <Image source={require('../../Statics/img/comImg/Ellipse.png')} />
                    </TouchableOpacity>
                  </View>
                </View>


                <View style={{ paddingLeft: 18, paddingTop: 25 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17, }}>{data.name}</Text>
                  <Text style={{ fontSize: 14, }}>{data.model}</Text>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 17, paddingTop: 4 }}>${data.newPrice}</Text>
                    <Text style={{ fontWeight: 'semibold', textDecorationLine: 'line-through', fontSize: 14, marginLeft: 5, paddingTop: 5 }}>${data.oldPrice}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: 'green', borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ color: '#fff' }}>{data.rating} </Text>
                    <Image source={require('../../Statics/img/comImg/Frame2.png')} />
                  </View>
                  <Text style={{ paddingLeft: 5, paddingTop: 8, fontSize: 11 }}>3035 Ratings | 1500 Reviews</Text>
                </View>
                <View style={{ paddingLeft: 18, paddingTop: 5 }}>
                  <Text style={{ paddingLeft: 3, color: 'green' }}>Use HAPPYGEM, Pay online and get 10% discount.</Text>
                  <Text style={{ paddingLeft: 3, fontWeight: 'bold', fontSize: 14, paddingTop: 10 }}>Delivery in 6-7 days Free Delivery With In India.</Text>

                </View>
              </View>

              <View style={{ backgroundColor: '#fff', paddingVertical: 10 }}>
                <View style={{ paddingLeft: 19, paddingTop: 5 }}>
                  <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Product Details</Text>
                  <Text style={{ paddingTop: 5, fontSize: 14, }}>Name : {data.name}</Text>
                  <Text style={{ fontSize: 14, }}>Model : {data.model}</Text>
                  <Text style={{ fontSize: 14, }}>VenderName : {data.venderName}</Text>
                  <Text style={{ fontSize: 14, }}>Certification : ISO Authorized Lab Certificate</Text>
                </View>
              </View>

              <View style={{ backgroundColor: '#fff', paddingLeft: 17, marginTop: 3, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'lightgray' }}>
                <TouchableOpacity>
                  <Text style={{ color: 'green', fontWeight: 'bold', paddingTop: 5 }}>READ MORE</Text>
                </TouchableOpacity>

                <Text style={{ paddingTop: 5, fontSize: 14, }}>Name : {data.name}</Text>
                <Text style={{ fontSize: 14 }}>Model : {data.model}</Text>
                <Text style={{ fontSize: 13 }}>Date : {data.updated}</Text>
                <Text style={{ fontSize: 14 }}>Description : {data.desc}</Text>



                <TouchableOpacity>
                  <Text style={{ color: 'green', fontWeight: 'bold', paddingTop: 10 }}>READ LESS</Text>
                </TouchableOpacity>

              </View>

              <View style={{ backgroundColor: '#fff', paddingVertical: 12 }}>

                <View style={{ paddingLeft: 17, paddingTop: 5 }}>
                  <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Product Ratings & Reviews</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 120, paddingTop: 10 }}>
                  <Text style={{ color: 'gray', fontSize: 12 }}>Excellent</Text>
                  <Text style={{ height: 5, width: 60, marginLeft: 15, backgroundColor: 'green', marginTop: 8, marginLeft: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></Text>
                  <Text style={{ height: 5, width: 60, backgroundColor: 'lightgray', marginTop: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></Text>
                  <Text style={{ marginLeft: 15, fontSize: 12, color: 'gray' }}>289</Text>
                </View>
                <View style={{ paddingLeft: 17, flexDirection: 'row' }}>
                  <Text style={{ color: 'green', fontSize: 30, fontWeight: 'bold' }}>{data.rating}</Text>
                  <Image style={{ marginTop: 14, paddingLeft: 5 }} source={require('../../Statics/img/comImg/star.png')} />

                  <View style={{ flexDirection: 'row', paddingLeft: 38, paddingTop: 12 }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Very Good</Text>
                    <Text style={{ height: 5, width: 27, marginLeft: 15, backgroundColor: 'green', marginTop: 8, marginLeft: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></Text>
                    <Text style={{ height: 5, width: 94, backgroundColor: 'lightgray', marginTop: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></Text>
                    <Text style={{ marginLeft: 18, fontSize: 12, color: 'gray' }}>80</Text>
                  </View>
                </View>
                <View style={{ paddingLeft: 17, flexDirection: 'row', }}>
                  <Text style={{ color: 'gray', fontSize: 12, }}>556</Text>
                  <View style={{ flexDirection: 'row', paddingLeft: 102, }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Good</Text>
                    <Text style={{ height: 5, width: 18, marginLeft: 15, backgroundColor: '#FED000', marginTop: 8, marginLeft: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></Text>
                    <Text style={{ height: 5, width: 102, backgroundColor: 'lightgray', marginTop: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></Text>
                    <Text style={{ marginLeft: 18, fontSize: 12, color: 'gray' }}>49</Text>
                  </View>
                </View>
                <View style={{ paddingLeft: 17, flexDirection: 'row', paddingTop: 8 }}>
                  <Text style={{ color: 'gray', fontSize: 12, }}>Ratings,</Text>
                  <View style={{ flexDirection: 'row', paddingLeft: 65, }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Average</Text>
                    <Text style={{ height: 5, width: 14, marginLeft: 15, backgroundColor: '#E1AD01', marginTop: 8, marginLeft: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></Text>
                    <Text style={{ height: 5, width: 107, backgroundColor: 'lightgray', marginTop: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></Text>
                    <Text style={{ marginLeft: 18, fontSize: 12, color: 'gray' }}>44</Text>
                  </View>
                </View>

                <View style={{ paddingLeft: 17, flexDirection: 'row', paddingTop: 8 }}>
                  <Text style={{ color: 'gray', fontSize: 12, }}>96 Reviews,</Text>
                  <View style={{ flexDirection: 'row', paddingLeft: 63, }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Poor</Text>
                    <Text style={{ height: 5, width: 20, marginLeft: 15, backgroundColor: 'red', marginTop: 8, marginLeft: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}></Text>
                    <Text style={{ height: 5, width: 101, backgroundColor: 'lightgray', marginTop: 8, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}></Text>
                    <Text style={{ marginLeft: 18, fontSize: 12, color: 'gray' }}>95</Text>
                  </View>
                </View>
              </View>
              {/* 
              <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 12 }}>
                <View style={{ paddingLeft: 17, paddingTop: 15 }}>
                  <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Check Delivery & Services</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: 'lightgray', margin: 12, flexDirection: 'row' }}>
                  <TextInput style={{ paddingLeft: 15 }} placeholder='Enter a PIN code'></TextInput>
                  <TouchableOpacity>
                    <Text style={{ color: 'gray', paddingTop: 15, paddingLeft: 152 }}>CHECK</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: 'gray', paddingLeft: 16 }}>Pay on Delivery might be available Items like</Text>
                <Text style={{ color: 'gray', paddingLeft: 16 }}>Innerwear, socks,certain accessories and</Text>
                <Text style={{ color: 'gray', paddingLeft: 16 }}>some high-value fragile items do not come</Text>
                <Text style={{ color: 'gray', paddingLeft: 16 }}>our return policy </Text>
              </View> */}

              <View style={{ backgroundColor: '#F0F8FF', marginTop: 3, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 5 }}>
                  <View style={{ alignItems: 'center', }}>
                    <Image source={require('../../Statics/img/comImg2/pricetag.png')} />
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Lowest</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}>Price</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <View style={{ paddingLeft: 20, alignItems: 'center', paddingTop: 5 }}>
                    <Image source={require('../../Statics/img/comImg2/cash.png')} />
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}> Cash on</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 5 }}> Delivery</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <View style={{ paddingLeft: 20, alignItems: 'center', }}>
                    <Image source={require('../../Statics/img/comImg2/return.png')} />
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={{ fontSize: 12, paddingLeft: 6 }}>7 day</Text>
                    <Text style={{ fontSize: 12, paddingLeft: 6 }}>returns</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={{ backgroundColor: '#fff', paddingVertical: 5, paddingLeft: 18, borderTopWidth: 1, borderTopColor: '#fff' }}>
              <View style={{ paddingTop: 3, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.addToCart(data)}>
                  <View style={{ alignItems: 'center', borderWidth: 1, borderColor: 'gray', width: 150, padding: 10, borderRadius: 5, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginLeft: 15 }} source={require('../../Statics/img/comImg2/bxcart.png')} />
                    <Text style={{ color: '#000', paddingLeft: 5 }}>Add to Cart </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart', data)}>
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
        </View >




      </SafeAreaView >

    )
  }
}




function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard, home } = state;
  // console.log("state  ", JSON.stringify(state));
  return {
    loggingIn,
    users,
    dashboard, home,
  };
}

export default connect(mapStateToProps)(ProductDetails);
