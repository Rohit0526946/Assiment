import React, { Component } from 'react';
import {
  View, Text,Image, TouchableOpacity
} from 'react-native';


export default class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true,

      changeImage: 1
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.changeImage >= 4) {
        this.setState({ changeImage: 1 })
      }
      else {
        this.setState({ changeImage: this.state.changeImage + 1 })
      }
    }, 5000);
  }

  gotoLoginScreen = () => {
    this.props.navigation.navigate('Login')
  }

  handleNextImage = () => {
    if (this.state.changeImage < 4) {
      this.setState({ changeImage: this.state.changeImage + 1 })
    }
    else {
      this.gotoLoginScreen();
    }
  }

  render() {
    let { changeImage } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: -200, backgroundColor: '#fff' }}>
        <View style={{
          position: 'absolute',
          top: '23%',
          zIndex: 10,
          justifyContent: 'center'

        }}>
          <Text style={{
            color: '#181a87',
            fontWeight: 'bold',
            fontSize: 15,
            marginLeft: 330
          }}
            onPress={() => this.gotoLoginScreen()}
          >SKIP</Text>
        </View>
        <View style={{
          position: 'absolute',
          top: '90%',
          zIndex: 10,
          justifyContent: 'center'

        }}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: 55,
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              // padding: 10,
              borderRadius: 100,
              backgroundColor: '#3498eb',
              marginLeft: 300

            }}>
            <Text onPress={() => this.handleNextImage()} style={{ color: '#fff', fontSize: 50, fontWeight: 'normal' }}>&#8594;</Text>
          </TouchableOpacity>

        </View>

        {changeImage === 1 ?
          <>
            <Image source={require('../../Statics/img/Intro/img-intro-slid-01.png')}
              style={{ flex: 1, resizeMode: 'contain' }} />
            <View style={{
              position: 'absolute',
              top: '70%',
              alignItems: 'center'
            }}>
              <Text style={{
                fontWeight: 'bold',
                color: '#181a87',
                fontSize: 23,
                width: 300,
                textAlign: 'center',
                marginTop: 20
              }}>Happiness is a journey, enjoy exploring it!
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: '#181a87',
                  fontSize: 16,
                  width: 300,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >Happiness is a state of emotion that most of us aspire to but are unsure about how to get there.</Text>
            </View>

          </>
          : null}

        {changeImage === 2 ?
          <>
            <Image source={require('../../Statics/img/Intro/img-intro-slid-02.png')}
              style={{ flex: 1, resizeMode: 'contain' }} />
            <View style={{
              position: 'absolute',
              top: '70%',
              alignItems: 'center'

            }}>
              <Text style={{
                fontWeight: 'bold',
                color: '#181a87',
                fontSize: 23,
                width: 300,
                textAlign: 'center',
                marginTop: 20
              }}>Get surrounded with positive people!
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: '#181a87',
                  fontSize: 16,
                  width: 300,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >Positivity acts like a shield against negativity. It forgives, heals, encourages and inspires.</Text>
            </View>

          </>
          : null}

        {changeImage === 3 ?
          <>
            <Image source={require('../../Statics/img/Intro/img-intro-slid-03.png')}
              style={{ flex: 1, resizeMode: 'contain' }} />
            <View style={{
              position: 'absolute',
              top: '70%',
              alignItems: 'center'

            }}>
              <Text style={{
                fontWeight: 'bold',
                color: '#181a87',
                fontSize: 23,
                width: 300,
                textAlign: 'center',
                marginTop: 20
              }}>Count your blessings and invest in Love!
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: '#181a87',
                  fontSize: 16,
                  width: 300,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >This helps to frame a better attitude and takes off of the negatives.</Text>
            </View>

          </>
          : null}

        {changeImage === 4 ?
          <>
            <Image source={require('../../Statics/img/Intro/img-intro-slid-04.png')}
              style={{ flex: 1, resizeMode: 'contain' }} />
            <View style={{
              position: 'absolute',
              top: '70%',
              alignItems: 'center'

            }}>
              <Text style={{
                fontWeight: 'bold',
                color: '#181a87',
                fontSize: 23,
                width: 300,
                textAlign: 'center',
                marginTop: 20
              }}>Focus on the present!
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: '#181a87',
                  fontSize: 16,
                  width: 300,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >Right now is the only moment guaranteed to us. Right now, is life. Don’t miss it.</Text>
            </View>

          </>
          : null}
      </View>
    )
  }
}
