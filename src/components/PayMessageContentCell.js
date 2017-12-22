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
        payBy,
        payTo,
        remark,
        amount,
        payDirection,
        onPress,
        ...attributes
    } = props

    renderAttach = () => {

        if (remark) {
            return(<View style = {styles.detailLabel}>
                <Text style = {styles.detailItem}>备注 :</Text>
                <Text style = {styles.detailDes}>{remark}</Text>
            </View>)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style = {styles.container}>
            <View style={styles.content_container}>
                <View style ={styles.titleView}>
                    <Text style = {styles.titleText}>{payNoticeType}</Text>
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
                        <Text style = {styles.detailItem}>付款方式 :</Text>
                        <Text style = {styles.detailDes}>{payBy}</Text>
                    </View>
                    <View style = {styles.detailLabel}>
                        <Text style = {styles.detailItem}>交易对象 :</Text>
                        <Text style = {styles.detailDes}>{payTo}</Text>
                    </View>
                    {renderAttach()}
                </View>

            </View>

        </View>
        </TouchableWithoutFeedback>
    );
};

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