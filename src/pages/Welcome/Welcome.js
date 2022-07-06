import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   View, Text,TouchableOpacity, ImageBackground, TextInput, Button
} from 'react-native';

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    gotoSurveyScreen=()=>{
        this.props.navigation.navigate('FirstSurvey');
    }

    render() {

        return (<Text>hello welcome here</Text>)
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { dashboard } = state;
    return {
      loggingIn,
      dashboard
    };
  }
  export default connect(mapStateToProps)(Welcome);
  