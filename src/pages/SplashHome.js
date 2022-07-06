import React, { Component } from 'react';
import {
    View, Image,
} from 'react-native';
export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'white',justifyContent:'center',alignItems:'center' }}>
                <Image source={require('../Statics/img/Splash/splash.png')}
                    style={{ flex: 1 ,resizeMode:'cover' }} />
            </View>
        )
    }
}
