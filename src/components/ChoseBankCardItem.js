import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'

const ChoseBankCardItem = props => {
    const {
        imgIconUrl,
        bankNameValue,
        cardNoValue,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        avatar: {
            width: 20,
            height: 20,
            borderRadius: 10,
            marginLeft: 15,
        },

        left_value: {
            marginLeft: 10,
            color:colors.black,
            font:15
        },

        right_space: {
            marginRight: 10
        },

        backGround:{
            flexDirection:'row',
            backgroundColor:colors.white
        }
    });

    const renderbankContent = () => {
        return <View style={styles.textAvatar}>
            <Text style={styles.bankName_value}>{bankNameValue}</Text>
            <Text style={styles.bankType_value}>{bankTypeValue}</Text>
            <Text style={styles.cardNo_value}>{cardNoValue}</Text>
        </View>
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container]} onPress ={click} {...attributes}>
            <View style={styles.background_container}>
                <View style={styles.content_container} >
                    <Image style={styles.avatar} source={{uri:imgIconUrl}}/>
                    {renderbankContent()}
                </View>
            </View>

        </TouchableOpacity>
    );
};


export default ChoseBankCardItem