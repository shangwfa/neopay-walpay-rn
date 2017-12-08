/**
 * @author: carlos.guo
 * @data:  2017/10/31.
 * @description: 倒计时--组件
 * 开始计时方式：  this.refs.timer.startCutDownTime();
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import {colors} from '../constants/index'

class TimerButtonComponent extends Component {

    static defaultProps = {
        timerCount: 60,
        timerTitle: '获取验证码',
    };

    constructor(props) {
        super(props);
        this.state = {
            timerCount: this.props.timerCount,
            timerTitle: this.props.timerTitle,
        }
    }

    render() {
        return (
            <TouchableOpacity
                ref="timer"
                onPress={this.handleTimerClick.bind(this)}>
                <View style={styles.container}>
                    <Text style={[styles.text]}>{this.state.timerTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    componentWillUnMount() {
        clearInterval(this.interval)
    }

    handleTimerClick = () => {
        this.props.onPress();
    };
    startCutDownTime = () => {
        const codeTime = this.state.timerCount;
        const now = Date.now();
        /*过期时间戳（毫秒） +100 毫秒容错*/
        const overTimeStamp = now + codeTime * 1000 + 100;
        this.interval = setInterval(() => {
            const nowStamp = Date.now();
            if (nowStamp >= overTimeStamp) {
                /* 倒计时结束*/
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle,
                })
            } else {
                const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10);
                this.setState({
                    timerCount: leftTime,
                    timerTitle: `${leftTime}s后重新获取`,
                })
            }
        }, 1000)
    };


}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: colors.one_color
    },
    container: {
        width: 120,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TimerButtonComponent