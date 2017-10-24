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
import LotteryHeader from '../components/MyLotteryRecordHeader'
import LotteryContent from '../components/MyLotteryRecordContent'

class MyLotteryRecordPage extends BasePage {

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的中奖纪录'/>
                <LotteryHeader/>
                <LotteryContent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },


});

export default MyLotteryRecordPage