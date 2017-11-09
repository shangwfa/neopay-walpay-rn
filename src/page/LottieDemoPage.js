import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import Animation from 'lottie-react-native'
import CommonButton from '../components/CommonButton'
import LottieLogo from '../data/animated_laptop_.json'
import demo from '../data/data.json'
import ScreenUtils from '../utils/ScreenUtils'

class LottieDemoPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='LottieDemo'/>
                <Animation
                    ref={animation => { this.animation1 = animation }}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={LottieLogo}
                />
                <CommonButton value='点击动画1' onPress={()=>{
                    this.animation1.play()
                }}/>
                <Animation
                    ref={animation => { this.animation2 = animation }}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={demo}
                    loop={false}
                    imageAssetsFolder={'lottie/'}
                />
                <CommonButton value='点击动画2' onPress={()=>{
                    this.animation2.play()
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default LottieDemoPage