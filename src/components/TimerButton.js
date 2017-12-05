import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    NativeModules
} from 'react-native'
import {colors} from '../constants/index'
import StringUtils from '../utils/StringUtils'
import NetUtil from '../utils/NetUtil'
import ApiManager from '../utils/ApiManager'

class TimerButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true
        }
    }

    cutDownTime=()=>{
        const codeTime = this.state.timerCount;
        const now = Date.now()
        const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
        this.interval = setInterval(() =>{
            const nowStamp = Date.now()
            if (nowStamp >= overTimeStamp) {
                /* 倒计时结束*/
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            }else{
                const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10)
                this.setState({
                    timerCount: leftTime,
                    timerTitle: `重新获取(${leftTime}s)`,
                })
            }
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    postGetCerfitySMSCode=()=>{
        ApiManager.getCerfitySMSCode((data) => {
            this.setState({
                timerTitle: `重新获取(60s)`,
            })

            const {counting,selfEnable} = this.state
            if (!counting && selfEnable) {
                this.setState({selfEnable:false})
                this.cutDownTime()
            }
        });
    }

    postGetBindBankCardSMSCode=()=>{
        let body = {
            cardNo:this.props.info.cardNo,
            bindCardType:this.props.info.bindCardType,
            cvv2:this.props.info.cvv2,
            validDate:this.props.info.validDate,
            phone:this.props.info.phone,
        };
        ApiManager.getBindBankCardSMSCode(body, (data) => {
            this.setState({
                timerTitle: `重新获取(60s)`,
            })

            const {counting,selfEnable} = this.state
            if (!counting && selfEnable) {
                this.setState({selfEnable:false})
                this.cutDownTime()
            }
        });
    }

    sendindBankCardCode=()=>{
        console.log('321123')
        if(this.props.type == 1)
        {
            this.postGetCerfitySMSCode()
        }else if(this.props.type == 2)
        {
            this.postGetBindBankCardSMSCode()
        }
    }

    onPress=()=>{
        console.log(this.props.phone)
        if(StringUtils.isEmpty(this.props.phone)){
            NativeModules.commModule.toast('手机号不能为空')
            return
        }
        if(this.props.phone.length!=11){
            NativeModules.commModule.toast('手机号输入不正确')
            return
        }

        this.sendindBankCardCode()
    }



    render() {
        const {counting,timerTitle,selfEnable} = this.state
        return (
            <TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={()=>this.onPress()}>
                <View style={styles.container}>
                    <Text style={[styles.text,{color: ((!counting  && selfEnable) ? colors.one_color:'gray')}]}>{timerTitle}</Text>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:14
    },
    container: {
        width:120,
        height:44,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default TimerButton