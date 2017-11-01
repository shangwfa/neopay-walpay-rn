import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeModules
} from 'react-native'
import {TabNavigator,TabBarTop} from 'react-navigation'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from '../constants/index'
import MerchantActivity from '../page/MerchantActivityPage'
import MerchantRedPacket from '../page/MerchantRedPacketPage'
class MerchantActivityListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='胡萝卜的兔子店'/>
                <MerchantActivityListTab/>
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


const MerchantActivityListTab = TabNavigator({
    personalInfo: {
        screen: MerchantRedPacket,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '大红包',
        })
    },
    activityList: {
        screen: MerchantActivity,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '活动',
        })},
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled:true,
    scrollEnabled:true,
    tabBarOptions: {
        activeTintColor: colors.one_color,
        inactiveTintColor: colors.black,
        swipeEnabled:true,
        style: {
            backgroundColor: colors.white,
        },
        labelStyle: {
            fontSize: 18, // 文字大小
        },
        tabStyle:{
            justifyContent:'center',
            alignItems:'center'
        }
    },
    tabBarComponent: props => (
        <TabBarTop {...props} indicatorStyle={{ backgroundColor: colors.one_color, height:1.5,}} />
    ),
})

export default MerchantActivityListPage