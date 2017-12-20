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

const itemWidth = (ScreenUtils.width - 30)/2;

const RpTitleStyleItem = props => {
    const {
        imgBackGroundUrl,
        imgIconUrl,
        titleValue,
        fromValue,
        click,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        background_container: {
            backgroundColor: colors.white,
            width:ScreenUtils.width/2,
            height:itemWidth*3/7+10,
        },

        container: {
            width:itemWidth,
            height:itemWidth*3/7,
            marginLeft:10,
            marginTop:15,
            borderRadius:5,
            flexDirection:'row',
            alignItems:'center',
            resizeMode:'cover'

        },
        iconImg: {
            width: itemWidth/7 + 10,
            height:itemWidth/7 + 10,
            borderRadius: (itemWidth/7 + 10)/2,
            marginLeft: 20,
            backgroundColor:colors.black
        },
    });

    const renderbankContent = () => {
        return <View style={styles.textAvatar}>
            <Text style={styles.bankName_value}>{bankNameValue}</Text>
            <Text style={styles.bankType_value}>{bankTypeValue}</Text>
            <Text style={styles.cardNo_value}>{cardNoValue}</Text>
        </View>
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.background_container]} onPress ={click} {...attributes}>
            <Image style={[styles.container]} source={{uri:imgBackGroundUrl}}>

            </Image>

        </TouchableOpacity>
    );
};


export default RpTitleStyleItem