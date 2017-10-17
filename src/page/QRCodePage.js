import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native'
import QRCode from 'react-native-qrcode'
import BasePage from './BasePage'
import ScreenUtils from '../utils/ScreenUtils'

class QRCodePage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            text: 'http://facebook.github.io/react-native/',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                />
                <QRCode
                    value={this.state.text}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        width:ScreenUtils.width-40,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

export default QRCodePage