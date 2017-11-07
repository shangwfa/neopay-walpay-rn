import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonBtn from '../components/CommonButton'
import ScreenUtils from '../utils/ScreenUtils'
import Divider from '../components/Divider'

class RedPacketsReadyPage extends BasePage {

    static defaultProps ={
        isReady:true
    };

    render() {
        return (
            <View style={[styles.container,{backgroundColor:this.props.isReady?'#F2F2F2':'#FFFFFF'}]}>
                <Header navigation={this.props.navigation} title='发红包'/>
                {this.renderContent()}
                {this.renderBottom()}
            </View>
        );
    }

    renderContent=()=>{
        if(!this.props.isReady){
            return(
                <View style={styles.failedView}>
                    <Image source={require('../res/img/HomePage/sy_shibai.png')} style={styles.failedIcon}/>
                    <Text style={styles.failedText1}>红包没包好</Text>
                    <Text style={styles.failedText2}>红包付款失败，请再来一次</Text>
                    <CommonBtn style={styles.failedBtn} value={'重新包一下'}></CommonBtn>
                </View>
            )
        }else {
            return(
                <FlatList
                    data={[{key: '红包总价值',value:'¥67.85'}, {key: '付款方式',value:'中信银行储蓄卡(8989)'}]}
                    renderItem={this.renderReadyCell}
                    ListHeaderComponent = {this.renderReadyHeader}
                    ListFooterComponent = {this.renderReadyFooter}
                />
            )
        }
    };

    renderReadyCell=({item}) => {
        return(
            <View>
            <View style={styles.readyCellView}>
                <Text style={styles.readyCellName}>{item.key}</Text>
                <View style={styles.readyCellSep}></View>
                <Text style={styles.readyCellDes}>{item.value}</Text>
            </View>
                <Divider style={{marginLeft:12}}/>
            </View>
        )
    }

    renderReadyHeader=()=>{
        return(
            <View style={{backgroundColor:'#FFFFFF',alignItems:'center',marginBottom:9}}>
                <Image source={require('../res/img/HomePage/sy_fasong.png')} style={{marginTop:16}}/>
                <Text style={{fontSize:16,color:'#09BB07',marginTop:14,marginBottom:23}}>红包好啦</Text>
            </View>
        )
    }

    renderReadyFooter=()=>{
        return(
            <View>
                <CommonBtn style={{width:ScreenUtils.width, marginTop:51,}} value={'分享红包至微信领取'}/>
                <CommonBtn style={{width:ScreenUtils.width, marginTop:20}} backgroundColor={'#FFFFFF'} textColor={'#CCCCCC'} value={'添加指定领取人领取'}/>
            </View>
        )
    }

    renderBottom=()=>{
        return(
            <View style={{marginLeft:13}}>
                <View style={{flexDirection:'row',height:20,alignItems:'center',marginBottom:20}}>
                    <Image source={require('../res/img/HomePage/sy_hongbao2.png')}/>
                    <Text style={{fontSize:15,color:'#333333',marginLeft:5}}>红包领取攻略</Text>
                </View>
                <View>
                    <Text style={{marginBottom:13, fontSize:13, color:'#999999'}}>
                        1. 添加制定领取人，ta将收到红包消息、短信提醒
                    </Text>
                    <Text style={{marginBottom:20, fontSize:13, color:'#999999'}}>
                        2. 或可将该红包分享至微信，方便领取
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    failedView:{
        alignItems:'center',
        width:ScreenUtils.width,
    },
    failedIcon:{
        marginTop:16,

    },
    failedText1:{
        marginTop:14,
        fontSize:16,
        color:'#E94D3D',
    },
    failedText2:{
        marginTop:19,
        fontSize:14,
        color:'#999999',
    },
    failedBtn:{
        marginTop:49,
        width:ScreenUtils.width,
    },

    readyCellView:{
        flexDirection:'row',
        height:50,
        alignItems:'center',
        backgroundColor:'#FFFFFF',
    },
    readyCellName:{
        marginLeft:12,
        fontSize:14,
        color:'#333333',
    },
    readyCellSep:{
        flex:1,
    },
    readyCellDes:{
        marginRight:12,
        fontSize:14,
        color:'#666666'
    }
});

export default RedPacketsReadyPage