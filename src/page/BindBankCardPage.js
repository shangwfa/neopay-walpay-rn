import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import CommonInput from '../components/CommonInput'
import CommonButton from '../components/CommonButton'
import {colors} from '../constants/index'
class BindBankCardPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            idCardName:'',
            cardNum:'',
            openAccountBank:'',
            phone:'',
            verifyCode:''
        };
    }
    commit=()=>{
        //提交添加银行卡
    }

    render() {
        const nameData = {'key': '姓名', 'placeholder': '请填写真实姓名',isLine:true}
        const idCardNameData={'key': '身份证号', 'placeholder': '请填写身份证号',isLine:true}
        const cardNumData={'key': '卡号', 'placeholder': '请填写银行卡号',isLine:true}
        const openAccountBankData={'key': '开户银行', 'placeholder': '开户银行'}
        const phoneData={'key': '手机号', 'placeholder': '请填写银行预留手机号',isLine:true}
        const verifyCodeData={'key': '验证码', 'placeholder': '请填写验证码'}
        const tips='注:认证通过后，该账号关联的信息不可更改'
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='添加绑定银行卡'/>
                <View style={{height:10}}/>
                <CommonInput data={nameData} onChangeText={(text) => this.setState({name:text})}/>
                <CommonInput data={idCardNameData} onChangeText={(text) => this.setState({idCardName:text})}/>
                <CommonInput data={cardNumData} onChangeText={(text) => this.setState({cardNum:text})}/>
                <CommonInput data={openAccountBankData} onChangeText={(text) => this.setState({openAccountBank:text})}/>
                <View style={{height:10}}/>
                <CommonInput data={phoneData} onChangeText={(text) => this.setState({phone:text})}/>
                <CommonInput data={verifyCodeData} onChangeText={(text) => this.setState({verifyCode:text})}/>
                <Text style={styles.tips}>{tips}</Text>
                <CommonButton value='确定' style={{marginTop:75}} onPress={this.commit()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tips:{
      marginLeft:10,
        fontSize:12,
        color:colors.black_light,
        marginTop:10
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default BindBankCardPage