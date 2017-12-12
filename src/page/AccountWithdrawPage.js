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

class AccountWithdrawPage extends BasePage {
    constructor(props){
        super(props)
        global.backKey=nav.state.key
        this.state={
            withdrawAmount:0.00,
            withdrawBalance:0.00,
            isShowSelectPayStyle:false,
            selectedBankId:0,
            selectedBankName:'',
            selectedBankCardNo:'',
            isPayShow:false,
            orderNo:'',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'提现'} rightIcon={require("../res/img/HomePage/sy_wenhao.png")} rightIconStyle={{height: 20}}/>

                <CommonItemThree style={{marginTop: 10}} source={this.renderBankCardIcon()} title={this.state.selectedBankName+'('+this.state.selectedBankCardNo+')'} onPress={()=>this.selectBankCard()}/>

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
                             contentBack={this.state.withdrawAmount}
                             payTypeContent={this.retPayTypeContent()}
                             onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>this.forgetPayPwdBtnClicked()}
                             onEnd={(text)=>this.pwdInputFinished(text)}/>
            </View>
        );
    }

    //处理银行卡信息
    retPayTypeContent=()=>{
        if (this.state.selectedBankId==-1)
            return this.state.selectedBankName;
        else
            return this.state.selectedBankName+'('+this.state.selectedBankCardNo.slice(-4)+')';
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
        this.setState({
            isPayShow:false
        });

        ApiManager.withdraworder({'orderNo':this.state.orderNo,'payPassword':text,'tradeNo':this.state.orderNo},(data)=>{
            nav.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE,{orderNo:data['orderNo']});
        })

    }

    renderBankCardIcon=()=>{

        if(this.state.selectedBankName==='中国工商银行'){
            return(require("../res/img/BankIcon/sy_gongshang.png"))
        }else if (this.state.selectedBankName==='中国建设银行'){
            return(require("../res/img/BankIcon/sy_jianshe.png"))
        }else {
            return null
        }

    }

    handleBankCardFooterItemClick=()=>{
        // console.log('点击了添加银行卡')
        this.setState({
            isShowSelectPayStyle: false,
        });
        this.props.navigation.navigate(RouterPaths.BIND_BANK_CARD_PAGE, {pageTitle: "添加绑定银行卡"});
    }
    handleBankCardItemClick=(bankCardData)=>{
        // console.log('点击了选择银行卡')
        this.setState({
            isShowSelectPayStyle: false,
            selectedBankId:bankCardData.id,
            selectedBankName:bankCardData.bankName,
            selectedBankCardNo:bankCardData.cardNo
        });
        console.log(bankCardData)

    }
    handleSelectPayStyleCloseClick=()=>{
        // console.log('点击了关闭按钮')
        this.setState({
            isShowSelectPayStyle:false
        })
    }

    selectBankCard=()=>{
        // console.log('点击了银行卡选择')
        this.setState({
            isShowSelectPayStyle:true
        })
    }

    renderDetailRow = () => {
        return (
            <View style={styles.numberRowView}>
                <Text style={styles.numberRowViewText}>{'可提现金额'+this.state.withdrawBalance.toFixed(2)+'元'}</Text>
                <View style={styles.numberRowViewNoView}>
                    <Text style={styles.numberRowViewRMB}>¥</Text>
                    <TextInput
                        placeholder='请输入提现金额'
                        style={styles.numberRowViewNumber}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text)=>this.onChangeText(text)}
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
    }

    withdrawBtnClicked() {

        if(this.state.withdrawAmount!=0)
        {
            ApiManager.createWithdrawOrder({"bankCardId":this.state.selectedBankId,"withdrawAmount":this.state.withdrawAmount},(data)=>{
                //创建订单成功,跳转结果页
                this.setState({
                    isPayShow:true
                })
                this.setState({
                    orderNo:data.orderNo
                })
            });
        }else {
            NativeModules.commModule.toast("请输入正确提现金额");
        }


        // this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_RESULT_PAGE)
    }

    componentDidMount(){
        ApiManager.getwithdrawbalance({},(data)=>{
            this.setState({
                withdrawBalance:data.withdrawBalance
            })
        })
        ApiManager.getRecentWithdrawBankCard({},(data)=>{
            this.setState({
                selectedBankId:data.id,
                selectedBankName:data.bankName,
                selectedBankCardNo:data.cardNo
            })
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