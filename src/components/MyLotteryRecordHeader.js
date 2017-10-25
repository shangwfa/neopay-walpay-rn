import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

class MyLotteryRecordHeader extends Component {
    render() {
        return (

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
                            次活动，中奖
                        </Text>
                        <Text style = {styles.redHeightText}>
                            67
                        </Text>
                        <Text style = {styles.desLabelText}>
                            次。获得
                        </Text>
                        <Text style = {styles.redHeightText}>
                            4756元
                        </Text>
                    </View>
                    <Text style = {styles.detailLabel}>
                        平台共发布134次活动，中奖池金额4567.89元
                    </Text>

                </View>

        );
    }
}

const styles = StyleSheet.create({
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
        height:20,
        alignItems:'flex-start',
    },

    desLabelText:{
        fontSize:14,
        height:20,
        marginTop:6,
        color:'#666666',
    },
    redHeightText:{
        color:'red',
        fontSize:18,
        height:20,
        margin:2,
        justifyContent:'center',
    },
    detailLabel:{
        marginTop:10,
        marginLeft:13,
        marginBottom:18,
        fontSize:13,
        color:'#666666',
    },
});

export default MyLotteryRecordHeader