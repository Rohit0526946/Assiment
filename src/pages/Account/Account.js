import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text,
  Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
      name: '',
      isShowModal: false,
      isShowSendModal: false,
      formData: {
        "name": "",
        "address": ""
      }
    }
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',
        isShowSendModal: false,
        name: '',
      }
    }
    if (nextProps.dashboard.addedSuccessfully) {
      return {
        ...nextProps,
        isShowModal: false,
        formData: {
          "name": "",
          "address": ""
        }
      }
    } else {
      return {
        ...nextProps
      }
    }
  }
  async componentDidMount() {

    this.props.dispatch(dashboardActions.getAddress());
    this.props.dispatch(userActions.navigationSave(this.props));
    const { navigation } = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      let { users } = this.props;

      let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": users ? "Bearer " + users.token : null
      });
      const requestOptions = {
        method: "POST",
        headers: header
      }
      fetch(CONST.BACKEND_URL + `/overView`, requestOptions)

        .then(response => response.json())
        .then(data => {
          if (data && data.code === 3) {
            this.props.navigation.navigate("Login")
          }
        });
    });
    let { users } = this.props;

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": users ? "Bearer " + users.token : null
    });
    const requestOptions = {
      method: "POST",
      headers: header
    }
    fetch(CONST.BACKEND_URL + `/overView`, requestOptions)

      .then(response => response.json())
      .then(data => {

        if (data && data.code === 3) {
          this.props.navigation.navigate("Login")
        }
      });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }
  copyClipBoard = (text) => {

    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }
  submitAddressDetails = () => {
    let { formData } = this.state;
    console.log("formData  ", formData);
    this.props.dispatch(dashboardActions.addAddress(formData));
  }
  toggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  toggleSendModel = (data) => {
    if (data) {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: data.address,
        amount: '',
        name: data.name,
      })
    } else {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: '',
        amount: '',
        name: '',
      })
    }

  }
  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }
  sendFromWithOTP = (e) => {

    let { address, amount, otp } = this.state;

    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }
  sendFrom = (e) => {

    let { address, amount } = this.state;
    this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }
  render() {
    let { dashboard, users } = this.props;
    let { addressList } = dashboard;
    let formData = {}
    let { address, amount, failureMSG } = this.state;


    return (

      <View></View>
      
    )
  }
}




function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  // console.log("state  ", JSON.stringify(state));
  return {
    loggingIn,
    users,
    dashboard
  };
}

export default connect(mapStateToProps)(Account);
