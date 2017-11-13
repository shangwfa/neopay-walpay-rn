import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import RedPacketRecordCell from '../components/RedPacketRecordCell'
import {RouterPaths} from '../constants/RouterPaths'


class RedPacketRecord extends BasePage {

    constructor(props){
        super(props);
        this.state={
            data:{recItem:26,recNum:898.78,sendItem:40,sendNum:1000.00}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包记录' rightTitle='红包交易明细'onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.RED_PACKET_RECORD_LIST)
                }}/>
                <RedPacketRecordCell cellType={true}/>
                <RedPacketRecordCell cellType={false}/>
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

export default RedPacketRecord