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
        ...attributes
    } = props

    const styles = StyleSheet.create({
        background_container: {
            backgroundColor: colors.white,
            width:ScreenUtils.width,
            height:ScreenUtils.height/2,
            alignItems:'center'
        },

        remark_value: {
            marginTop:30,
            fontSize:15,
            color:colors.orange,
            backgroundColor:'transparent'

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
            backgroundColor:colors.black
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
            <Text style={styles.remark_value}>{remarkValue}</Text>
            <Text style={styles.amount_value}>{amountValue}</Text>
            <Image style = {styles.iconImg} source = {{imgIconUrl}} ></Image>
            <Text style={styles.from_value}>{fromValue}</Text>
            <Text style={styles.state_value}>{stateValue}</Text>
        </Image>
    );
};


export default RpDetailHeader