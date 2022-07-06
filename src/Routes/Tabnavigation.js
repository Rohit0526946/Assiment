import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Profile from '../pages/Profile/Profile';
// import Constants from 'expo-constants';

const FirstRoute = () => (
    <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    // <Profile />
     <View style={[styles.container, { backgroundColor: 'red' }]} />
);

export default class Tabnavigation extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Personal' },
            { key: 'second', title: 'Security' },
        ],
    };

    _handleIndexChange = (index) => this.setState({ index });

    _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    // const opacity = props.position.interpolate({
                    //     inputRange,
                    //     outputRange: inputRange.map((inputIndex) =>
                    //         inputIndex === i ? 1 : 0.5
                    //     ),
                    // });

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{}}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    render() {
        return (
            <TabView
                style={{ backgroundColor: 'red', marginTop: 50 }}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        // paddingTop: Constants.statusBarHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});