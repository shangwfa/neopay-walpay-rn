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


const BankOrderListItem = props => {
    const {
        orderType,
        middleUpValue,
        middleBottomValue,
        rightUpValue,
        rightBottomValue,
        rightBottomStyle,
        isLine,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 10
        },

        right_container: {
            marginRight: 10
        },
        middle_bottom_value: {
            marginTop: 15,
            color: colors.balck_more_light,
            fontSize: 12
        },
        middle_up_value: {
            color: colors.black,
            fontSize: 15
        },
        middle_container: {
            marginLeft: 20,
        },
        content_container: {
            flexDirection: 'row',
            height: 67,
            alignItems: 'center',
            marginLeft: 10
        },
        container: {
            backgroundColor: colors.white
        }
    });

    const renderLine = () => {
        if (isLine) return <Divider style={{marginLeft: 10}}/>
    }

    const renderOrderAvatar = () => {

        if (orderType === 'scan') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_saosao.png')}/>
        } else if (orderType === 'payCode') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_fukuan.png')}/>
        } else if (orderType === 'redPocket') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_dahongbao.png')}/>
        } else if (orderType === 'mobile') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_chongzhi.png')}/>
        } else if (orderType === 'withDraw') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_tixian.png')}/>
        } else if (orderType === 'mobileWithDraw') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_chongzhi.png')}/>
        } else if (orderType === 'shopAct') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_shangdian.png')}/>
        } else if (orderType === 'sysAct') {
            return <Image style={styles.avatar} source={require('../res/img/BankCardOrder/wd_pingtai.png')}/>
        }

    }

    const renderMiddleValue = () => {
        return <View>
            <Text style={styles.middle_up_value}>{middleUpValue}</Text>
            <Text style={styles.middle_bottom_value}>{middleBottomValue}</Text>
        </View>
    }

    const renderRightValue = () => {
        return <View style={styles.right_container}>
            <Text style={styles.middle_up_value}>{rightUpValue}</Text>
            {renderRightBottom()}

        </View>
    }

    renderRightBottom=()=>{
        if(rightBottomValue){
            return <Text style={[styles.middle_bottom_value, rightBottomStyle && rightBottomStyle]}>{rightBottomValue}</Text>
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container]} {...attributes}>
            <View style={styles.content_container}>
                {renderOrderAvatar()}
                {renderMiddleValue()}
                <View style={{flex: 1}}/>
                {renderRightValue()}
            </View>
            {renderLine()}

        </TouchableOpacity>
    );
};


export default BankOrderListItem