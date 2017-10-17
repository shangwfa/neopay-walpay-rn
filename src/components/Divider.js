import React from 'react';
import {View, StyleSheet,ViewPropTypes as RNViewPropTypes} from 'react-native';
import colors from '../constants/colors';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
let styles = {};

const Divider = ({style}) =>
    <View style={[styles.container, style && style]}/>;

Divider.propTypes = {
    style: ViewPropTypes.style,
};

styles = StyleSheet.create({
    container: {
        height: 0.5,
        backgroundColor: colors.divider,
    },
});

export default Divider;