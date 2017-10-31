import React from 'react'
import {Dimensions, Animated, StatusBar, View} from 'react-native'
const maxHeight = Dimensions.get('window').height
const maxWidth = Dimensions.get('window').width
const splashImg = require('../res/img/splash.png')
import {RouterPaths} from '../constants/RouterPaths'
import BasePage from './BasePage'
class Splash extends BasePage {

    constructor(props) {
        super(props)
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const { navigate } = this.props.navigation
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();

        this.timer = setTimeout(() => {
            navigate(RouterPaths.HOME_PAGE)
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View>
                {/*隐藏状态栏*/}
                <StatusBar hidden={true}/>
                <Animated.Image
                    style={{
                        width: maxWidth,
                        height: maxHeight,
                        transform: [{scale: this.state.bounceValue}]
                    }}
                    source={splashImg}
                />
            </View>

        );
    }
}

export default Splash