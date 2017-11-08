import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';
import {colors} from '../constants/index'
import search_icon from '../res/img/search_icon.png'

const RedPacketReceiverInput = props => {
    const {
        value,
        style,
        onRightBtnPress,
        onChangeText,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        right_btn: {
            width: 55,
            height: 28,
            backgroundColor: colors.one_color,
            marginRight: 10,
            marginLeft: 10,
            borderRadius:5,
            justifyContent:'center',
            alignItems:'center'
        },
        input: {
            flex: 1,
            marginLeft: 10,
        },
        left_img: {
            height: 17,
            width: 17,
            marginLeft: 10
        },
        container: {
            flexDirection: 'row',
            backgroundColor: colors.white,
            height: 50,
            alignItems: 'center'
        },
    });

    return (
        <View style={[styles.container,style&&style]}>
            <Image style={styles.left_img} source={search_icon}/>
            <TextInput
                style={styles.input}
                underlineColorAndroid={'transparent'}
                placeholder='输入领取人手机号'
                numberOfLines={1}
                onChangeText={onChangeText}
                keyboardType='numeric'
                value={value}
            />
            <TouchableOpacity style={styles.right_btn} onPress={()=>onRightBtnPress()}>
                <Text style={{fontSize: 14, color: colors.white}}>添加</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedPacketReceiverInput
