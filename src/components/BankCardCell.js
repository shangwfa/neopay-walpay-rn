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

const BankCardCell = props => {
    const {
        imgBackGroundUrl,
        imgIconUrl,
        bankNameValue,
        bankTypeValue,
        cardNoValue,
        click,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        avatar: {
            width: 34,
            height: 34,
            borderRadius: 17,
            marginLeft: 20,
            marginTop: 20,
        },

        textAvatar: {
            marginLeft: 20
        },

        right_container: {
            marginRight: 10
        },
        bankName_value: {
            marginTop: 20,
            color: colors.white,
            fontSize: 15,
            backgroundColor: 'transparent'
        },
        bankType_value: {
            marginTop: 5,
            color: colors.white,
            fontSize: 11,
            backgroundColor: 'transparent',
        },
        cardNo_value: {
            marginTop: 10,
            color: colors.white,
            fontSize: 15,
            backgroundColor: 'transparent',
        },
        middle_container: {
            marginLeft: 20,
        },
        content_container: {
            flexDirection: 'row',
            height: 140,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 5,
            resizeMode: 'cover',
        },
        container: {
            backgroundColor: colors.black
        },

        background_container: {
            height: 150,
            backgroundColor: colors.white,
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
        <TouchableOpacity activeOpacity={0.8} style={[styles.container]} onPress={click} {...attributes}>
            <View style={styles.background_container}>
                <Image style={styles.content_container} source={{uri: imgBackGroundUrl}}>
                    <Image style={styles.avatar} source={{uri: imgIconUrl}} />
                    {renderbankContent()}
                </Image>
            </View>

        </TouchableOpacity>
    );
};


export default BankCardCell