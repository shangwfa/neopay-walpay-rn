import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'
import Divider from '../components/Divider'
import ScreenUtils from '../utils/ScreenUtils'
import DateUtils from "../utils/DateUtils";

const imgWidth = (ScreenUtils.width - 30)/4;

const itemHeight = (ScreenUtils.height/6);

const imgHeight = ScreenUtils.width/5;

const RpDetailHeader = props => {
    const {
        imgBackGroundUrl,
        imgIconUrl,
        amountValue,
        fromValue,
        remarkValue,
        stateValue,
        isMax,
        isGet,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        background_container: {
            backgroundColor: colors.white,
            width:ScreenUtils.width,
            height:ScreenUtils.height/2 -40,
            alignItems:'center'
        },

        top_View:{
            width:ScreenUtils.width,
            height:itemHeight,
            backgroundColor:colors.rp_bg_def,
            alignItems:'center'
        },

        mid_Image:{
            width:ScreenUtils.width,
            height:itemHeight-4,
            resizeMode:'cover',
            backgroundColor:colors.white,
            alignItems:'center',
            justifyContent:'flex-end'
        },

        middle_container: {
            flexDirection:'row',
            width:ScreenUtils.width,
            justifyContent:'space-between',
        },

        remark_value: {
            marginTop:30,
            fontSize:15,
            color:'#fbd49d',
            flex:1,
            textAlign:'center',
            backgroundColor:'transparent',
        },
        amount_value: {
            marginTop:5,
            fontSize:amountValue==0?20:40,
            color:'#fbd49d',
            backgroundColor:'transparent'
        },
        iconImg: {
            width: imgWidth,
            height:imgWidth,
            borderRadius: imgWidth/2,
        },
        maxImg: {
            width: imgHeight,
            height:imgHeight*0.6,
            marginRight:10,
            resizeMode:'contain'
        },
        from_value: {
            marginTop:15,
            fontSize:18,
            color:colors.black
        },
        state_value: {
            marginBottom:15,
            fontSize:15,
            color:colors.one_color
        },
        amount_bg:{
            flexDirection:'row',
        },
        rmbIcon:{
            fontSize:18,
            color:'#fbd49d',
            backgroundColor:'transparent',
            marginTop:26,
        }

    });

    const renderbankContent = () => {
        return <View style={styles.textAvatar}>
            <Text style={styles.bankName_value}>xxxxxx</Text>
            <Text style={styles.bankType_value}>{bankTypeValue}</Text>
            <Text style={styles.cardNo_value}>{cardNoValue}</Text>
        </View>
    }

    return (
        <View style = {styles.background_container} >
            <View style = {styles.top_View}>
                <View style = {styles.middle_container}>
                    <View style={{flex:1}} />
                    <Text style={styles.remark_value} numberOfLines={1}>{remarkValue}</Text>
                    <View style={{flex:1,alignItems:"flex-end",backgroundColor:'transparent'}}>
                        <Image style = {styles.maxImg} source = {isMax?require("../res/img/rp_max_text.png"):' '} ></Image>
                    </View>

                </View>
                <View style={styles.amount_bg}>
                    <Text style={styles.rmbIcon}>{amountValue==0?' ':'¥'}</Text>
                    <Text style={styles.amount_value}>{amountValue==0?stateValue:amountValue}</Text>
                </View>
            </View>

            <Image style = {styles.mid_Image} source = {require("../res/img/rp_mid_bg.png")}>
                <Image style = {styles.iconImg} source = {{uri:imgIconUrl}} ></Image>
            </Image>

            <Text style={styles.from_value}>来自{fromValue}的大红包</Text>
            <Text style={styles.state_value}>{amountValue==0?'':stateValue}</Text>
        </View>
    );
};


export default RpDetailHeader