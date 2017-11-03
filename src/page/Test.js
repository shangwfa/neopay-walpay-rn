import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import {colors} from '../constants/index'
import BasePage from './BasePage'
import ScreenUtils from '../utils/ScreenUtils'
class Test extends BasePage {

    constructor(props) {
        super(props);
        console.log('width:'+ScreenUtils.width+' height:'+ScreenUtils.height+' pixelRatio:'+ScreenUtils.pixelRatio)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>
                    <View style={{height:50}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    close_icon: {
        width: 11,
        height: 11,
        marginLeft: 13
    },
    top_container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    content_container: {
        width: 316,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius:5,
    },
    container: {
        backgroundColor: colors.page_background,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Test
