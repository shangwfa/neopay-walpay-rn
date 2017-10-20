import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../constants/index'
import {Divider} from '../components/index'
import MoreClickComponet from '../components/MoreClickComponet'
import right_arrow from '../res/img/right_arrow.png'


const CommonKeyValueItem = props => {
    const {
        title,
        value,
        realNameValue,
        imgUrl,
        isArrow,
        isLine,
        style,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight:10
        },
        real_name: {
            color: colors.white,
            fontSize: 10,
            backgroundColor: '#FF7373',
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 3,
            paddingTop: 3,
            marginRight:10
        },
        arrow_img: {
            width: 7,
            height: 12,
            marginRight: 10,
        },
        title: {
            color: colors.black,
            fontSize: 14,
            marginRight:10
        },
        content_container: {
            flexDirection: 'row',
            height: 56,
            alignItems: 'center',
            marginLeft: 10
        },
        container: {
            backgroundColor: colors.white
        }
    });

    const renderLine = () => {
        if (isLine) return <Divider style={{marginLeft:10}}/>
    }

    const renderArrow = () => {
        if (isArrow) return <Image style={styles.arrow_img} source={right_arrow}/>
    }

    const renderValue = () => {
        if (value) return <Text style={styles.title}>{value}</Text>
    }

    const renderRealName = () => {
        if (realNameValue) return <Text style={styles.real_name}>{realNameValue}</Text>
    }

    const renderAvatar = () => {
        if (imgUrl) return <Image style={styles.avatar} source={{uri:imgUrl}}/>
    }
    return (
        <MoreClickComponet activeOpacity={0.8} style={[styles.container,style&&style]} {...attributes}>
            <View style={styles.content_container}>
                <Text style={styles.key}>
                    {title}
                </Text>
                <View style={{flex: 1, height: 1}}/>
                {renderAvatar()}
                {renderValue()}
                {renderRealName()}
                {renderArrow()}
            </View>
            {renderLine()}

        </MoreClickComponet>
    );
};


CommonKeyValueItem.propTypes = {
    key: PropTypes.string,
    value: PropTypes.string,
    realNameValue: PropTypes.string,
    isArrow: PropTypes.bool,
};


export default CommonKeyValueItem;
