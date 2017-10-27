import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
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
        withAttach,
        attach,
        amount,
        ...attributes
    } = props

    renderAttach = () => {

        if (withAttach) {
            return(<View style = {styles.detailLabel}>
                <Text style = {styles.detailItem}>备注 :</Text>
                <Text style = {styles.detailDes}>{attach}</Text>
            </View>)
    }
    }
    return (
        <View style = {styles.container}>
            <View style={styles.content_container}>
                <View style ={styles.titleView}>
                    <Text style = {styles.titleText}>付款成功</Text>
                    <Text style = {styles.titleDate}>{createTime}</Text>
                </View>
                <View style = {styles.countView}>
                    <Text style = {styles.countText}>{amount}.00</Text>
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

    );
};

const styles = StyleSheet.create({

    container:{
        alignItems:'center',
    },

    content_container: {
        backgroundColor: colors.white,
        width:ScreenUtil.width - 26,
        marginTop:5,
        marginBottom:5,
        borderRadius:5,
    },
    titleView:{
        marginTop:11,
        marginLeft:13,
    },
    titleText:{
        fontSize:17,
    },
    titleDate:{
        marginTop:7,
        fontSize:12,
        color:'#999999',
    },
    countView:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginBottom:18,
    },
    countText:{
        fontSize:27,
    },
    separatorLineView:{
        alignItems:'center',
        marginBottom:10,
    },
    separatorLine:{
        height:1,
        width:ScreenUtil.width*0.864,
        backgroundColor:'#DDDDDD',
    },
    detailView:{
        marginBottom:16,
    },
    detailLabel:{
        flexDirection:'row',
        marginTop:10,
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