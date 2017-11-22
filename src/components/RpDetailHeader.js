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

        middle_container: {
            flexDirection:'row',
            width:ScreenUtils.width,
            justifyContent:'space-between'
        },

        remark_value: {
            marginTop:30,
            fontSize:15,
            color:colors.orange,
            backgroundColor:'transparent',
            flex:1,
            textAlign:'center'

        },
        amount_value: {
            marginTop:20,
            fontSize:40,
            color:colors.orange,
            backgroundColor:'transparent'
        },
        iconImg: {
            width: imgWidth,
            height:imgWidth,
            borderRadius: imgWidth/2,
            marginTop: 20,
            backgroundColor:colors.black,
        },
        maxImg: {
            width: 100,
            height:60,
            marginRight:10,
            flex:1
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
        <Image style = {styles.background_container} source = {require("../res/img/rp_backGround.png")}>
            <View style = {styles.middle_container}>
                <View style={{flex:1}} />
                <Text style={styles.remark_value}>{remarkValue}</Text>
                <Image style = {styles.maxImg} source = {{uri:imgIconUrl}} ></Image>
            </View>
            <Text style={styles.amount_value}>{amountValue==0?'  ':amountValue}</Text>
            <Image style = {styles.iconImg} source = {{uri:imgIconUrl}} ></Image>
            <Text style={styles.from_value}>来自{fromValue}的大红包</Text>
            <Text style={styles.state_value}>{stateValue}</Text>
        </Image>
    );
};


export default RpDetailHeader