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

const imgWidth = (ScreenUtils.width - 30)/4;

const itemHeight = ScreenUtils.height/6;

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
        ...attributes
    } = props

    const styles = StyleSheet.create({
        background_container: {
            backgroundColor: colors.white,
            width:ScreenUtils.width,
            height:ScreenUtils.height/2,
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
            color:colors.orange,
            flex:1,
            textAlign:'center',
            backgroundColor:'transparent'
        },
        amount_value: {
            marginTop:5,
            fontSize:40,
            color:colors.orange,
            backgroundColor:'transparent'
        },
        iconImg: {
            width: imgWidth,
            height:imgWidth,
            borderRadius: imgWidth/2,
            backgroundColor:colors.black,
        },
        maxImg: {
            width: imgHeight,
            height:imgHeight*0.6,
            marginRight:10,
            resizeMode:'contain'
        },
        from_value: {
            marginTop:30,
            fontSize:20,
            color:colors.black
        },
        state_value: {
            marginTop:20,
            fontSize:15,
            color:colors.one_color
        },

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
                    <Text style={styles.remark_value}>{remarkValue}</Text>
                    <View style={{flex:1,alignItems:"flex-end",backgroundColor:'transparent'}}>
                        <Image style = {styles.maxImg} source = {true?require("../res/img/rp_max_text.png"):' '} ></Image>
                    </View>

                </View>
                <Text style={styles.amount_value}>{amountValue==0?' 199876 ':amountValue}</Text>
            </View>

            <Image style = {styles.mid_Image} source = {require("../res/img/rp_mid_bg.png")}>
                <Image style = {styles.iconImg} source = {{uri:imgIconUrl}} ></Image>
            </Image>

            <Text style={styles.from_value}>来自{fromValue}的大红包</Text>
            <Text style={styles.state_value}>{stateValue}</Text>
        </View>
    );
};


export default RpDetailHeader