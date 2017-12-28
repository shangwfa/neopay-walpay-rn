import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from "../constants";
import ScreenUtils from "../utils/ScreenUtils";

const sizeRatioH = ScreenUtils.height/667.0;
class AboutUsPage extends BasePage {
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='关于我们'/>
                <View style={{alignItems:'center'}}>
                <Image source={require('../res/img/icon-1024.png')} style={{height:92,width:92,marginTop:36*sizeRatioH}}/>
                <Text style={{fontSize:20,fontWeight:'bold',marginTop:19*sizeRatioH}}>新光钱包</Text>
                <Text style={{marginTop:12*sizeRatioH,fontSize:12, color:'#A3A3A3'}}>V1.0.0</Text>
                <Text style={{marginTop:39*sizeRatioH, color:'#333333',fontSize:14,marginLeft:23,marginRight:23,lineHeight:20}}>{`\u3000\u3000新光钱包是一款集合了新光集团旗下多个线上APP的一款客户端。用户可在该客户端上方便快捷的了解并使用新光集团下的多个产品。`}</Text>
                <Text style={{marginTop:39*sizeRatioH, color:'#333333',fontSize:14,marginLeft:23,marginRight:23,lineHeight:20}}>{`\u3000\u3000客户端还集成了大红包，手机充值等功能，方便快捷支持用户使用。支持余额免费提现至银行卡，是一款真正免费的钱包产品。`}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});

export default AboutUsPage