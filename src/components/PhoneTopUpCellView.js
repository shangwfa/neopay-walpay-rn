import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native'
import {colors} from '../constants/index'
import ScreenUtils from '../utils/ScreenUtils'

const marginBetween=13;
const marginCellTop= 15;

class PhoneTopUpMoneyView extends Component {

    static defaultProps ={
        viewType:true
    };

    constructor(props){
        super(props)
        this.state={
            MoneyItemList:[{
                    item:10,
                    price:9.98
                },{
                    item:20,
                    price:19.98
                },{
                    item:30,
                    price:29.98
                },{
                    item:50,
                    price:49.98
                },{
                    item:80,
                    price:79.98
                },{
                    item:100,
                    price:99.98
                },{
                    item:200,
                    price:199.98
                },{
                    item:300,
                    price:299.98
                },{
                    item:400,
                    price:399.98
                },{
                    item:500,
                    price:499.98
                }],
            CelluarItemList:[{
                item:'20M',
                price:9.98
            },{
                item:'50M',
                price:19.98
            },{
                item:'100M',
                price:29.98
            },{
                item:'200M',
                price:49.98
            },{
                item:'300M',
                price:79.98
            },{
                item:'500M',
                price:99.98
            },{
                item:'1G',
                price:199.98
            },{
                item:'2G',
                price:299.98
            }],
            selectedItemIndex:2,
            showContactIcon:true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
            </View>
        );
    }

    renderCells= ()=>{
        let itemCells = [];
        if(this.props.viewType===false) {
            for (let i = 0; i < this.state.MoneyItemList.length; i++) {
                itemCells.push(
                    <TouchableWithoutFeedback key={i} onPress={() => this.cellSelected(i)}>
                        <View style={i === this.state.selectedItemIndex ? styles.itemCellSelected : styles.itemCell}>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.MoneyItemList[i].item}元</Text>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.priceTextSelected : styles.priceText}>售价:{this.state.MoneyItemList[i].price}</Text>
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
                                style={i === this.state.selectedItemIndex ? styles.amountTextSelected : styles.amountText}>{this.state.CelluarItemList[i].item}</Text>
                            <Text
                                style={i === this.state.selectedItemIndex ? styles.priceTextSelected : styles.priceText}>售价:{this.state.CelluarItemList[i].price}</Text>
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
        console.log('通讯录图标点击')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
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