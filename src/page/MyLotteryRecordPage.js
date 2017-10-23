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


class MyLotteryRecordPage extends BasePage {

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的中奖纪录'/>
                <View style = {styles.headerView}>
                    <View style={styles.headerImg}>
                        <Image source = {require('../res/img/LotteryRecord/wd_hongbao3.png')}>

                            <Text style = {styles.redHeightTitle}>
                                4756元
                            </Text>
                        </Image>

                    </View>

                    <View style = {styles.desLabel}>
                        <Text style = {styles.desLabelText}>
                            共参与
                        </Text>
                        <Text style = {styles.redHeightText}>
                            78
                        </Text>
                        <Text style = {styles.desLabelText}>
                            次活动,中奖
                        </Text>
                        <Text style = {styles.redHeightText}>
                            67
                        </Text>
                        <Text style = {styles.desLabelText}>
                            次.获得
                        </Text>
                        <Text style = {styles.redHeightText}>
                            4756元
                        </Text>
                    </View>
                        <Text style = {styles.detailLabel}>
                            平台共发布134次活动,中奖池金额4567.89元
                        </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    headerView:{
        backgroundColor:'white',
    },
    headerImg:{
        alignItems:'center',
        marginTop:20,
    },
    redHeightTitle:{
        color:'red',
        fontSize: 35,
        backgroundColor: 'transparent',
        // alignItems:'center',
        // justifyContent:'center',
        marginTop:20,
        marginLeft:70,
        width:180,
    },
    desLabel:{
        flexDirection:'row',
        marginLeft:13,
        marginTop:20,
        height:30,
        backgroundColor:'green',
        alignItems:'center',
    },

    desLabelText:{
        fontSize:14,
        height:20,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
    },
    redHeightText:{
        color:'red',
        fontSize:18,
        height:20,
        justifyContent:'center',
        backgroundColor:'gray',
    },
    detailLabel:{
        marginTop:10,
        marginLeft:13,
        marginBottom:18,
    }

});

export default MyLotteryRecordPage