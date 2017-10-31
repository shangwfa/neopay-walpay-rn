import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {colors} from '../constants/index'
import {Divider} from '../components/index'
import ScreenUtils from '../utils/ScreenUtils'
import {Text} from 'react-native-animatable';
import BasePage from './BasePage'
class Test extends BasePage {

    constructor(props) {
        super(props);
    }

    render() {
        let animate={
            from: {
                'translateY': 0,
            },
            to: {
                'translateY': 100,
            },
        }
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>
                    <Text animation="zoomInUp">Zoom me up, Scotty</Text>
                    <Text animation={animate} iterationCount="infinite" duration={2000} easing='linear'>Up and down you go</Text>
                </View>
                <Divider/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content_container: {
        height: 400,
        width: ScreenUtils.width
    },
    container: {
        backgroundColor: colors.white
    }
});

export default Test
