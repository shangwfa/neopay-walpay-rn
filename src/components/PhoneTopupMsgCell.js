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

const PhoneTopupMsgCell = props => {
    const {
        topupResultValue,
        dateValue,
        topupTypeValue,
        priceValue,
        topupPhoneNum,
        payType,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        reslutTitle: {
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
            fontSize: 15,
            height: 20
        },

        priceValue: {
            marginLeft: 10,
            color: colors.black,
            fontSize: 20,
            height: 30,
        },

        bottom_title: {
            marginTop: 20,
            marginLeft:15,
            color: colors.black,
            height: 20,
            fontSize: 15
        },

        bottom_value: {
            marginLeft:15,
            color: colors.black,
            height: 20,
            fontSize: 15
        },

        background_container: {
            backgroundColor:colors.white,
            marginLeft:15
        }
    });

    const rendercellContent = () => {
        return <View>
            <Text style={styles.reslutTitle}>{topupResultValue}</Text>
            <Text style={styles.dateLab}>{dateValue}</Text>
            <Text style={styles.topupType}>{topupTypeValue}</Text>
            <Text style={styles.priceValue}>{priceValue}</Text>
            <Text style={styles.bottom_title}>{'充值号码'}</Text>
            <Text style={styles.bottom_value}>{topupPhoneNum}</Text>
            <Text style={styles.bottom_title}>{'付款方式'}</Text>
            <Text style={styles.bottom_value}>{payType}</Text>
        </View>
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.background_container]} {...attributes}>
            <View style={styles.background_container}>
                    {rendercellContent()}
            </View>

        </TouchableOpacity>
    );
};


export default PhoneTopupMsgCell