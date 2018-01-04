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
import selected_icon from '../res/img/selected_icon.png'
import unselected_icon from '../res/img/unselected_icon.png'
import ScreenUtils from '../utils/ScreenUtils'

const CommonItemTwo = props => {
    const {
        imgUrl,
        middleUpValue,
        middleBottomValue,
        rightUpValue,
        rightBottomValue,
        rightBottomStyle,
        isLine,
        isContacts,
        isSelected,
        imgIconUrl,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        right_icon:{
            width:18,
            height:18,
            marginRight:25
        },
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 10
        },
        mid_view: {
            flexDirection:'row',
            alignItems:'center'
        },

        right_container: {
            marginRight: 10
        },
        middle_bottom_value: {
            marginTop: 10,
            color: colors.balck_more_light,
            fontSize: 12
        },
        middle_up_value: {
            color: colors.black,
            fontSize: 15,
        },
        middle_container: {
            marginLeft: 9,
            width:ScreenUtils.width - 140
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

    const renderMiddleValue = () => {
        return <View style={styles.middle_container}>
            <View style = {styles.mid_view}>
                <Text numberOfLines={1} style={styles.middle_up_value}>{middleUpValue}</Text>
                <Image style= {{marginLeft:10,width:20,height:20,resizeMode:'contain'}} source = {imgIconUrl}/>
            </View>
            <Text style={styles.middle_bottom_value}>{middleBottomValue}</Text>
        </View>
    }

    const renderRightValue = () => {
        return <View style={[styles.right_container]}>
            {renderRightUp()}
            {renderRightBottom()}

        </View>
    }

    const renderRightBottom=()=>{
        if(rightBottomValue){
            return <Text style={[styles.middle_bottom_value, rightBottomStyle && rightBottomStyle]}>{rightBottomValue}</Text>
        }
    }
    const renderRightUp=()=>{
        if(rightUpValue){
            return <Text style={[styles.middle_up_value,{textAlign:"right"}]}>{rightUpValue}</Text>
        }
    }
    const renderRightIcon=()=>{
        if(isContacts){
            return <Image style={styles.right_icon} source={isSelected?selected_icon:unselected_icon}/>
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container]} {...attributes}>
            <View style={styles.content_container}>
                <Image style={styles.avatar} source={{uri: imgUrl}}/>
                {renderMiddleValue()}
                <View style={{flex: 1}}/>
                {renderRightValue()}
                {renderRightIcon()}
            </View>
            {renderLine()}

        </TouchableOpacity>
    );
};


export default CommonItemTwo