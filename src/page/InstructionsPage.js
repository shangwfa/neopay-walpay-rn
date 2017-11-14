/**
 * @author: carlos.guo
 * @data:  2017/11/14.
 * @description: 使用说明(各种类行)--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
class InstructionsPage extends BasePage {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='使用说明'/>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text>使用说明页面</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default InstructionsPage