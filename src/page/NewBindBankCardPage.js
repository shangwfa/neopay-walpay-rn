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
import NetUtil from '../utils/NetUtil'
import StringUtils from '../utils/StringUtils'
import {APIS} from "../constants/API"
import ApiManager from '../utils/ApiManager'
import TimePicker from '../modal/TimePicker'


class NewBindBankCardPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isCreditCard:false,
            name: '',
            cardNo: '',
            bankCode: '',
            bindPhone: '',
            smsCode: '',
            openBankName: '开户银行',
            date:'请选择信用卡有效期',
            param:this.props.navigation.state.params,
        };
    }

    componentWillMount() {
        this.getUserInfo();
    }

    commit = () => {
        if (StringUtils.isEmpty(this.state.cardNo)) {
            NativeModules.commModule.toast('银行卡号不能为空')
            return
        }
        if (StringUtils.isEmpty(this.state.bindPhone)) {
            NativeModules.commModule.toast('手机号不能为空')
        }
        if (StringUtils.isEmpty(this.state.smsCode)) {
            NativeModules.commModule.toast('验证码不能为空')
        }

        if(this.state.isCreditCard)
        {
            if (StringUtils.isEmpty(this.state.cvv2)) {
                NativeModules.commModule.toast('cvv2不能为空')
            }

            if (this.state.date == '请选择信用卡有效期') {
                NativeModules.commModule.toast('请选择信用卡有效期')
            }
        }

        let body;

        if(this.state.isCreditCard)
        {
            body = {
                cardNo:this.state.cardNo,
                phone:this.state.bindPhone,
                cvv2:this.state.cvv2,
                validDate:this.state.date,
                smsCode:this.state.smsCode,
            }
        }else {
            body = {
                cardNo:this.state.cardNo,
                phone:this.state.bindPhone,
                smsCode:this.state.smsCode,
            }
        }

        ApiManager.bindBankCard(body,data=>{
            this.props.navigation.goBack();
        })

    }

    getUserInfo=()=>{

        ApiManager.getUserInfo((data)=>{
            this.setState({
                name:data.name,
                bindPhone:data.phone
            })
            console.log('name is ' + this.state.name)
        })
    }

    onBlur = () => {
        ApiManager.getBankInfoByCardNo({'cardNo': this.state.cardNo},data=>{
            this.setState({
                    openBankName: data.bankName,
                    isCreditCard: data.cardType == 2?true:false
                }
            )
        })
    }

    choseDate=()=>{
        TimePicker.showTimePicker((value) => {
            console.log('--->' + value)
            let dates = value.toString().split(',')

            let date = ''
            if(dates[1]>9)
            {
                date = dates[0] + '-' + dates[1]
            }else
            {
                date = dates[0] + '-0' + dates[1]
            }

            this.setState({
                    date:date,
                }
            )
        },'Y-M')
    }

    renderTopView =()=>{
        const nameData = {'key': '姓名', 'placeholder': this.state.name==''?'':'*' + this.state.name.substring(1,this.state.name.length), isLine: true}
        const cardNumData = {'key': '卡号', 'placeholder': '请填写银行卡号', isLine: true}
        const idCardNameData = {'key': '开户银行', 'placeholder': '开户银行', isLine: true}
        return(
            <View>
                <CommonInput data={nameData} editable={false}/>
                <CommonInput data={cardNumData} keyboardType = {'number-pad'} onChangeText={(text) => this.setState({cardNo: text})} onBlur ={()=>this.onBlur()}/>
                <CommonInput data={idCardNameData} editable={false} noEditText={this.state.openBankName} isShowArrow = {true}/>
            </View>
        )

    }

    renderMidView =()=>{
        const CVV2Data = {'key': 'CVV2', 'placeholder': '信用卡背面签名栏末三位数字', isLine: true}
        const dateInfo = {'key': '有效期', 'placeholder':this.state.date, isLine: true}
        if(this.state.isCreditCard){
            return(
                <View>
                    <CommonInput data={CVV2Data} onChangeText={(text) => this.setState({cvv2: text})}/>
                    <CommonInput data={dateInfo} editable={false} noEditText={this.state.date} tapClick={()=>this.choseDate()}/>
                </View>
            )
        }else{
            return null
        }

    }

    render() {
        const phoneData = {'key': '手机号', 'placeholder': this.state.bindPhone, 'keyboard': 'numeric', isLine: true,'inputOver':true}
        const verifyCodeData = {'key': '验证码', 'placeholder': '请填写验证码', 'keyboard': 'numeric', 'isVerfyCode': true}
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='绑定银行卡'/>
                {this.renderTopView()}
                {this.renderMidView()}
                <View style={{height: 10}}/>
                <CommonInput data={phoneData}  onChangeText={(text) => this.setState({bindPhone: text})}/>
                <CommonInput data={verifyCodeData} phone={this.state.bindPhone}
                             onChangeText={(text) => this.setState({smsCode: text})} type = {2} info={{cardNo:this.state.cardNo,bindCardType:this.state.param.type,cvv2:this.state.cvv2,validDate:this.state.date,phone:this.state.bindPhone,isCreditCard:this.state.isCreditCard}}/>
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

export default NewBindBankCardPage