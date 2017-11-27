import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    NativeModules
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import CommonInput from '../components/CommonInput'
import CommonButton from '../components/CommonButton'
import {colors} from '../constants/index'
import StringUtils from '../utils/StringUtils'
import {APIS} from "../constants/API"
import ApiManager from '../utils/ApiManager'


class BindBankCardPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            idCardNo: '',
            bankCardNo: '',
            bankCode: '',
            bindPhone: '',
            smsCode: '',
            openBankName: ''
        };
    }

    commit = () => {
        const {name, idCardNo, bankCardNo, bankCode, bindPhone, smsCode} = this.state
        if (StringUtils.isEmpty(name)) {
            NativeModules.commModule.toast('姓名不能为空')
            return
        }
        if (StringUtils.isEmpty(idCardNo)) {
            NativeModules.commModule.toast('身份证号不能为空')
            return
        }
        // if(StringUtils.isEmpty(bankCode)){
        //     NativeModules.commModule.toast('银行卡号不能为空')
        //     return
        // }
        if (StringUtils.isEmpty(smsCode)) {
            NativeModules.commModule.toast('验证码不能为空')
        }
        //提交添加银行卡
        const req = {
            'name': name,
            'certNo': idCardNo,
            'cardNo': bankCardNo,
            'bankCode': 'ABC',
            'phone': bindPhone,
            'smsCode': smsCode,
            'bindCardType': 2
        }
        ApiManager.bindBankCard(req,data=>{

        })

    }

    onBlur = () => {
        ApiManager.getBankInfoByCardNo({'cardNo': this.state.cardNo},data=>{
            this.setState({
                    openBankName: data.bankName
                }
            )
        })
    }

    render() {
        const nameData = {'key': '姓名', 'placeholder': '请填写真实姓名', isLine: true}
        const idCardNameData = {'key': '身份证号', 'placeholder': '请填写身份证号', isLine: true}
        const cardNumData = {'key': '卡号', 'placeholder': '请填写银行卡号', isLine: true}
        const openAccountBankData = {'key': '开户银行', 'placeholder': '开户银行'}
        const phoneData = {'key': '手机号', 'placeholder': '请填写银行预留手机号', 'keyboard': 'numeric', isLine: true}
        const verifyCodeData = {'key': '验证码', 'placeholder': '请填写验证码', 'keyboard': 'numeric', 'isVerfyCode': true}
        const tips = '注:认证通过后，该账号关联的信息不可更改'
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='添加绑定银行卡'/>
                <View style={{height: 10}}/>
                <CommonInput data={nameData} onChangeText={(text) => this.setState({name: text})}/>
                <CommonInput data={idCardNameData} onChangeText={(text) => this.setState({idCardNo: text})}/>
                <CommonInput data={cardNumData} onChangeText={(text) => this.setState({bankCardNo: text})}
                             onBlur={() => this.onBlur()}/>
                <CommonInput data={openAccountBankData} editable={false} noEditText={this.state.openBankName}/>
                <View style={{height: 10}}/>
                <CommonInput data={phoneData} onChangeText={(text) => this.setState({bindPhone: text})}/>
                <CommonInput data={verifyCodeData} phone={this.state.bindPhone}
                             onChangeText={(text) => this.setState({smsCode: text})}/>
                <Text style={styles.tips}>{tips}</Text>
                <CommonButton value='确定' style={{marginTop: 75}} onPress={() => this.commit()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tips: {
        marginLeft: 10,
        fontSize: 12,
        color: colors.black_light,
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default BindBankCardPage