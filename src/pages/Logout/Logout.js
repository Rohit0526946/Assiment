import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Alert
} from 'react-native';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCircle: true,
            DimensionData: ''
        }
    }


    componentDidMount() {
    
    }

    gotoIntroScreen = (router) => {
        Alert.alert(
            "Comfirmation!",
            "Are you sure, Do want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => this.props.navigation.navigate("Home"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => console.log("OK Pressed") }
            ]
        )
    }


    render() {

        return (
            < >
              
            </>
        )
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
export default connect(mapStateToProps)(Logout);
