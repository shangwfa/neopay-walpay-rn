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
import {TabNavigator,TabBarTop} from 'react-navigation'
import MoneyTopUpView from '../components/PhoneTopUpCellView'



class PhoneTopUpPage extends BasePage {
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='手机充值' rightTitle="充值记录"/>
                <PhoneTopUpTabNavigator/>
            </View>
        );
    }
}

const PhoneTopUpTabNavigator = TabNavigator({
    MoneyTopUp:{
        screen:props=> <MoneyTopUpView{...props} viewType={false}/>,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '充话费',
        }),
    },
    CelluarTopUp:{
        screen:props=> <MoneyTopUpView{...props} viewType={true}/>,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '冲流量',
        }),
    }
    },
    // TabNavigator({ Info: { screen: props => <Info {...props} color="#fff" />} });
    {
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled:false,
    scrollEnabled:false,
    tabBarOptions: {
    activeTintColor: colors.one_color,
        inactiveTintColor: colors.black,
        swipeEnabled:false,
        style: {
        backgroundColor: 'transparent',
    },
    labelStyle: {
        fontSize: 15, // 文字大小
    },
    allowFontScaling:false,
    tabStyle:{
        justifyContent:'center',
            alignItems:'center'
    },
    style:{
        height:50,
        backgroundColor:'transparent'
    }
},
    tabBarComponent: props => (
        <TabBarTop {...props} indicatorStyle={{ backgroundColor: colors.one_color, height:3}} />
    ),

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

export default PhoneTopUpPage