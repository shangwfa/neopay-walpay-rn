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
import PayPwdModal from '../modal/PayPwdModal'



class AccountWithdrawPage extends BasePage {
    constructor(props){
        super(props);
        this.state={
            isPayShow:false,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'提现'} rightTitle={'?'}/>
                <View style={styles.bankCardRowView}>
                    <Image style={styles.bankCardRowIcon} source={require("../res/img/BankIcon/sy_gongshang.png")}/>
                    <View style={styles.bankCardRowTextView}>
                        <Text style={styles.bankCardRowText}>中国工商银行储蓄卡(8988)</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    <Image style={styles.bankCardRowArrow} source={require("../res/img/right_arrow.png")}/>
                </View>
                <View style={styles.numberRowView}>
                    <Text style={styles.numberRowViewText}>可提现金额 678.89元</Text>
                    <View style={styles.numberRowViewNoView}>
                        <Text style={styles.numberRowViewRMB}>¥</Text>
                        <TextInput
                            placeholder='请输入提现金额'
                            style={styles.numberRowViewNumber}
                            keyboardType={'numeric'}
                        />
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
                <PayPwdModal isShow={this.state.isPayShow} contentFront='实付金额' contentBack='67.89元' payTypeContent='中信银行储蓄卡（5678）' onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>{}} onEnd={()=>this.payPwdInputEnd()}/>
            </View>
        );
    }
    withdrawBtnClicked(){
        this.setState({isPayShow:true})
    }
    payPwdInputEnd(){
        this.setState({isPayShow:false})
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
        width:20,
        height:20,
        marginLeft:14,
        marginRight:8,
    },
    bankCardRowText:{
        fontSize:14,
        color:'#333333',
    },
    bankCardRowArrow:{
        width:7,
        height:12,
        marginRight:14,
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