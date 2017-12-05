import React from 'react'
import {View, StyleSheet,ViewPropTypes as RNViewPropTypes} from 'react-native'
import colors from '../constants/colors'
import ScreenUtils from "../utils/ScreenUtils"

const ViewPropTypes = RNViewPropTypes || View.propTypes;
let styles = {};

const Divider = ({style}) =>
    <View style={[styles.container, style && style]}/>;

Divider.propTypes = {
    style: ViewPropTypes.style,
};

styles = StyleSheet.create({
    container: {
        height: ScreenUtils.onePixel,
        backgroundColor: colors.divider,
    },
});

export default Divider;