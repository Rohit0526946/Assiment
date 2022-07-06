import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

export function DrawerContent(props) {
  console.log("propspropspropsprops  ", props.navigation);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            width: '100%'
          }}>

          <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 170,
            marginTop: -4,
            borderColor: 'black',
            borderWidth: 1, elevation: 8,
          }}>
            <View style={{ flex: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', }} >
              <Image style={{ height: 110, width: 110 }} source={require('../Statics/img/Splash/logo1.png')} />
            </View>
          </View>

          <View style={{
            padding: 20
          }}>

            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20
              }}
              >
                <View style={{
                  width: '10%',
                }}>
                  <Image style={{
                    width: 30,
                    height: 30

                  }} source={require('../Statics/img/Sidebar/security.png')} />

                </View>
                <View style={{
                  width: '80%',

                }}>
                  <Text style={{
                    color: '#757575',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 5
                  }}> LOG IN</Text>
                </View>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => props.navigation.navigate('MyCart')}>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20
              }}
              >
                <View style={{
                  width: '10%',
                }}>
                  <Image style={{
                    marginLeft: 5,
                    width: 30,
                    height: 30

                  }} source={require('../Statics/img/Sidebar/Cart.png')} />

                </View>
                <View style={{
                  width: '80%',

                }}>
                  <Text style={{
                    color: '#757575',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 2
                  }}>MY CART</Text>
                </View>

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('OrderHistory')}>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20
              }}
              >
                <View style={{
                  width: '10%',
                }}>
                  <Image style={{
                    marginTop: 5, marginLeft: 5,
                    width: 25,
                    height: 25

                  }} source={require('../Statics/img/Sidebar/transaction.png')} />

                </View>
                <View style={{
                  width: '80%',

                }}>
                  <Text style={{
                    color: '#757575',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 2
                  }}>ORDER HISTORY</Text>
                </View>

              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs')}>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20
              }}
              >
                <View style={{
                  width: '10%',
                }}>
                  <Image style={{
                    marginTop: 5, marginLeft: 5,
                    width: 25,
                    height: 25

                  }} source={require('../Statics/img/Sidebar/contact_us_black.png')} />

                </View>
                <View style={{
                  width: '80%',

                }}>
                  <Text style={{
                    color: '#757575',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 20,
                    marginTop: 2
                  }}>CONTECT US</Text>
                </View>

              </View>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={{
            marginTop: -20
          }}
            onPress={() => props.navigation.navigate('SelectionScreen')}>
            <View style={{
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                marginLeft: 20

              }}>
                <Image style={{
                  width: 30,
                  height: 30

                }} source={require('../Statics/img/Sidebar/logout_black.png')} />

              </View>
              <View style={{
                width: '50%'

              }}>
                <Text style={{
                  color: '#757575',
                  fontSize: 17,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 15
                }}>LOGOUT</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    </View>
  )
}
