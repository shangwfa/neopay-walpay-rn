import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'

class RedPacketsReadyPage extends BasePage {
    render() {
        return (
            <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='发红包'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RedPacketsReadyPage