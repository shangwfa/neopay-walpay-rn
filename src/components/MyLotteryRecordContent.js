import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    TouchableWithoutFeedback,
} from 'react-native'
import {TabNavigator,TabBarTop} from 'react-navigation'
import ActivityList from './MyLotteryRecordActiList'
import RedPacketList from './MyLotteryRecordRedpList'
import {colors} from '../constants/index'


class MyLotteryRecordContent extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MyLotteryRecordTab/>

        );
    }
}

const MyLotteryRecordTab = TabNavigator({
    personalInfo: {
        screen: RedPacketList,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '大红包',
        })
    },
    activityList: {
        screen: ActivityList,
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
            backgroundColor: 'transparent',
        },
        labelStyle: {
            fontSize: 15, // 文字大小
        },
        tabStyle:{
            justifyContent:'center',
            alignItems:'center'
        }
    },
    tabBarComponent: props => (
        <TabBarTop {...props} indicatorStyle={{ backgroundColor: colors.one_color, height:3,}} />
    ),
})

export default MyLotteryRecordContent