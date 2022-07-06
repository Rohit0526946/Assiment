import React, { Component } from 'react';
import {
  View, Text, ImageBackground, StatusBar,
  Image, Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window')

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    return (

      <ImageBackground
        source={require('../Statics/img/Splash/SP2.jpg')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, width: width }}
        imageStyle={{
          resizeMode: 'stretch' // works only here!
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ height: 150, width: 150 }} source={require('../Statics/img/Splash/logo1.png')} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> Algems </Text>
        </View>
        <StatusBar hidden={true} />
      </ImageBackground>
    )
  }
}
