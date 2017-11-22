import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import ScrnUtil from '../utils/ScreenUtils'
import CommonButton from "../components/CommonButton";
import {RouterPaths} from "../constants/RouterPaths"
import Divider from "../components/Divider"
import CommonItemThree from '../components/CommonItemThree'

class AccountWithdrawPage extends BasePage {
    constructor(props){
        super(props)
        global.backKey=nav.state.key
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'提现'} rightIcon={require("../res/img/HomePage/sy_wenhao.png")} rightIconStyle={{height: 20}}/>
                <CommonItemThree style={{marginTop: 10}} source={require("../res/img/BankIcon/sy_gongshang.png")} title='中国工商银行储蓄卡(8988)' onPress={() => {}}/>
                {this.renderDetailRow()}
                <CommonButton style={{marginTop:50}} value={'提现'} onPress={() => this.withdrawBtnClicked()}/>
            </View>
        );
    }


    renderDetailRow = () => {
        return (
            <View style={styles.numberRowView}>
                <Text style={styles.numberRowViewText}>可提现金额 678.89元</Text>
                <View style={styles.numberRowViewNoView}>
                    <Text style={styles.numberRowViewRMB}>¥</Text>
                    <TextInput
                        placeholder='请输入提现金额'
                        style={styles.numberRowViewNumber}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <Divider style={{marginTop:16,marginLeft:10,marginRight:10}}/>
                <Text style={styles.numberRowViewAttachText}>收取0.1%的服务费</Text>
            </View>
        )
    };

    withdrawBtnClicked() {
        this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    bankCardRowView: {
        flexDirection: 'row',
        height: 51,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginTop: 10,
    },
    bankCardRowIcon: {
        height: 20,
        width: 20,
        marginLeft: 14,
        marginRight: 8,
    },
    bankCardRowText: {},
    bankCardRowArrow: {
        width: 7,
        height: 12,
        marginRight: 20,
    },

    numberRowView: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,

    },
    numberRowViewText: {
        marginTop: 19,
        marginLeft: 12,
        fontSize: 14,
        color: '#666666',
    },
    numberRowViewNoView: {
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
    },
    numberRowViewRMB: {
        fontSize: 30,
        color: '#000000',
        marginLeft: 12,
        marginTop: ScrnUtil.isIOS ? 3 : 0
    },
    numberRowViewNumber: {
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    //分割线
    numberRowViewUnderlineView: {
        alignItems: 'center',
        marginTop: 16,
    },
    numberRowViewUnderline: {
        height: 1.0,
        width: ScrnUtil.width - 20,
        backgroundColor: '#DADADA',
    },
    numberRowViewAttach: {
        alignItems: 'flex-end',

    },
    numberRowViewAttachText: {
        width:ScrnUtil.width,
        fontSize: 12,
        color: '#999999',
        textAlign:'right',
        marginTop: 13,
        marginBottom: 14,
        paddingRight: 12,
    },


});

export default AccountWithdrawPage