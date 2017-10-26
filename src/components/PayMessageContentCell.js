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
        type,
        title,
        Date,
        count,
        paymethod,
        dealer,
        attach,
        ...attributes
    } = props

    renderAttach = () => {

        if (true) {
            return(<View style = {styles.detailLabel}>
                <Text style = {styles.detailItem}>备注:</Text>
                <Text style = {styles.detailDes}>欠你的钱,还给你啦</Text>
            </View>)
    }
    }
    return (
        <View style = {styles.container}>
            <View style={styles.content_container}>
                <View style ={styles.titleView}>
                    <Text style = {styles.titleText}>付款成功</Text>
                    <Text style = {styles.titleDate}>08-24 12:34</Text>
                </View>
                <View style = {styles.countView}>
                    <Text style = {styles.countText}>-38.00</Text>
                </View>
                <View style = {styles.separatorLineView}>
                <View style = {styles.separatorLine}>
                </View>
                </View>
                <View style = {styles.detailView}>
                    <View style = {styles.detailLabel}>
                        <Text style = {styles.detailItem}>付款方式:</Text>
                        <Text style = {styles.detailDes}>中信银行储蓄卡</Text>
                    </View>
                    <View style = {styles.detailLabel}>
                        <Text style = {styles.detailItem}>交易对象:</Text>
                        <Text style = {styles.detailDes}>178果舍</Text>
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
        width:350,
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
        marginTop:25,
        marginBottom:25,
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
        marginBottom:20,
    },
    detailLabel:{
        flexDirection:'row',
        marginTop:11,
        marginLeft:13,
    },
    detailItem:{
        color:'#333333',
    },
    detailDes:{
        color:'#999999',
    }
});

export default PayMessageContentCell