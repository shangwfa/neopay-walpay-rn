import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import invalide_qr_code from '../res/img/invalide_qr_code.png'

class InvalidQrCodePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='无效二维码'/>
                <View style={styles.content_container}>
                    <Image style={styles.img} source={invalide_qr_code}/>
                    <Text style={styles.text}>很抱歉！无法识别该二维码</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#B5B5B5',
        marginTop:18
    },
    img: {
        width: 72,
        height: 60,
    },
    content_container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default InvalidQrCodePage