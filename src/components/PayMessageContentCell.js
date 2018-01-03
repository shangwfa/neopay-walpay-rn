import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import {colors} from '../constants/index'
import Divider from '../components/Divider'
import ScreenUtil from '../utils/ScreenUtils'

const PayMessageContentCell = props => {

    const {
        createTime,
        payNoticeType,
        payNoticeTypeText,
        payTypeDesc,
        remark,
        amount,
        payDirection,
        bossName,
        tradObject,
        tradTypeText,
        phone,
        productDesc,
        ...attributes
    } = props.cellItem
    const{
        onPress,
    }=props,

    renderAttach = () => {

        if (remark) {
            return(<View style = {styles.detailLabel}>
                <Text style = {styles.detailItem}>备注 :</Text>
                <Text style = {styles.detailDes}>{remark}</Text>
            </View>)
        }
    }

        // SCAN_PAY(1, "扫一扫付款"),
        // PAYMENT_PAY(2, "付款码付款"),
        // REFUNDS(3, "退款"),
        // PHONE_RECHARGE(4, "手机充值", "手机充值付款成功"),
        // WITHDRAW(5, "提现", "账户提现成功"),
        // BALANCE_RECHARGE(6, "余额充值"),
        // RECEIVE_RED_PACKET(7, "领红包", "大红包领取成功"),
        // SEND_RED_PACKET(8, "发红包", "大红包发送成功"),
        // RED_PACKET_REFUNDS(9,"红包退款", "大红包退款"),
        // MERCHANT_ACTIVITY_PAY(10,"商户活动，付款", "付款成功"),
        // MERCHANT_ACTIVITY_RECEIVE(11,"商户活动，收钱", "收款成功"),
        // PHONE_RECHARGE_REFUND(12, "手机充值退款", "手机充值退款")

    if(payNoticeType==8||payNoticeType==7||payNoticeType==9){//红包消息
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style = {styles.container}>
                    <View style={styles.content_container}>
                        <View style ={styles.titleView}>
                            <Text style = {styles.titleText}>{payNoticeTypeText}</Text>
                            <Text style = {styles.titleDate}>{createTime}</Text>
                        </View>
                        <View style = {styles.countView}>
                            <Text style = {styles.countText}>{`${payDirection==1?'+':'-'}${amount.toFixed(2)}`}</Text>
                        </View>
                        <View style = {styles.separatorLineView}>
                            <View style = {styles.separatorLine}>
                            </View>
                        </View>
                        <View style = {styles.detailView}>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>{`${payDirection==1?'收款方式: ':'付款方式: '}`}</Text>
                                <Text style = {styles.detailDes}>{payTypeDesc}</Text>
                            </View>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>交易对象 :</Text>
                                <Text style = {styles.detailDes}>{tradObject}</Text>
                            </View>
                            {renderAttach()}
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
    );
}
    else if(payNoticeType==5){//提现账户消息
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style = {styles.container}>
                    <View style={styles.content_container}>
                        <View style ={styles.titleView}>
                            <Text style = {styles.titleText}>{payNoticeTypeText}</Text>
                            <Text style = {styles.titleDate}>{createTime}</Text>
                        </View>
                        <View style = {styles.countView}>
                            <Text style = {styles.countText}>{`${payDirection==1?'+':'-'}${amount.toFixed(2)}`}</Text>
                        </View>
                        <View style = {styles.separatorLineView}>
                            <View style = {styles.separatorLine}>
                            </View>
                        </View>
                        <View style = {styles.detailView}>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>{`${payDirection==1?'收款方式: ':'付款方式: '}`}</Text>
                                <Text style = {styles.detailDes}>{payTypeDesc}</Text>
                            </View>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>交易方式 :</Text>
                                <Text style = {styles.detailDes}>{tradTypeText}</Text>
                            </View>
                            {renderAttach()}
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }

    else if(payNoticeType==4||payNoticeType==12){//手机充值消息
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style = {styles.container}>
                    <View style={styles.content_container}>
                        <View style ={styles.titleView}>
                            <Text style = {styles.titleText}>{payNoticeTypeText}</Text>
                            <Text style = {styles.titleDate}>{createTime}</Text>
                        </View>
                        <View style = {styles.countView}>
                            <Text style = {styles.countText}>{`${payDirection==1?'+':'-'}${amount.toFixed(2)}`}</Text>
                        </View>
                        <View style = {styles.separatorLineView}>
                            <View style = {styles.separatorLine}>
                            </View>
                        </View>
                        <View style = {styles.detailView}>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>{`${payDirection==1?'收款方式: ':'付款方式: '}`}</Text>
                                <Text style = {styles.detailDes}>{payTypeDesc}</Text>
                            </View>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>充值手机号 :</Text>
                                <Text style = {styles.detailDes}>{phone}</Text>
                            </View>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>充值内容 :</Text>
                                <Text style = {styles.detailDes}>{productDesc}</Text>
                            </View>
                            {/*{renderAttach()}*/}
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }
    else if(payNoticeType==10||payNoticeType==11){
        return(
            <TouchableWithoutFeedback onPress={onPress}>
                <View style = {styles.container}>
                    <View style={styles.content_container}>
                        <View style ={styles.titleView}>
                            <Text style = {styles.titleText}>{payNoticeTypeText}</Text>
                            <Text style = {styles.titleDate}>{createTime}</Text>
                        </View>
                        <View style = {styles.countView}>
                            <Text style = {styles.countText}>{`${payDirection==1?'+':'-'}${amount.toFixed(2)}`}</Text>
                        </View>
                        <View style = {styles.separatorLineView}>
                            <View style = {styles.separatorLine}>
                            </View>
                        </View>
                        <View style = {styles.detailView}>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>{`${payDirection==1?'收款方式: ':'付款方式: '}`}</Text>
                                <Text style = {styles.detailDes}>{payTypeDesc}</Text>
                            </View>
                            <View style = {styles.detailLabel}>
                                <Text style = {styles.detailItem}>交易方式 :</Text>
                                <Text style = {styles.detailDes}>{tradTypeText}</Text>
                            </View>
                            {/*{renderAttach()}*/}
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }
    else {
        return;
    }

}

const styles = StyleSheet.create({

    container:{
        alignItems:'center',
        // backgroundColor:'purple',
        marginTop:10,
    },

    content_container: {
        backgroundColor: colors.white,
        width:ScreenUtil.width - 26,
        marginTop:0,
        marginBottom:0,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#DDDDDD',
        // backgroundColor:'gray',
    },
    titleView:{
        marginTop:11,
        marginBottom:0,
        marginLeft:13,
        // backgroundColor:'yellow',
    },
    titleText:{
        fontSize:17,
        color:'#000',
    },
    titleDate:{
        marginTop:7,
        fontSize:12,
        color:'#999999',
    },
    countView:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
        marginBottom:24,
        // backgroundColor:'red',
    },
    countText:{
        fontSize:27,
        color:'#000',
    },
    separatorLineView:{
        alignItems:'center',
        marginBottom:21,
        // backgroundColor:'tomato'
    },
    separatorLine:{
        height:0.5,
        width:ScreenUtil.width*0.864,
        backgroundColor:'#DDDDDD',
    },
    detailView:{
        marginBottom:8,
        // backgroundColor:'pink'
    },
    detailLabel:{
        flexDirection:'row',
        marginBottom:11,
        marginLeft:13,
    },
    detailItem:{
        color:'#333333',
    },
    detailDes:{
        color:'#999999',
        marginLeft:4,
    }
});

export default PayMessageContentCell