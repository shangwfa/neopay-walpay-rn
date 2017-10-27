import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'
import ScreenUtils from "../utils/ScreenUtils"

const CommonItemThree = props => {
    const {
        title,
        ...attributes
    } = props

    const styles = StyleSheet.create({

        content_container: {
            height: 50,
            width:ScreenUtils.width,
            alignItems: 'center',
            justifyContent:'center'
        },
        container: {
            backgroundColor: colors.white
        }
    });

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container]} {...attributes}>
            <View style={styles.content_container}>
                <Text> {title}</Text>
            </View>
        </TouchableOpacity>
    );
};


export default CommonItemThree