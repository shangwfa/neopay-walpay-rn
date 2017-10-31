import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableHighlight,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonButton from "../components/CommonButton";
import {RouterPaths} from "../constants/RouterPaths"


class MyBalancePage extends BasePage {

    topupBtnClicked(){

    }
    withdrawBtnClicked(){
        this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_PAGE)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='账户余额' rightTitle='余额交易记录'/>
                <View style={styles.logoImg}>
                    <Image source={require("../res/img/sy_yue.png")}/>
                </View>
                <View style={styles.desTextView}>
                    <Text style ={styles.desText}>
                        余额(元)
                    </Text>
                </View>
                <View style={styles.numberTextView}>
                    <Text style={styles.RMBText}>
                        ¥
                    </Text>
                    <Text style ={styles.numberText}>
                        82732.23
                    </Text>
                </View>

                <CommonButton style={styles.topupBtn} value={'充值'} onPress={()=>this.topupBtnClicked()}/>
                <CommonButton style={styles.withDrawBtn} backgroundColor={'#FFFFFF'} textColor={'#999999'}  value={'提现'} onPress={()=>this.withdrawBtnClicked()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.page_background,
    },
    logoImg:{
        alignItems:'center',
        marginTop:68,
        marginBottom:40,
    },
    desTextView:{
        alignItems:'center',
    },
    desText:{
        fontSize:15,
        color:'#999999',
    },
    numberTextView:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:12,
    },
    RMBText:{
        fontSize:17,
        color:'#E66941',
    },
    numberText:{
        fontSize:23,
        color:'#E66941',
    },
    topupBtn:{
        marginTop:65,
    },
    withDrawBtn:{
        marginTop:20,
    }
});

export default MyBalancePage