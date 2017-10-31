import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
// import {colors} from '../constants/index'
// import Divider from '../components/Divider'
import colors from "../constants/colors";

const PhoneTopupMsgCell = props => {
    const {
        isShow,
        relustTilte,
        dateValue,
        topupTypeValue,
        priceValue,
        topupPhoneNum,
        payType,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        headr: {
            flexDirection:'row',
            height:40,
            backgroundColor:colors.page_background,
            justifyContent:'center',
            alignItems:'center'
        },
        headr_bottom: {
            height:15,
            backgroundColor:colors.page_background,
        },

        reslut_Title: {
            marginLeft:15,
            marginTop:15,
            fontSize: 18,
            color: colors.black,
            height: 20
        },

        dateLab: {
            marginLeft: 15,
            marginTop:10,
            fontSize: 14,
            color: colors.black,
            height: 20
        },

        topupType: {
            marginTop:25,
            color: colors.black,
            fontSize: 15
        },

        priceValue: {
            marginTop:22,
            marginLeft: 10,
            color: colors.black,
            fontSize: 25
        },

        middle_view:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },

        middle_line:{
            marginTop:20,
            marginLeft:15,
            marginRight:15,
            height:1,
            backgroundColor:colors.page_background
        },

        bottom_view:{
            flexDirection:'row'
        },

        bottom_title_top: {
            marginTop:15,
            marginLeft:15,
            color: colors.black,
            fontSize: 15,
        },

        bottom_value_top: {
            marginTop:15,
            marginLeft:5,
            color: colors.balck_more_light,
            fontSize: 15,
        },

        bottom_title_bom: {
            marginTop:10,
            marginLeft:15,
            color: colors.black,
            fontSize: 15,
            marginBottom:15
        },

        bottom_value_bom: {
            marginTop:10,
            marginLeft:5,
            color: colors.balck_more_light,
            fontSize: 15,
            marginBottom:15
        },

        background_container: {
            borderRadius:5,
            backgroundColor:colors.white,
            marginLeft:15,
            marginRight:15
        },

        bottom_line:{
            backgroundColor:colors.page_background,
            height:15
        }
    });

    renderSectionHeader = () => {
        if (isShow) {
            return <View style = {styles.headr}>
                <Text>xxxx</Text>
            </View>
        }else {
            return <View style={styles.headr_bottom}/>
        }
    }

    const rendercellContent = () => {
        return <View>
            {renderSectionHeader()}

            <View style={styles.background_container}>
                <Text style={styles.reslut_Title}>{relustTilte}</Text>
                <Text style={styles.dateLab}>{dateValue}</Text>

                <View style = {styles.middle_view}>
                    <Text style={styles.topupType}>{topupTypeValue}</Text>
                    <Text style={styles.priceValue}>{priceValue}</Text>
                </View>

                <View style = {styles.middle_line}>

                </View>

                <View style = {styles.bottom_view}>
                    <Text style={styles.bottom_title_top}>{'充值号码:'}</Text>
                    <Text style={styles.bottom_value_top}>{topupPhoneNum}</Text>
                </View>

                <View style = {styles.bottom_view}>
                    <Text style={styles.bottom_title_bom}>{'付款方式:'}</Text>
                    <Text style={styles.bottom_value_bom}>{payType}</Text>
                </View>
            </View>

        </View>
    }

    return (
        <TouchableOpacity activeOpacity={0.8} {...attributes}>
            <View >
                {rendercellContent()}
            </View>

        </TouchableOpacity>
    );
};


export default PhoneTopupMsgCell