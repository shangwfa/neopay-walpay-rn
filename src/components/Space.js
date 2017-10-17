import React from 'react';
import {View, StyleSheet} from 'react-native';

let styles = {};

const Space = ({style}) =>
    <View style={[styles.container,style&style]}/>;

styles = StyleSheet.create({
    container: {
        flex:1,
        height: 1,
    },
});

export default Space;