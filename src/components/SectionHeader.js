import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'
import right_arrow from '../res/img/filter_arrow.png'

const SectionHeader = props => {
    const {
        title,
        value,
        isShowValue,
        isShowArrow,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        img: {
            width: 10,
            height: 15,
            marginRight: 10,
        },
        value:{
            color: colors.black_light,
            fontSize: 15,
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

    const renderValue=()=>{
        if(isShowValue){
            return <Text style={styles.value}>{value}</Text>
        }
    }

    const renderArrow=()=>{
        if(isShowArrow){
            return <Image style={styles.img} source={right_arrow}/>
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.8}  {...attributes}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flex:1}}/>
                {renderValue()}
                {renderArrow()}
            </View>

        </TouchableOpacity>
    )
};



export default SectionHeader
