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
import CommonButton from "../components/CommonButton"
import {RouterPaths} from "../constants/RouterPaths"
import ScreenUtils from "../utils/ScreenUtils"
import NetUtil from "../utils/NetUtil"
import FormatUtils from "../utils/FormatUtils";


let sizeRatio = ScreenUtils.width/375.0;

class MyBalancePage extends BasePage {

    constructor(props){
        super(props);
        this.state={
            data:{
                "balance":0.00,
                "frozenBalance":20
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation} title='账户余额' rightTitle='交易记录' onRightPress={()=>{
                    this.props.navigation.navigate(RouterPaths.TRADE_RECORD_LIST_PAGE, {pageType: 0})
                }} header_middleStyle={{flex:1.4}}/>
                <View style={styles.logoImg}>
                    <Image source={require("../res/img/HomePage/sy_yue.png")} style={{height:145*sizeRatio,width:161*sizeRatio,}}/>
                </View>
                <View style={styles.desTextView}>
                    <Text style ={styles.desText}>
                        余额(元)
                    </Text>
                </View>
                <View style={styles.numberTextView}>
                    <Text style={styles.RMBText}>
                        {`¥ `}
                    </Text>
                    <Text style ={styles.numberText}>
                        {FormatUtils.money(this.state.data.balance)}
                    </Text>
                </View>

                {/*<CommonButton style={styles.topupBtn} value={'充值'} onPress={()=>this.topupBtnClicked()}/>*/}
                <CommonButton style={styles.withDrawBtn} value={'提现'} onPress={()=>this.withdrawBtnClicked()}/>
            </View>
        );
    }


    topupBtnClicked = () => {
        this.props.navigation.navigate(RouterPaths.ACCOUNT_TOPUP)
    }

    withdrawBtnClicked=()=>{
        this.props.navigation.navigate(RouterPaths.ACCOUNT_WITHDRAW_PAGE)
    }

    componentDidMount() {

        NetUtil.post('balance/get_user_balance', {}, (data) => {
            this.setState({
                data: data
            })
        })
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.page_background,
    },
    logoImg:{
        alignItems:'center',
        marginTop:68*sizeRatio,
        marginBottom:40*sizeRatio,
        // backgroundColor:'purple'
    },
    desTextView:{
        alignItems:'center',
        // backgroundColor:'yellow'
    },
    desText:{
        fontSize:15,
        color:'#999999',
    },
    numberTextView:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:19*sizeRatio,
        // backgroundColor:'gray'
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
        marginTop:65*sizeRatio,
        // backgroundColor:'green'
    },
    withDrawBtn:{
        marginTop:65*sizeRatio,
    }
});

export default MyBalancePage