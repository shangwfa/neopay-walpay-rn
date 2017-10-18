import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {colors} from '../constants/index'


const CommonButton = props => {
    const {
        value,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        value:{
            color: colors.white,
            fontSize: 15,
        },
        container:{
            backgroundColor: colors.one_color,
            height: 50,
            marginLeft: 10,
            marginRight: 10,
            justifyContent:'center',
            alignItems: 'center',
        },
    });

    return (
        <TouchableOpacity activeOpacity={0.8}  {...attributes}>
            <View style={styles.container}>
                <Text style={styles.value}>
                    {value}
                </Text>
            </View>

        </TouchableOpacity>
    );
};



export default CommonButton
