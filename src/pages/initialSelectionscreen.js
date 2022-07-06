import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
  View, Text, Dimensions,
  Image, TouchableOpacity, BackHandler, Alert
} from 'react-native';

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

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, borderWidth: 1, borderColor: '#fff' }} >

          <View style={{ flex: 0.9, marginTop: 80 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 140, width: 140 }} source={require('../Statics/img/Splash/logo1.png')} />
              <Text style={{ fontSize: 22, fontWeight: 'bold',marginTop:10 }}> Algems </Text>
            </View>

            <View style={{ borderRadius: 5, marginHorizontal: 20, marginTop: 80, marginBottom: 20, elevation: 5 }}>
              <View style={{ backgroundColor: '#FF69B4', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FF69B4', borderRadius: 5 }}>
                <TouchableOpacity style={{ width: '100%' }}
                  onPress={() => this.gotoNextScreen('Login')}
                >
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}> LOGIN </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ borderRadius: 5, marginHorizontal: 20, marginBottom: 20, elevation: 5 }}>
              <View style={{ backgroundColor: '#FF69B4', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FF69B4' }}>
                <TouchableOpacity style={{ width: '100%' }}
                  onPress={() => this.gotoNextScreen('Register')}>
                  <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}> REGISTER </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
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