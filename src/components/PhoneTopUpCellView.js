import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Modal,
    NativeModules,
    NativeAppEventEmitter,
} from 'react-native'
import {colors} from '../constants/index'
import ScreenUtils from '../utils/ScreenUtils'
import ApiManager from '../utils/ApiManager'
import PayPwdModal from '../modal/PayPwdModal'
import SelectPayStyleModal from '../modal/SelectPayStyleModal'
import {RouterPaths} from "../constants/RouterPaths"

const marginBetween=13;
const marginCellTop= 15*ScreenUtils.height/667.0;
const heightRatio = ScreenUtils.height/667.0;

class PhoneTopUpMoneyView extends Component {

    static defaultProps ={
        viewType:true
    };

    constructor(props){
        super(props)
        this.state={
            MoneyItemList:[],
            CelluarItemList:[],
            CelluarPriceList:[],
            showContactIcon:true,
            phoneNo:'',
            payAmount:0.0,
            selectedNameCode:0,
            selectedPayType:2,
            isPayShow:false,
            isShowSelectPayStyle:false,
            selectedBankId:-1,
            selectedBankName:'余额',
            selectedBankCardNo:'',
            selectedRechargeType:1,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'#F1F1F0',height:1}}></View>
                <View style={styles.phoneNumberTextInputView}>
                    <TextInput style={styles.phoneNumberTextInput}
                               placeholder={'请输入手机号'}
                               value={this.formatPhoneNo(this.state.phoneNo)}
                               keyboardType='numeric'
                               clearButtonMode='while-editing'
                               placeholderTextColor='#999999'
                               onFocus={(event)=>this.textInputFocus(event)}
                               onBlur={(event)=>this.textInputBlur(event)}
                               onChange={(event)=>this.textInputChange(event)}
                               onChangeText={(text)=>this.textInputChanged(text)}
                               underlineColorAndroid={'transparent'}
                    ></TextInput>
                    <TouchableWithoutFeedback onPress={()=>this.contactBtnClicked()}>
                    <Image style={[styles.contactIcon,{width:this.state.showContactIcon?20:0}]}
                           source={require('../res/img/HomePage/sy_tongxunlu.png')}
                           />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{backgroundColor:'#EEE',height:1.0}}></View>
                <View style={styles.cellItemsContainer}>
                    {this.renderCells()}
                </View>
                <View style={{position:'absolute', bottom:0}}>
                    {this.renderCelluarCell()}
                </View>
                <SelectPayStyleModal
                    title="选择付款方式"
                    selectBankId={this.state.selectedBankId}
                    bankCardFooterItemClick={this.handleBankCardFooterItemClick.bind(this)}
                    bankCardItemClick={this.handleBankCardItemClick.bind(this)}
                    closeClick={this.handleSelectPayStyleCloseClick.bind(this)}
                    isShow={this.state.isShowSelectPayStyle}/>
                <PayPwdModal isShow={this.state.isPayShow}
                             contentFront='实付金额'
                             contentBack={this.state.payAmount}
                             payTypeContent={this.retPayTypeContent()}
                             onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>this.forgetPayPwdBtnClicked()}
                             onEnd={(text)=>this.pwdInputFinished(text)}
                             selectPayStyleClick={()=>{this.selectPayStyleBtnClick()}}/>
            </View>
        );
    }

    componentDidMount() {

        //获取上次充值手机号
        ApiManager.getRecentPhoneRechargePhone({},(data)=>{

            this.setState({
               phoneNo:data.phone,
           });

            if(!this.state.phoneNo){
                NativeModules.commModule.contactCommNumber((data)=>{
                    this.setState({
                        phoneNo:data
                    });
                });
            }

        if (this.state.phoneNo.length===11){
               ApiManager.getPhoneRechargeProductList({"phone":this.state.phoneNo,"productType":this.props.viewType?2:1},(data)=>{
                   if(this.props.viewType){
                       this.setState({
                           CelluarItemList:data,
                       })
                   }else {
                       this.setState({
                           MoneyItemList: data,
                       })
                   }
               });
           }

        });

        NativeAppEventEmitter.addListener('ContactSelected',(data)=>this.receivedContactPhoneNo(data));



    }
    //接收到手机号
    receivedContactPhoneNo=(data)=>{
        // console.log('收到手机号'+data);
        this.setState({
            phoneNo:data,
        })

        if(this.state.phoneNo.length===11){

            ApiManager.getPhoneRechargeProductList({"phone":this.state.phoneNo,"productType":this.props.viewType?2:1},(data)=>{
                if(this.props.viewType){
                    this.setState({
                        CelluarItemList:data,
                    })
                }else {
                    this.setState({
                        MoneyItemList: data,
                    })
                }
            });

        }

    }

    //处理银行卡信息
    retPayTypeContent=()=>{
        if (this.state.selectedBankId==-1)
            return this.state.selectedBankName;
        else
            return this.state.selectedBankName+'('+this.state.selectedBankCardNo.slice(-4)+')';
    }

    //处理手机号格式
    formatPhoneNo=(phoneNo)=>{

        let newPhoneNo = phoneNo.replace('-','');

        if (newPhoneNo.length===11){
            return `${newPhoneNo.substring(0,3)}-${newPhoneNo.substring(3,7)}-${newPhoneNo.substring(7,11)}`;
        }else
            return newPhoneNo;
    }

    //处理选择银行卡弹窗
    handleBankCardFooterItemClick=()=>{
        // console.log('点击了添加银行卡')
        this.setState({
            isShowSelectPayStyle: false,
        });
        nav.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:3});
    }

    handleBankCardItemClick=(bankCardData)=>{
        this.setState({
            isShowSelectPayStyle: false,
            selectedBankId:bankCardData.id,
            selectedBankName:bankCardData.bankName,
            selectedBankCardNo:bankCardData.cardNo,
            selectedPayType:bankCardData.id==-1?2:1,
        });
        this.setState({
            isPayShow:true,
        });
    }

    handleSelectPayStyleCloseClick=()=>{
        this.setState({
            isShowSelectPayStyle:false,
            isPayShow:true,
        })
    }


    renderCells= ()=>{
        let itemCells = [];
        if(this.props.viewType===false) {
            for (let i = 0; i < this.state.MoneyItemList.length; i++) {
                itemCells.push(
                    <TouchableWithoutFeedback key={i} onPress={() => this.moneyCellSelected(i)}>
                        <View style={i === this.state.selectedItemIndex ? styles.itemCellSelected : styles.itemCell}>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.MoneyItemList[i].rechargeAmout}</Text>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.priceTextSelected : styles.priceText}>售价:{this.state.MoneyItemList[i].tradeAmount.toFixed(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        }else if (this.props.viewType ===true){
            for (let i = 0; i < this.state.CelluarItemList.length; i++) {
                itemCells.push(
                    <TouchableWithoutFeedback key={i} onPress={()=>this.celluarCellSelected(i)}>
                        <View style={i === this.state.selectedItemIndex ? styles.itemCellSelected : styles.itemCell}>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.CelluarItemList[i].rechargeAmout}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
        }
    }
        return itemCells;
    };

    renderCelluarCell=()=>{
        let celluarPriceItem =[];
        if(this.props.viewType==true){
            for(let i=0; i<this.state.CelluarPriceList.length;i++){
                celluarPriceItem.push(
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:12*heightRatio}}>
                            <View style={{marginLeft:14}}>
                                <Text style={{fontSize:13, color:'#333333'}}>
                                    {this.state.CelluarItemList[this.state.selectedItemIndex].rechargeAmout+' '+this.state.CelluarPriceList[i].rechargeTypeText}
                                </Text>
                                <Text style={{fontSize:12, color:'#999999',marginTop:13*heightRatio}} >
                                    {this.state.CelluarPriceList[i].productDesc}
                                </Text>
                            </View>
                            <View style={{flex:1}}>

                            </View>
                            <View style={{marginRight:14,alignItems:'flex-end'}}>
                                <Text style={{fontSize:16, color:'#333333'}}>
                                    {'¥'+this.state.CelluarPriceList[i].tradeAmount}
                                </Text>
                                <TouchableWithoutFeedback onPress={()=>this.celluarOrderBtnClicked(i)}>
                                <View style={{height:26,width:61,borderColor:'red',borderRadius:3,borderWidth:1,alignItems:'center',justifyContent:'center',marginTop:11*heightRatio}}>
                                    <Text style={{color:'#F34646',fontSize:13}}>
                                        立即购买
                                    </Text>
                                </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{height:i==(this.state.CelluarPriceList.length-1)?0:1, width:ScreenUtils.width,backgroundColor:'#DADADA',marginTop:12*heightRatio}}>

                        </View>
                    </View>
                )
            }
            return celluarPriceItem;
        }
    };

    //冲流量按钮点击
    celluarOrderBtnClicked=(i)=>{
        this.setState({
            isPayShow:true,
            payAmount:this.state.CelluarPriceList[i].tradeAmount.toFixed(2),
            selectedNameCode:this.state.CelluarPriceList[i].nameCode,
            selectedRechargeType:i===0?3:2,
        });
    };

    //冲流量套餐选择
    celluarCellSelected = (i)=>{

        if(this.state.phoneNo.length==11){
            this.setState({
                selectedItemIndex:i,
            });

            ApiManager.queryPhoneRechargeDataList({"nameCode":i,"phone":this.state.phoneNo},(data)=>{

                    this.setState({
                        CelluarPriceList:data,
                    })
            });
        }else {
            NativeModules.commModule.toast("请输入正确手机号");
        }
    };

    //充话费按钮点击
    moneyCellSelected = (i)=>{

        if(this.state.phoneNo.length==11){
            this.setState({
                selectedItemIndex:i,
                isPayShow:true,
                payAmount:this.state.MoneyItemList[i].tradeAmount.toFixed(2),
                selectedNameCode:this.state.MoneyItemList[i].nameCode,
                selectedRechargeType:1
            });
        }else {
            NativeModules.commModule.toast("请输入正确手机号");
        }
    };


    //处理输入框逻辑
    textInputFocus = (event)=>{
        if(event.nativeEvent.text!=='')
        {
            this.setState({
                showContactIcon:false
            })
        }else {
            this.setState({
                showContactIcon:true
            })
        }
    };
    textInputBlur =(event)=>{
        this.setState({
            showContactIcon:true
        })
    };
    textInputChange =(event)=>{
        if(event.nativeEvent.text!=='')
        {
            this.setState({
                showContactIcon:false
            })
        }else {
            this.setState({
                showContactIcon:true
            })
        }
        this.setState({
            phoneNo:event.nativeEvent.text.replace('-','')
        })
    };
    textInputChanged =(text)=>{

        if(text.length===11){

            ApiManager.getPhoneRechargeProductList({"phone":text,"productType":this.props.viewType?2:1},(data)=>{
                if(this.props.viewType){
                    this.setState({
                        CelluarItemList:data,
                    })
                }else {
                    this.setState({
                        MoneyItemList: data,
                    })
                }
            });

        }
    };
    //通讯录图标点击
    contactBtnClicked = ()=>{
        NativeModules.commModule.rnModalContactList()
    };

    //输入密码完成
    pwdInputFinished =(text) =>{
        this.setState({
            isPayShow:false
        });
        ApiManager.createPhoneRechargeOrder({"phone":this.state.phoneNo,"payType":this.state.selectedPayType,"rechargeType":this.state.selectedRechargeType,"nameCode":this.state.selectedNameCode,"payPassword":text,'bankCardId':this.state.selectedBankId},(data)=>{
            //创建订单成功,跳转结果页
            nav.navigate(RouterPaths.CHARGE_FLUX_RESULT,{pageTitle:this.props.viewType?'流量充值':'手机充值',orderNo:data['orderNo']});
        });
    }

    //弹框忘记密码按钮点击
    forgetPayPwdBtnClicked =()=>{
        this.setState({
            isPayShow:false
        })
        const params = {page: 'resetPayPwd'};
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    }

     //选择银行卡按钮点击
    selectPayStyleBtnClick=()=>{
        this.setState({
            isPayShow:false,
            isShowSelectPayStyle:true
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        marginTop:0,
    },
    phoneNumberTextInputView:{
        flexDirection:'row',
    },
    phoneNumberTextInput:{
        height:62*heightRatio,
        width:ScreenUtils.width-27,
        marginLeft:14,
        marginRight:13,
        fontSize:18,
        color:'#333333',
    },
    contactIcon:{
        position:'absolute',
        right:13,
        bottom:20*heightRatio,
    },
    cellItemsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    itemCellSelected:{
        height:55*heightRatio,
        borderWidth:0.5,
        borderColor:'red',
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        width:(ScreenUtils.width-4*marginBetween)/3.0,
        marginLeft:marginBetween,
        marginTop:marginCellTop,
        backgroundColor:'#FD686C',
    },
    itemCell:{
        height:55*heightRatio,
        borderWidth:0.5,
        borderColor:'red',
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        width:(ScreenUtils.width-4*marginBetween)/3.0,
        marginLeft:marginBetween,
        marginTop:marginCellTop,

    },
    amountText:{
        color:'red',
        fontSize:16,
    },
    amountTextSelected:{
        color:'#FFFFFF',
        fontSize:16,
    },
    priceText:{
        color:'red',
        fontSize:11,
    },
    priceTextSelected:{
        color:'#FFFFFF',
        fontSize:11,
    }
});

export default PhoneTopUpMoneyView