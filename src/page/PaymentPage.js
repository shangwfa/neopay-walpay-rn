import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import Divider from '../components/Divider'
import CommonButton from '../components/CommonButton'

class PaymentPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg',
            name: '胡萝卜的兔子店',
        }
    }

    renderTop = () => {
        return <View style={styles.top_container}>
            <Image style={styles.avatar_img} source={{uri: this.state.avatarUrl}}/>
            <Text style={styles.top_text}>{this.state.name}</Text>
        </View>
    }
    renderInput = () => {
        return (
            <View style={styles.input_container}>
                <Text style={styles.input_title}>¥</Text>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    placeholder='请输入付款金额'
                    numberOfLines={1}
                    onChangeText={this.onChangeText}
                    editable={false}
                />
            </View>
        )
    }

    commite=()=>{

    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='付款'/>
                {this.renderTop()}
                <Text style={styles.pay_text}>付款金额</Text>
                {this.renderInput()}
                <Divider style={{marginLeft:10,marginRight:10}}/>
                <CommonButton value='确认付款' style={{marginTop:50}} onPress={()=>this.commite()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        marginLeft: 10,
        flex: 1,
        fontSize:14,
        color:colors.black,
        marginTop:2
    },
    input_title: {
        fontSize: 30,
        color: colors.black,
        marginLeft:15
    },
    input_container: {
        flexDirection: 'row',
        marginTop: 20
    },
    pay_text: {
        fontSize: 14,
        color: colors.black,
        marginLeft: 15
    },
    top_text: {
        fontSize: 15,
        color: colors.black,
        marginTop: 35,
        marginLeft: 10
    },
    avatar_img: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginTop: 18
    },
    top_container: {
        flexDirection: 'row',
        height: 140,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});

export default PaymentPage