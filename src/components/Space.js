import React from 'react';
import {View, StyleSheet} from 'react-native';

let styles = {};

const Space = () =>
    <View style={[styles.container]}/>;

styles = StyleSheet.create({
    container: {
        flex:1,
        height: 1,
    },
});

export default Space;