import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import ScrnUtil from '../utils/ScreenUtils'
import CommonButton from "../components/CommonButton";
import {RouterPaths} from "../constants/RouterPaths"


class AccountWithdrawPage extends BasePage {
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'提现'} rightTitle={'?'}/>
                <View style={styles.bankCardRowView}>
                    <Image style={styles.bankCardRowIcon} source={require("../res/img/BankIcon/sy_gongshang.png")}/>
                    <View style={styles.bankCardRowText}>
                        <Text>中国工商银行储蓄卡(8988)</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    <Image style={styles.bankCardRowArrow} source={require("../res/img/right_arrow.png")}/>
                </View>
                <View style={styles.numberRowView}>
                    <Text style={styles.numberRowViewText}>可提现金额 678.89元</Text>
                    <View style={styles.numberRowViewNoView}>
                        <Text style={styles.numberRowViewRMB}>¥</Text>
                        <TextInput placeholder='请输入提现金额' style={styles.numberRowViewNumber}/>
                    </View>
                    <View style={styles.numberRowViewUnderlineView}>
                        <View style={styles.numberRowViewUnderline}>

                        </View>
                    </View>
                    <View style={styles.numberRowViewAttach}>
                        <Text style={styles.numberRowViewAttachText}>
                            收取0.1%的服务费
                        </Text>
                    </View>
                </View>
                <View style={styles.confirmBtnView}>
                    <CommonButton value={'提现'} onPress={()=>this.withdrawBtnClicked()}/>
                </View>
            </View>
        );
    }
    withdrawBtnClicked(){
        this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE)
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.page_background,
    },
    bankCardRowView:{
        flexDirection:'row',
        height:51,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        marginTop:10,
    },
    bankCardRowIcon:{
        marginLeft:14,
        marginRight:8,
    },
    bankCardRowText:{

    },
    bankCardRowArrow:{
        width:7,
        height:12,
        marginRight:20,
    },

    numberRowView:{
        backgroundColor:'#FFFFFF',
        marginTop:10,

    },
    numberRowViewText:{
        marginTop:19,
        marginLeft:12,
        fontSize:14,
        color:'#666666',
    },
    numberRowViewNoView:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'flex-end',
    },
    numberRowViewRMB:{
        fontSize:30,
        color:'#000000',
        marginLeft:12,
    },
    numberRowViewNumber:{
        fontSize:14,
        marginLeft:10,
    },
    //分割线
    numberRowViewUnderlineView:{
        alignItems:'center',
        marginTop:16,
    },
    numberRowViewUnderline:{
        height:1.0,
        width:ScrnUtil.width-20,
        backgroundColor:'#DADADA',
    },
    numberRowViewAttach:{
        alignItems:'flex-end',
        marginTop:13,
        marginBottom:14,
        marginRight:12,
    },
    numberRowViewAttachText:{
        fontSize:12,
        color:'#999999',
    },
    confirmBtnView:{
        marginTop:50,
    }


});

export default AccountWithdrawPage