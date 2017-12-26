import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput, NativeModules,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import ScrnUtil from '../utils/ScreenUtils'
import CommonButton from "../components/CommonButton";
import {RouterPaths} from "../constants/RouterPaths"
import Divider from "../components/Divider"
import CommonItemThree from '../components/CommonItemThree'
import ApiManager from '../utils/ApiManager'
import SelectPayStyleModal from '../modal/SelectPayStyleModal'
import PayPwdModal from '../modal/PayPwdModal'
import FormatUtils from "../utils/FormatUtils";


class AccountWithdrawPage extends BasePage {
    constructor(props){
        super(props)
        global.backKey=nav.state.key
        this.state={
            withdrawAmount:0.00,
            withdrawBalance:0.00,
            isShowSelectPayStyle:false,
            bankCardExist:false,
            selectedBankId:0,
            selectedBankName:'',
            selectedBankCardNo:'',
            selectedBankIconUrl:'',
            isPayShow:false,
            orderNo:'',
            textInputFontSize:14,
            textInputPlaceHolder:'请输入提现金额',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        title={'提现'} rightIcon={require("../res/img/HomePage/sy_wenhao.png")}
                        rightIconStyle={{height: 20}}
                        onRightPress={()=>this.questionmarkPressed()}/>

                <CommonItemThree style={{marginTop: 10}}
                                 source={this.renderBankCardIcon()}
                                 title={this.state.bankCardExist?`${this.state.selectedBankName}(${this.state.selectedBankCardNo})`:'添加绑定银行卡'}
                                 onPress={()=>this.selectBankCard()}/>

                {this.renderDetailRow()}
                <CommonButton style={{marginTop:50}} value={'提现'} onPress={() => this.withdrawBtnClicked()}/>
                <SelectPayStyleModal
                    title="选择提现银行卡"
                    bankCardOnly={true}
                    selectBankId={this.state.selectedBankId}
                    bankCardFooterItemClick={this.handleBankCardFooterItemClick.bind(this)}
                    bankCardItemClick={this.handleBankCardItemClick.bind(this)}
                    closeClick={this.handleSelectPayStyleCloseClick.bind(this)}
                    isShow={this.state.isShowSelectPayStyle}/>
                <PayPwdModal isShow={this.state.isPayShow}
                             contentFront='提现金额'
                             contentBack={FormatUtils.money(this.state.withdrawAmount)}
                             payTypeContent={this.retPayTypeContent()}
                             onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>this.forgetPayPwdBtnClicked()}
                             onEnd={(text)=>this.pwdInputFinished(text)}
                             selectPayStyleClick={()=>{this.selectPayStyleBtnClick()}}
                             payTypeBalanceOnly={true}
                />
            </View>
        );
    }

    //点击标题栏问号图标
    questionmarkPressed=()=>{
        this.props.navigation.navigate(RouterPaths.INSTRUCTIONS_PAGE);
    }

    //处理银行卡信息
    retPayTypeContent=()=>{
        // if (this.state.selectedBankId==-1)
        //     return this.state.selectedBankName;
        // else
        //     return this.state.selectedBankName+'('+this.state.selectedBankCardNo.slice(-4)+')';
        return '余额';
    }


    //忘记支付密码按钮点击
    forgetPayPwdBtnClicked =()=>{
        this.setState({
            isPayShow:false
        })
        const params = {page: 'resetPayPwd'};
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    }



    //输入密码完成
    pwdInputFinished =(text) =>{

        ApiManager.withdraworder({'orderNo':this.state.orderNo,'payPassword':text,'tradeNo':this.state.orderNo},(data)=>{
            this.setState({
                isPayShow:false
            });
            nav.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE,{data:data});
        })

    }

    //选择银行卡按钮点击
    selectPayStyleBtnClick=()=>{
        // this.setState({
        //     isPayShow:false,
        //     isShowSelectPayStyle:true
        // })
    }

    renderBankCardIcon=()=>{

        if(this.state.selectedBankIconUrl)
        {
            return {uri:this.state.selectedBankIconUrl}
        }else {
            return (require('../res/img/img_bank.png'))
        }
    }

    handleBankCardFooterItemClick=()=>{
        // console.log('点击了添加银行卡')
        this.setState({
            isShowSelectPayStyle: false,
        });
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:2});
    }
    handleBankCardItemClick=(bankCardData)=>{
        // console.log('点击了选择银行卡')
        this.setState({
            isShowSelectPayStyle: false,
            selectedBankId:bankCardData.id,
            selectedBankName:bankCardData.bankName,
            selectedBankCardNo:bankCardData.cardNo,
            selectedBankIconUrl:bankCardData.iconUrl,
        });
        if(this.state.withdrawAmount){
            this.setState({
                isPayShow:true,
            })
        }
        // console.log(bankCardData)

    }
    handleSelectPayStyleCloseClick=()=>{
        // console.log('点击了关闭按钮')
        this.setState({
            isShowSelectPayStyle:false,
        })
    }

    selectBankCard=()=>{
        // console.log('点击了银行卡选择')

        if(this.state.bankCardExist){
            this.setState({
                isShowSelectPayStyle:true
            })
        }else {
            this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:1});
        }

    }

    renderDetailRow = () => {
        return (
            <View style={styles.numberRowView}>
                <Text style={styles.numberRowViewText}>{'可提现金额 '+this.state.withdrawBalance.toFixed(2)+'元'}</Text>
                <View style={styles.numberRowViewNoView}>
                    <Text style={styles.numberRowViewRMB}>¥</Text>
                    <TextInput
                        placeholder={this.state.textInputPlaceHolder}
                        style={[styles.numberRowViewNumber,{fontSize:this.state.textInputFontSize}]}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>this.onChangeText(text)}
                        // placeholderTextColor={'red'}
                    />
                </View>
                <Divider style={{marginTop:16,marginLeft:10,marginRight:10}}/>
                <Text style={styles.numberRowViewAttachText}>收取0.1%的服务费</Text>
            </View>
        )
    };

    onChangeText =(text)=> {
        this.setState({
            withdrawAmount:text
        })
        if(text){
            this.setState({
                textInputFontSize:33,
                textInputPlaceHolder:'',
            })
        }else{
            this.setState({
                textInputFontSize:14,
                textInputPlaceHolder:'请输入提现金额',
            })
        }

        if(text>this.state.withdrawBalance){
            NativeModules.commModule.toast("提现金额不能大于可提现余额");
        }
        else if(text>20000){
            NativeModules.commModule.toast("单笔提现金额不能大于2万元");
        }
    }

    withdrawBtnClicked() {

        if(this.state.withdrawAmount>this.state.withdrawBalance){
            NativeModules.commModule.toast("提现金额不能大于可提现余额");
        }
        else if(this.state.withdrawAmount===0){
            NativeModules.commModule.toast("提现金额必须大于0.01元");
        }
        else if(this.state.withdrawAmount>20000) {
            NativeModules.commModule.toast("单笔提现金额不能大于2万元");
        }else if(this.state.selectedBankId<=0){
            NativeModules.commModule.toast("请选择提现储蓄卡");
        }
        else{
            ApiManager.createWithdrawOrder({"bankCardId":this.state.selectedBankId,"withdrawAmount":this.state.withdrawAmount},(data)=>{
                //创建订单成功,跳转结果页
                this.setState({
                    isPayShow:true
                })
                this.setState({
                    orderNo:data.orderNo
                })
            });
        }


        // this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE)
    }

    componentDidMount(){
        ApiManager.getwithdrawbalance({},(data)=>{
            this.setState({
                withdrawBalance:data.withdrawBalance
            })
        })

        ApiManager.getUserBankCardList({},(data)=>{
            if(data.length>0){
                ApiManager.getRecentWithdrawBankCard({},(data)=>{
                    this.setState({
                        bankCardExist:true,
                        selectedBankId:data.id,
                        selectedBankName:data.bankName,
                        selectedBankCardNo:data.cardNo,
                        selectedBankIconUrl:data.iconUrl
                    })
                })
            }else {
                this.setState({
                    bankCardExist:false
                })
            }

        })


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
        alignItems:'flex-end',
        // backgroundColor:'gray',
    },
    numberRowViewRMB: {
        fontSize: 30,
        color: '#000000',
        marginLeft: 12,
        marginTop: ScrnUtil.isIOS ? 3 : 0,
        // backgroundColor:'yellow',
    },
    numberRowViewNumber: {
        // fontWeight:'bold',
        // backgroundColor:'red',
        marginLeft: 10,
        flex: 1,
        height:40,
        paddingTop:5,
            // fontSize:33,
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