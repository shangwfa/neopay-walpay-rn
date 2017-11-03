import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'
import keyboard_clear from '../res/img/keyboard_clear.png'


const KeyboardNumItem = props => {
    const {
        value,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        text_container:{
            height: 54,
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        content_container: {
            flexDirection: 'row'
        },
        container: {
            flex: 1,
            backgroundColor: colors.white,
        },
    });


    return (
        <TouchableOpacity style={styles.container} {...attributes}>
            <View style={styles.content_container}>
                <View style={styles.text_container}>
                    <Text>{value}</Text>
                </View>

                <View style={{width: 0.5, height: 54,backgroundColor:colors.divider}}/>
            </View>
            <View style={{height: 0.5,backgroundColor:colors.divider}}/>
        </TouchableOpacity>
    );
};


export default KeyboardNumItem
