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
import ApiManager from '../utils/ApiManager'



class RedPacketRecord extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "receiveAmount": 0,
                "receiveCount": 0,
                "sendAmount": 0,
                "sendCount": 0
            }
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包记录' rightTitle='红包交易明细'onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.RED_PACKET_RECORD_LIST,{QueryType:3})
                }} header_middleStyle={{flex:1.4}}/>
                <RedPacketRecordCell cellType={true} amount={this.state.data.receiveAmount} count={this.state.data.receiveCount}/>
                <RedPacketRecordCell cellType={false} amount={this.state.data.sendAmount} count={this.state.data.sendCount}/>
            </View>
        );
    }

    componentDidMount(){
        ApiManager.getUserRedPacketStats({},(data)=>{
            console.log(data)
            this.setState({
                data:data
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RedPacketRecord