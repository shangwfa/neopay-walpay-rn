import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonItemTwo from '../components/CommonItemTwo'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import ChoseBankCardItem from  '../components/ChoseBankCardItem'
import CommonInput from  '../components/CommonInput'
import CommonButton from  '../components/CommonButton'

class AccountTopupPage extends BasePage {
    // componentWillMount() {
    //     NetUtil.post('pay/query_user_order_page', {}, (data) => {
    //         this.setState({
    //             data: data
    //         })
    //     })
    // }
    constructor(props) {
        super(props)
        this.state = {
            inputText: ''
        }
    }

    render() {
        const nameData = {'key': '金额', 'placeholder': '请输入充值金额'}
        const dataV  = {
                imgUrl: '',
                bankName: '中国工商银行',
                bankCardNo: '8888'
            }

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='充值' rightTitle='=='/>
                <ChoseBankCardItem style = {styles.top} imgIconUrl = {dataV.imgUrl} bankNameValue = {dataV.bankName} cardNoValue = {dataV.bankCardNo} click = {()=>this.onPress()}/>
                <View style = {styles.middleView}/>
                <CommonInput data = {nameData} onChangeText={(text) => this.onChangeText(text)}/>
                <Text style = {styles.remind}>*单日充值限额50000.00元</Text>
                <CommonButton value='充值' style={{marginTop:50 }} onPress={()=>this.goTopup()}/>

            </View>
        );
    }

    onChangeText = (text) => {
        this.state = {
            inputText: text
        }
    }

    choseBankCard = () => {

    }

    goTopup = () => {
        this.props.navigation.navigate(RouterPaths.ACCOUNT_TOPUP_RESULT)
    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.page_background,
        alignItems:'center'
    },
    container: {
        backgroundColor: colors.page_background,
    },
    top:{
        marginTop:10
    },
    remind:{
        marginTop:15,
        marginLeft:10,
        fontSize:13,
        color:colors.balck_more_light
    },
    middleView:{
        height:10,
        backgroundColor: colors.page_background
    }
});

export default AccountTopupPage