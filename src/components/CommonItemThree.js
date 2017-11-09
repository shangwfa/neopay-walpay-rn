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
import right_arrow from '../res/img/right_arrow.png'

const CommonItemThree = props => {
    const {
        source,
        title,
        isShowArrow=true,
        style,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        right_arrow: {
            width: 7,
            height: 12,
            marginRight:10
        },
        left_img: {
            width: 20,
            height: 20,
            marginLeft:10,
            marginRight:10
        },
        content_container: {
            height: 50,
            width: ScreenUtils.width,
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            backgroundColor: colors.white
        }
    });

    const renderLeftImg = () => {
        if (source) {
            return <Image style={styles.left_img} source={source}/>
        }
    }

    const renderArrow = () => {
        if (isShowArrow) {
            return (
                <View style={{flex: 1,flexDirection:'row'}}>
                    <View style={{flex: 1, height: 1}}/>
                    <Image style={styles.right_arrow} source={right_arrow}/>
                </View>)
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container,style&&style]} {...attributes}>
            <View style={styles.content_container}>
                {renderLeftImg()}
                <Text> {title}</Text>
                {renderArrow()}
            </View>
        </TouchableOpacity>
    );
};
CommonItemThree.propTypes = {
    source: Image.propTypes.source,
}

export default CommonItemThree