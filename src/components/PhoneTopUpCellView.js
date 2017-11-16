import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native'
import {colors} from '../constants/index'
import ScreenUtils from '../utils/ScreenUtils'
import ApiManager from '../utils/ApiManager'
import Contacts from '../page/ContactsPage'


const marginBetween=13;
const marginCellTop= 15;

class PhoneTopUpMoneyView extends Component {

    static defaultProps ={
        viewType:true
    };

    constructor(props){
        super(props)
        this.state={
            MoneyItemList:[
                {
                    "nameCode": 21,
                    "rechargeAmout": "10",
                    "tradeAmount": 9.90000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 22,
                    "rechargeAmout": "20",
                    "tradeAmount": 19.80000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 23,
                    "rechargeAmout": "30",
                    "tradeAmount": 29.70000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 24,
                    "rechargeAmout": "50",
                    "tradeAmount": 49.50000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 25,
                    "rechargeAmout": "100",
                    "tradeAmount": 99.00000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 26,
                    "rechargeAmout": "200",
                    "tradeAmount": 198.00000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                },
                {
                    "nameCode": 27,
                    "rechargeAmout": "500",
                    "tradeAmount": 494.00000,
                    "rechargeType": 1,
                    "rechargeTypeText": "话费"
                }],
            CelluarItemList:[
                {
                    "nameCode": 1,
                    "rechargeAmout": "10",
                    "tradeAmount": 9.90000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 2,
                    "rechargeAmout": "30",
                    "tradeAmount": 29.70000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 3,
                    "rechargeAmout": "50",
                    "tradeAmount": 49.50000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 4,
                    "rechargeAmout": "70",
                    "tradeAmount": 69.30000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 5,
                    "rechargeAmout": "100",
                    "tradeAmount": 99.00000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 6,
                    "rechargeAmout": "200",
                    "tradeAmount": 198.00000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 7,
                    "rechargeAmout": "1024",
                    "tradeAmount": 1013.76000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 8,
                    "rechargeAmout": "2048",
                    "tradeAmount": 2027.52000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 9,
                    "rechargeAmout": "3072",
                    "tradeAmount": 3041.28000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 10,
                    "rechargeAmout": "4096",
                    "tradeAmount": 4055.04000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 11,
                    "rechargeAmout": "5120",
                    "tradeAmount": 5068.80000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                },
                {
                    "nameCode": 12,
                    "rechargeAmout": "6144",
                    "tradeAmount": 6080.56000,
                    "rechargeType": 3,
                    "rechargeTypeText": "国内流量"
                }
            ],
            selectedItemIndex:0,
            showContactIcon:true,
            modalVisible:false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'#DADADA',height:1}}></View>
                <View style={styles.phoneNumberTextInputView}>
                    <TextInput style={styles.phoneNumberTextInput}
                               placeholder={'请输入手机号'}
                               keyboardType='numeric'
                               clearButtonMode='while-editing'
                               placeholderTextColor='#999999'
                               onFocus={(event)=>this.textInputFocus(event)}
                               onBlur={(event)=>this.textInputBlur(event)}
                               onChange={(event)=>this.textInputChange(event)}

                    />
                    <TouchableWithoutFeedback onPress={()=>this.contactBtnClicked()}>
                    <Image style={[styles.contactIcon,{width:this.state.showContactIcon?20:0}]}
                           source={require('../res/img/HomePage/sy_tongxunlu.png')}
                           />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{backgroundColor:'#DADADA',height:1}}></View>
                <View style={styles.cellItemsContainer}>
                    {this.renderCells()}
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <Text>modal page</Text>
                </Modal>
            </View>
        );
    }

    componentDidMount() {
        ApiManager.getPhoneRechargeProductList({"phone":"18668180337","productType":this.props.viewType?2:1},(data)=>{
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

    renderCells= ()=>{
        let itemCells = [];
        if(this.props.viewType===false) {
            for (let i = 0; i < this.state.MoneyItemList.length; i++) {
                itemCells.push(
                    <TouchableWithoutFeedback key={i} onPress={() => this.cellSelected(i)}>
                        <View style={i === this.state.selectedItemIndex ? styles.itemCellSelected : styles.itemCell}>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.MoneyItemList[i].rechargeAmout}元</Text>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.priceTextSelected : styles.priceText}>售价:{this.state.MoneyItemList[i].tradeAmount.toFixed(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        }else if (this.props.viewType ===true){
            for (let i = 0; i < this.state.CelluarItemList.length; i++) {
                itemCells.push(
                    <TouchableWithoutFeedback key={i} onPress={() => this.cellSelected(i)}>
                        <View style={i === this.state.selectedItemIndex ? styles.itemCellSelected : styles.itemCell}>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.CelluarItemList[i].rechargeAmout}</Text>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.priceTextSelected : styles.priceText}>售价:{this.state.CelluarItemList[i].tradeAmount.toFixed(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
        }
    }
        return itemCells;
    };

    cellSelected = (i)=>{
        this.setState({
            selectedItemIndex:i
        })
    };

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
    };
    contactBtnClicked = ()=>{
        this.setState({
            modalVisible:true
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
        height:62,
        width:ScreenUtils.width-27,
        marginLeft:14,
        marginRight:13,
        fontSize:18,
    },
    contactIcon:{
        position:'absolute',
        right:13,
        bottom:20,
    },
    cellItemsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    itemCellSelected:{
        borderWidth:0.5,
        borderColor:'red',
        borderRadius:3,
        alignItems:'center',
        width:(ScreenUtils.width-4*marginBetween)/3.0,
        marginLeft:marginBetween,
        marginTop:marginCellTop,
        backgroundColor:'#FD686C',
    },
    itemCell:{
        height:55,
        borderWidth:0.5,
        borderColor:'red',
        borderRadius:3,
        alignItems:'center',
        width:(ScreenUtils.width-4*marginBetween)/3.0,
        marginLeft:marginBetween,
        marginTop:marginCellTop,

    },
    amountText:{
        color:'red',
        fontSize:16,
        marginTop:13,

    },
    amountTextSelected:{
        color:'#FFFFFF',
        fontSize:16,
        marginTop:13,
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