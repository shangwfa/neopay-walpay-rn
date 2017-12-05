import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    NativeModules,
    DeviceEventEmitter,
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
import {RouterPaths} from '../constants/RouterPaths'

class NewUserInfoCertifyPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            idCardNo: '',
            Phone: '',
            smsCode: '',
            openBankName: '',
            dataDetail:{provinceName:'选择省、',provinceCode:'',cityName:'市、',cityCode:'',areaName:'区',areaCode:''},
            occupation:'请选择'
        };
    }

    commit = () => {
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD,{type:2})
        // if (StringUtils.isEmpty(this.state.name)) {
        //     NativeModules.commModule.toast('姓名不能为空')
        //     return
        // }
        // if (StringUtils.isEmpty(this.state.idCardNo)) {
        //     NativeModules.commModule.toast('身份证号不能为空')
        //     return
        // }
        // if (StringUtils.isEmpty(this.state.dataDetail.provinceCode) || StringUtils.isEmpty(this.state.dataDetail.cityCode) || StringUtils.isEmpty(this.state.dataDetail.areaCode)) {
        //     NativeModules.commModule.toast('居住所在地不能为空')
        //     return
        // }
        // if (StringUtils.isEmpty(this.state.occupation)) {
        //     NativeModules.commModule.toast('职业类别不能为空')
        //     return
        // }
        // if (StringUtils.isEmpty(this.state.smsCode)) {
        //     NativeModules.commModule.toast('验证码不能为空')
        // }
        //
        // let body = {
        //     realName:this.state.name,
        //     certNo:this.state.idCardNo,
        //     proCode:this.state.dataDetail.provinceCode,
        //     cityCode:this.state.dataDetail.cityCode,
        //     areaCode:this.state.dataDetail.areaCode,
        //     jobType:this.state.occupation,
        //     verifyCode:this.state.smsCode,
        // };
        //
        // ApiManager.submitUserCerfity(body,data=>{
        //     this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD,{type:1})
        // })

    }

    choseCityClick =()=>{
        this.props.navigation.navigate(RouterPaths.CHOSE_CITY,{type:1})
    }

    choseOccupationClick = ()=>{
        this.props.navigation.navigate(RouterPaths.CHOSE_OCCUPATION)
    }

    onBlur = () => {
        ApiManager.getBankInfoByCardNo({'cardNo': this.state.cardNo},data=>{
            this.setState({
                    openBankName: data.bankName
                }
            )
        })
    }

    emitEvent = (event) => {
        switch (event.type) {
            case "choseCity"://选择红包主题
                this.setState({
                    dataDetail:event.data
                });
                console.log('^^^^'+ this.state.dataDetail.areaName)
                // console.log('^^^^'+ event.data.areaName)
                break;
            case "choseOccupation"://选择红包主题
                this.setState({
                    occupation:event.data.type
                });
                break;
        }

    };

    render() {
        const nameData = {'key': '姓名', 'placeholder': '请填写真实姓名', isLine: true}
        const idCardNameData = {'key': '身份证号', 'placeholder': '请填写身份证号', isLine: true}
        const cardNumData = {'key': '居住所在地', 'placeholder': this.state.dataDetail.provinceName+this.state.dataDetail.cityName+this.state.dataDetail.areaName, isLine: true}
        const openAccountBankData = {'key': '职业类别', 'placeholder': this.state.occupation}
        const phoneData = {'key': '手机号', 'placeholder': '请填写银行预留手机号', 'keyboard': 'numeric', isLine: true}
        const verifyCodeData = {'key': '验证码', 'placeholder': '请填写验证码', 'keyboard': 'numeric', 'isVerfyCode': true}
        const tips = '注:认证通过后，该账号关联的信息不可更改'
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='实名认证'/>
                <View style={{height: 10}}/>
                <CommonInput data={nameData} onChangeText={(text) => this.setState({name: text})}/>
                <CommonInput data={idCardNameData} onChangeText={(text) => this.setState({idCardNo: text})}/>
                <CommonInput data={cardNumData} editable={false} noEditText={this.state.openBankName} tapClick={()=>this.choseCityClick()}/>
                <CommonInput data={openAccountBankData} editable={false} noEditText={this.state.openBankName} tapClick={()=>this.choseOccupationClick()}/>
                <View style={{height: 10}}/>
                <CommonInput data={phoneData} onChangeText={(text) => this.setState({bindPhone: text})}/>
                <CommonInput data={verifyCodeData} phone={this.state.bindPhone}
                             onChangeText={(text) => this.setState({smsCode: text})} type={1}/>
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

export default NewUserInfoCertifyPage