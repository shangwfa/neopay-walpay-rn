import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import {colors} from '../constants/index'
import {Divider} from '../components/index'
import {Text} from 'react-native-animatable';
import BasePage from './BasePage'
import PasswordInput from '../components/PasswordInput'
import close_icon from '../res/img/close_icon.png'
import img_left_arrow from '../res/img/img_left_arrow.png'
class Test extends BasePage {

    constructor(props) {
        super(props);
    }

    renderTop = () => {
        return (
            <View style={styles.top_container}>
                <TouchableOpacity style={{flex: 1}}>
                    <Image style={styles.close_icon} source={close_icon}/>
                </TouchableOpacity>

                <View style={{flex: 2,alignItems:'center'}}>
                    <Text style={{color:colors.black,fontSize:14}}>请输入支付密码</Text>
                </View>
                <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{color:colors.balck_more_light,fontSize:12,marginRight:10}}>忘记密码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>
                    {this.renderTop()}
                    <Divider/>
                    <Text style={{color:colors.black,fontSize:14}}>到账金额<Text style={{color:colors.black,fontSize:20}}> 38.00元</Text></Text>
                    <PasswordInput style={{width: 290,marginTop:10}} maxLength={6}/>
                    <View style={{marginTop:20,flexDirection:'row',alignItems:'center',marginBottom:13}}>
                        <Text style={{color:colors.balck_more_light,fontSize:14,marginLeft:10}}>付款方式</Text>
                        <View style={{flex:1}}/>
                        <Text style={{color:colors.black_light,fontSize:14,marginLeft:10}}>中信银行卡（8970）</Text>
                        <Image style={{width:7,height:12,marginRight:10}} source={img_left_arrow}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    close_icon: {
        width: 11,
        height: 11,
        marginLeft: 13
    },
    top_container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    content_container: {
        width: 316,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius:5,
    },
    container: {
        backgroundColor: colors.page_background,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Test
