import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {colors} from '../constants/index'
import keyboard_clear from '../res/img/keyboard_clear.png'
import KeyboardNumItem from '../components/KeyboardNumItem'
import hide_keyboard from '../res/img/hide_keyboard.png'
import Divider from '../components/Divider'
import constant from '../constants/constant'
const KeyboardView = props => {
    const {
        onCommonPress,
        onSpecialPress,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        hide_keyboard: {
            width: 34,
            height: 32,
        },
        clear_img: {
            width: 32,
            height: 24,
        },
        clear_item: {
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pay_text: {
            fontSize: 17,
            color: colors.white
        },
        pay_item: {
            flex: 1,
            backgroundColor: colors.one_color,
            justifyContent: 'center',
            alignItems: 'center'
        },
        keyboard_item: {
            flex: 1,
            flexDirection: 'row'
        },
        special_container: {
            flex: 1,
        },
        number_container: {
            flex: 3,
        },
        container: {
            height: 218,
            flexDirection: 'row',
            backgroundColor: colors.white,

        },
    });

    const specialPress = (type) => {
        onSpecialPress(type)
    }
    const commonPress = (type) => {
        onCommonPress(type)
    }
    return (
        <View>
            <Divider/>
            <View style={styles.container}>
                <View style={styles.number_container}>
                    <View style={styles.keyboard_item}>
                        <KeyboardNumItem value='1' onPress={() => commonPress('1')}/>
                        <KeyboardNumItem value='2' onPress={() => commonPress('2')}/>
                        <KeyboardNumItem value='3' onPress={() => commonPress('3')}/>
                    </View>
                    <View style={styles.keyboard_item}>
                        <KeyboardNumItem value='4' onPress={() => commonPress('4')}/>
                        <KeyboardNumItem value='5' onPress={() => commonPress('5')}/>
                        <KeyboardNumItem value='6' onPress={() => commonPress('6')}/>
                    </View>
                    <View style={styles.keyboard_item}>
                        <KeyboardNumItem value='7' onPress={() => commonPress('7')}/>
                        <KeyboardNumItem value='8' onPress={() => commonPress('8')}/>
                        <KeyboardNumItem value='9' onPress={() => commonPress('9')}/>
                    </View>
                    <View style={styles.keyboard_item}>
                        <KeyboardNumItem value='.' onPress={() => commonPress('.')}/>
                        <KeyboardNumItem value='0' onPress={() => commonPress('0')}/>
                        <TouchableOpacity style={styles.clear_item} onPress={() => specialPress(constant.KEYBOARD_HIDE)}>
                            <Image style={styles.hide_keyboard} source={hide_keyboard}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.special_container}>
                    <TouchableOpacity style={styles.clear_item} onPress={() => specialPress(constant.KEYBOARD_CLEAR)}>
                        <Image style={styles.clear_img} source={keyboard_clear}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pay_item} onPress={() => specialPress(constant.KEYBOARD_ENSURE)}>
                        <Text style={styles.pay_text}>付款</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

KeyboardView.propTypes = {
    onCommonPress:PropTypes.func,
    onSpecialPress: PropTypes.func,
};

export default KeyboardView
