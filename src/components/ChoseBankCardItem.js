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
        click,
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
            fontSize:15
        },

        right_space: {
            width:7,
            height:12,
            marginRight:20
        },

        backGround:{
            flexDirection:'row',
            backgroundColor:colors.white,
            height:50,
            alignItems:'center'
        }
    });

    const renderbankContent = () => {
        return <View style={styles.backGround}>
            <Image style={styles.avatar} source={{uri:imgIconUrl}}/>
            <Text style={styles.left_value}>{bankNameValue}</Text>
            <Text style={styles.left_value}>({cardNoValue})</Text>
            <View style={{flex: 1, height: 1}}/>
            <Image style={styles.right_space} source={require("../res/img/right_arrow.png")}/>
        </View>
    }

    return (
        <TouchableOpacity  onPress ={click} {...attributes}>
            {renderbankContent()}
        </TouchableOpacity>
    );
};


export default ChoseBankCardItem