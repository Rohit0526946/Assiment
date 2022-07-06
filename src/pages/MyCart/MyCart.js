import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from '../../../node_modules/react-native-razorpay/RazorpayCheckout';
import RazorpayCheckout from 'react-native-razorpay';




import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window')

class MyCart extends Component {
  constructor(props) {
    super(props)
    this.state = {

      data: this.props.route.params,
      productItems: null,
      totalAmount: 0,

    }
  }







  displayRazorpay = () => {
    // alert("hello razorPay...");

    let options = {
      description: 'Online Fee',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      amount: '25000',
      key: 'rzp_test_JeHKgWzBNdwYAj',
      name: 'Rakesh',
      prefill: {
        email: 'test@email.com',
        contact: '9191919191',
        name: 'ReactNativeForYou',
      },
      theme: { color: '#528FF0' },
    };





    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });


  }








  async componentDidMount() {
    let products = JSON.parse(await AsyncStorage.getItem("products"));
    let totalAmount = await AsyncStorage.getItem("totalAmount");
    this.setState({ products, totalAmount })

    console.log("totalAmounttotalAmounttotalAmount  ", totalAmount);
  }







  addToCart = async (data) => {
    console.log("++++++++++++++++++++++++++++++  ");
    let products = JSON.parse(await AsyncStorage.getItem("products"));
    if (products && products.length > 0) {
      let currentPrductindex = products.findIndex((element) => (element.id === data.id));

      if (currentPrductindex >= 0) {
        products[currentPrductindex]['count'] += 1;
        let { product } = products[currentPrductindex];
        products[currentPrductindex].subTotal = parseInt(products[currentPrductindex].count * product.newPrice)
        // amount = products[currentPrductindex].subTotal;
        await AsyncStorage.setItem("products", JSON.stringify(products));

      } else {
        let product = {
          id: data.id,
          product: data,
          count: 1,
          subTotal: data.newPrice,
          grandtotal: data.newPrice
        }
        products.push(product)
        await AsyncStorage.setItem("products", JSON.stringify(products))
      }
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
    AsyncStorage.getItem("products").then(async (value) => {
      let products = JSON.parse(value);
      let totalAmount = products.reduce((a, b) => ({ subTotal: a.subTotal + b.subTotal }));
      console.log("totalAmounttotalAmount  ", totalAmount);
      this.setState({ products })
      this.setState({ totalAmount: totalAmount.subTotal })
      await AsyncStorage.setItem("totalAmount", totalAmount.subTotal)
    });
  }

  onClickMenuItems = async (data, isAdd) => {
    // e.preventDefault();
    // let { name, value } = data.target;
    // let addMenuItems = this.state.addMenuItems;
    console.log("datadatadatadata", data);
    // let { users } = this.props;

    // let { productItems } = users;

    let productItems = JSON.parse(await AsyncStorage.getItem("products"));
    console.log("productItems_productItems::", productItems);


    // let itemIndex = productItems.findIndex((element) => (element.id === data.id));
    // if (itemIndex >= 0) {
    //   let currentItemData = productItems[itemIndex];
    //   if (currentItemData.isSelected) {
    //     if (isAdd) {
    //       productItems[itemIndex].count += 1;
    //     } else {
    //       if (productItems[itemIndex].count === 1) {
    //         productItems[itemIndex].count -= 1;
    //         productItems[itemIndex].isSelected = false;
    //       } else {
    //         productItems[itemIndex].count -= 1;
    //       }
    //     }
    //   } else {
    //     productItems[itemIndex].count = 1;
    //     productItems[itemIndex].isSelected = true;
    //   }
    // }
    // let userObj = {
    //   dish: productItems
    // }
    // let findSelectedIndex = productItems.filter((element) => (element.isSelected));
    //   // if (findSelectedIndex && findSelectedIndex.length > 0) {
    //   //   this.setState({ showCartPopUp: true, cartCount: findSelectedIndex.length })
    //   // } else {
    //   //   this.setState({ showCartPopUp: false, cartCount: 0 })
    //   // }

    //   // let sumCount = productItems.reduce(function (accumulator, item) {
    //   //   return accumulator + item.count;
    //   // }, 0);
    //   // this.setState({ totalCount: sumCount })
    //   // console.log("sumCount", this.state.totalCount);


    //   // this.props.dispatch(userActions.adddish(userObj));
  }

  subtractToCart = async (data) => {
    console.log("---------------");

    let products = JSON.parse(await AsyncStorage.getItem("products"));
    if (products && products.length > 0) {
      let currentPrductindex = products.findIndex((element) => (element.id == data.id));
      console.log("currentPrductindex  ", currentPrductindex);
      // console.log("products[currentPrductindex]  ", products[currentPrductindex]);

      if (currentPrductindex >= 0 && products[currentPrductindex]['count'] > 1) {
        products[currentPrductindex]['count'] -= 1;
        let { product } = products[currentPrductindex];
        products[currentPrductindex].subTotal = parseInt(products[currentPrductindex].count * product.newPrice)

        await AsyncStorage.setItem("products", JSON.stringify(products))
        // window.location.reload();
      } else {
        let currentPrductindex = products.filter((element) => (element.id != data.id));
        await AsyncStorage.setItem("products", JSON.stringify(currentPrductindex))
        // window.location.reload();
      }
    }

    AsyncStorage.getItem("products").then(async (value) => {
      let products = JSON.parse(value);
      let totalAmount = products.reduce((a, b) => ({ subTotal: a.subTotal + b.subTotal }));
      console.log("totalAmounttotalAmount  ", totalAmount);
      this.setState({ products })
      this.setState({ totalAmount: totalAmount.subTotal })
      await AsyncStorage.setItem("totalAmount", totalAmount.subTotal)
      // alert(value); // you will need use the alert in here because this is the point in the execution which you receive the value from getItem.
      // you could do your authentication and routing logic here but I suggest that you place them in another function and just pass the function as seen in the example below.
    });

  }

  removeFromCart = async (data) => {

    let products = JSON.parse(await AsyncStorage.getItem("products"));
    if (products && products.length > 0) {
      let currentPrductindex = products.filter((element) => (element.id != data.id));
      await AsyncStorage.setItem("products", JSON.stringify(currentPrductindex))
      AsyncStorage.getItem("products").then((value) => {
        let products = JSON.parse(value);
        this.setState({ products })
        // alert(value); // you will need use the alert in here because this is the point in the execution which you receive the value from getItem.
        // you could do your authentication and routing logic here but I suggest that you place them in another function and just pass the function as seen in the example below.
      });
    }

  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }


  render() {




    let totalAmount = this.state.products && this.state.products.length > 0 ? this.state.products.reduce((a, b) => ({ subTotal: a.subTotal + b.subTotal })) : null;


    return (
      <View style={{ width: width, borderWidth: 1, height: height - 24, backgroundColor: 'lightgray', borderColor: 'lightgray' }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgray' }} >
          <View style={{ marginBottom: 3, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 18, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ marginRight: 5 }} onPress={() => this.props.navigation.goBack()}>
                <Image style={{
                  width: 20,
                  height: 20,
                  marginTop: 15,
                  // backgroundColor: 'white',
                }} source={require('../../Statics/img/ecomimg/sl.png')} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: '500', marginTop: 15, textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> My Cart</Text>
            </View>
          </View>


          <ScrollView>

            <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 5 }}>
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', paddingTop: 5 }}>
                <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: '#45b6fe' }}>
                  <Text style={{ color: '#45b6fe', }}>1</Text>
                </View>
                <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: 'lightgray' }}></View>
                <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                  <Text style={{ color: 'lightgray', }}>2</Text>
                </View>
                <View style={{ borderBottomWidth: 1, width: 73, borderBottomColor: 'lightgray' }}></View>
                <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                  <Text style={{ color: 'lightgray', }}>3</Text>
                </View>
                <View style={{ borderBottomWidth: 1, width: 70, borderBottomColor: 'lightgray' }}></View>
                <View style={{ borderWidth: 1, borderRadius: 50, paddingLeft: 5, paddingRight: 5, borderColor: 'lightgray' }}>
                  <Text style={{ color: 'lightgray', }}>4</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 30 }}>
                <Text style={{ fontSize: 14, paddingLeft: 0 }}>Cart</Text>
                <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 50 }}>Address</Text>
                <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 40 }}>Payment</Text>
                <Text style={{ color: 'lightgray', fontSize: 14, paddingLeft: 35 }}>Summary</Text>
              </View>
            </View>

            {


              this.state.products && this.state.products.length > 0 ?

                this.state.products.map((element, index) => (

                  <View style={{ backgroundColor: '#fff', marginTop: 1, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ margin: 1, width: '25%' }} >
                      <TouchableOpacity>
                        <Image style={{ height: 70, width: 80 }} source={{ uri: element.product.imageLink }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                      <Text styl={{ fontWeight: 'bold', fontSize: '16' }}>{element.product.name}</Text>
                      <Text styl={{ fontSize: '14' }}>{element.product.model}</Text>

                      <Text style={{ color: 'gray' }}> Qty : {element.count} </Text>
                      <View style={{ flexDirection: 'row', paddingTop: 3, alignItems: 'center' }}>
                        <Text style={{ color: 'gray', fontSize: 14 }}>Price: {element.subTotal}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', paddingTop: 3, alignItems: 'center' }}>
                        <Image source={require('../../Statics/img/comImg2/cross.png')} />
                        <TouchableOpacity onPress={() => this.removeFromCart(element)}>
                          <Text style={{ color: '#FF69B4', fontWeight: 'bold', paddingLeft: 5 }}>Remove</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, marginLeft: 40 }}>Qty</Text>
                        <TouchableOpacity style={{}} onPress={() => this.subtractToCart(element, false)}>
                          <View style={{ width: 25, borderWidth: 1, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', borderRadius: 8, justifyContent: 'space-around', marginLeft: 8 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
                          </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, margin: 5 }}>{element.count}</Text>
                        <TouchableOpacity style={{}} onPress={() => this.addToCart(element, false)} >
                          <View style={{ width: 25, borderWidth: 1, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', borderRadius: 8, justifyContent: 'space-around', marginLeft: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>
                    <TouchableOpacity>
                      <View style={{ paddingTop: 32, paddingLeft: 120 }}>
                        <Image style={{}} source={require('../../Statics/img/comImg2/ChevronRight.png')} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
                : null
            }


            <View style={{ backgroundColor: '#fff', marginTop: 2, flexDirection: 'row', paddingVertical: 10, paddingLeft: 12 }}>
              <Text style={{ paddingLeft: 7, fontSize: 16, }}>Cart</Text>
              <Text style={{ color: 'lightgray', paddingLeft: 5 }}> | </Text>
              <Text style={{ fontSize: 15, color: '#b4b4b4', paddingLeft: 5, }}>{this.state.products && this.state.products.length > 0 ? this.state.products.length : 0}: Item</Text>
            </View>


            <View style={{ backgroundColor: '#fff', marginTop: 2, paddingVertical: 3, }}>
              <TouchableOpacity>
                <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-between' }}>
                  <Text style={{ paddingLeft: 7, fontSize: 15, fontWeight: 'bold' }}> Wishlist </Text>
                  <Image style={{ marginRight: 10 }} source={require('../../Statics/img/comImg2/ChevronRight.png')} />
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ backgroundColor: '#fff', marginTop: 2, paddingVertical: 10 }}>




              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingTop: 15, justifyContent: 'space-between', paddingRight: 20 }}>
                <Text style={{ fontSize: 15, color: '#000' }}> Total Product Price</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, color: '#000', paddingBottom: 1 }}> + </Text>
                  {/* <Image source={require('../../Statics/img/comImg2/newrup.png')} /> */}
                  <Text style={{ fontWeight: 'bold' }}>${totalAmount && totalAmount.subTotal ? totalAmount.subTotal : 0}</Text>
                </View>
              </View>





              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, justifyContent: 'space-between', paddingRight: 20 }}>
                <Text style={{ color: 'gray' }}>---------------------------------------------------------------------------------</Text>
              </View>



            </View>

            <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10 }}>
              <Image source={require('../../Statics/img/comImg2/saifty.png')} />
            </View>
            <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 13 }}>Clicking on 'Continue' will not deduct any money</Text>
            </View>
          </ScrollView >
          <View style={{ backgroundColor: '#fff', marginTop: 3, paddingVertical: 10, flexDirection: 'row' }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                {/* <Image source={require('../../Statics/img/comImg2/Indrup.png')} /> */}
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>${totalAmount && totalAmount.subTotal ? totalAmount.subTotal : 0}</Text>
              </View>
              <View style={{ paddingLeft: 13, }}>
                <TouchableOpacity>
                  <Text style={{ color: '#FF69B4', fontSize: 15, fontWeight: 'bold' }}> View Price Details</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.displayRazorpay()}>
              <View style={{ paddingLeft: 80, paddingTop: 5 }}>
                <View style={{ width: 130, padding: 10, backgroundColor: '#FF69B4', borderRadius: 5, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Continue</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </View >
      </View >
    )
  }
}
function mapStateToProps(state) {
  // //console.log("state Home::::::::::::  ", state);
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(MyCart);
