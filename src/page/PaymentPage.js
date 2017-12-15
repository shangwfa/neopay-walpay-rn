import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    NativeModules
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import Divider from '../components/Divider'
import CommonButton from '../components/CommonButton'
import * as Animatable from 'react-native-animatable'
import KeyboardView from '../components/KeyboardView'
import constant from '../constants/constant'
import StringUtils from '../utils/StringUtils'
import TwoButtonModal from '../modal/TwoButtonModal'
import PayPwdModal from '../modal/PayPwdModal'
import {RouterPaths} from '../constants/RouterPaths'
import ScreenUtils from '../utils/ScreenUtils'
class PaymentPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isShowKeyboard: true,
            avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg',
            name: '胡萝卜的兔子店',
            animate:{
                from: {
                    'translateY': 216,
                },
                to: {
                    'translateY': 0,
                },
            },
            inputText:'',
            isShow:false,
            isPayShow:false,
            isHaveNav:false,
        }
    }

    componentDidMount(){
        if(!ScreenUtils.isIOS){
            NativeModules.commModule.isHaveBottomNav((isHaveNav)=>{
                this.setState({isHaveNav:isHaveNav})
                if(isHaveNav){
                    console.log('有底部导航栏')
                }else {
                    console.log('没有底部导航栏')
                }
            })
        }
        if(ScreenUtils.isIOSSmall){
            this.setState({isHaveNav:true})
        }
    }
    renderTop = () => {
        return <View style={this.state.isHaveNav?styles.top_container_nav:styles.top_container}>
            <Image style={styles.avatar_img} source={{uri: this.state.avatarUrl}}/>
            <Text style={styles.top_text}>{this.state.name}</Text>
        </View>
    }
    renderInput = () => {
        return (
            <TouchableOpacity  activeOpacity={1}style={styles.input_container} onPress={()=>{this.setState({animate:{from: {'translateY': 216,}, to: {'translateY': 0,},}})}}>
                <Text style={styles.input_title}>¥</Text>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    placeholder='请输入付款金额'
                    numberOfLines={1}
                    onChangeText={this.onChangeText}
                    value={this.state.inputText}
                    editable={false}
                />
            </TouchableOpacity>
        )
    }

    onCommonPress=(value)=>{
        console.log(value)
        if(this.state.inputText.length==0){//未输入时,不能输入小数点
            if(StringUtils.equals(value,'.')) return
        }
        if(this.state.inputText.length==1&&StringUtils.equals(this.state.inputText,'0')&&StringUtils.equals(value,'0')){ //首位输入一个0，在此输入0，不准输入
            return
        }
        if(StringUtils.contains(this.state.inputText,'.')&&StringUtils.equals(value,'.')){//不能输入多个小数点
            return
        }
        const arr=this.state.inputText.split('.')
        if(StringUtils.contains(this.state.inputText,'.')&&arr.length==2&&arr[1].length>=2){//最多两位小数
            return
        }

        this.setState({
            inputText:this.state.inputText+value
        })
    }
    onSpecialPress=(value)=>{
        console.log(value)
        switch (value){
            case constant.KEYBOARD_HIDE:
                this.setState({
                    animate:{
                        from: {
                            'translateY': 0,
                        },
                        to: {
                            'translateY': 216,
                        },
                    }
                })
                break
            case constant.KEYBOARD_CLEAR:
                let length=this.state.inputText.length
                if(length>0){
                    this.setState({inputText:this.state.inputText.substring(0,length-1)})
                }
                break
            case constant.KEYBOARD_ENSURE:
                break
        }
    }
    renderKeyboard = () => {
        return (
            <Animatable.View  style={styles.keyboard_container}  animation={this.state.animate}  duration={500} easing='linear'>
                <KeyboardView onCommonPress={(value)=>this.onCommonPress(value)} onSpecialPress={(value)=>this.onSpecialPress(value)}/>
            </Animatable.View >)
    }

    commite = () => {
        this.setState({isPayShow:true})
        if(StringUtils.equals(this.state.inputText,'')){
            NativeModules.commModule.toast('请输入付款金额')
        }
        if(parseFloat(this.state.inputText)<=0){
            NativeModules.commModule.toast('付款金额必须大于0')
        }
    }

    noEnoughBalanceAndChangePayType=()=>{//余额不足，更换支付方式

    }
    noEnoughBalanceAndNoBank=()=>{//余额不足，且无绑定银行卡
        this.setState({isShow:true})
    }

    payPwd=()=>{
        this.setState({isPayShow:true})
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='付款'/>
                {this.renderTop()}
                <Text style={styles.pay_text}>付款金额</Text>
                {this.renderInput()}
                <Divider style={{marginLeft: 10, marginRight: 10}}/>
                <CommonButton value='确认付款' style={{marginTop: this.state.isHaveNav?30:50}} onPress={() => this.commite()}/>
                <View style={{flex:1,height:1}}/>
                {this.renderKeyboard()}
                <TwoButtonModal isShow={this.state.isShow}  title='余额不足，绑定银行卡支付' content={'账户余额 675.87元'+'\n'+'实付金额 898.87元'} oneBtnText='关闭弹窗' twoBtnText='去绑卡'
                onePress={() => this.setState({isShow:false})} twoPress={() => {this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD,{type:3})}}/>
                <PayPwdModal isShow={this.state.isPayShow} contentFront='实付金额' contentBack='67.89元' payTypeContent='中信银行储蓄卡（5678）' onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>{}} onEnd={(text)=>{console.log('输出密码'+text)}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyboard_container:{
        height:216,
        backgroundColor:'blue',
        marginBottom:ScreenUtils.isIOSX?18:0
    },
    input: {
        marginLeft: 10,
        flex: 1,
        fontSize: 14,
        color: colors.black,
        marginTop: 2
    },
    input_title: {
        fontSize: 30,
        color: colors.black,
        marginLeft: 15
    },
    input_container: {
        flexDirection: 'row',
        marginTop: 20
    },
    pay_text: {
        fontSize: 14,
        color: colors.black,
        marginLeft: 15
    },
    top_text: {
        fontSize: 15,
        color: colors.black,
        marginTop: 35,
        marginLeft: 10
    },
    avatar_img: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginTop: 18
    },
    top_container: {
        flexDirection: 'row',
        height: 140,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    top_container_nav: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});

export default PaymentPage