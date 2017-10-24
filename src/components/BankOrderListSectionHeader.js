import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import {colors} from '../constants/index'
import right_arrow from '../res/img/right_arrow.png'


const BankOrderListSectionHeader = props => {
    const {
        title,
        value,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        img: {
            width: 10,
            height: 15,
            marginRight: 10
        },
        value:{
            color: colors.black_light,
            fontSize: 13,
            marginRight: 10
        },
        title:{
            color: colors.black,
            fontSize: 15,
            marginLeft:10
        },
        container:{
            height: 35,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:colors.page_background
        },
    });

    return (
        <TouchableOpacity activeOpacity={0.8}  {...attributes}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flex:1}}/>
                <Text style={styles.value}>{value}</Text>
            </View>

        </TouchableOpacity>
    );
};


export default BankOrderListSectionHeader