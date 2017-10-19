import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import {colors} from '../constants/index'
import {Divider} from '../components/index'
import ScreenUtils from '../utils/ScreenUtils'

const CommonKeyValueItem = props => {
    const {key, value, imgUrl, realNameValue,} = props

    const styles = StyleSheet.create({
        content_container: {
            height: 56,
            width: ScreenUtils.width
        },
        container: {
            backgroundColor: colors.white
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.content_container}>

            </View>
            <Divider/>
        </View>
    )

}


CommonKeyValueItem.propTypes = {
    key: PropTypes.string,
    value: PropTypes.string,
    imgUrl: PropTypes.string,
    realNameValue: PropTypes.string
}


export default {CommonKeyValueItem}



