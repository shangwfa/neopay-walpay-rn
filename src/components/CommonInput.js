import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors'
import close_input_img from '../res/img/input_clear.png'
import Divider from '../components/Divider'
import TimerButton from '../components/TimerButton'
import StringUtils from "../utils/StringUtils";

class CommonInput extends Component {
    static defaultProps = {
        editable: true,
        noEditText: ''
    }

    static propTypes = {
        leftIcon: React.PropTypes.any,
        leftIconStyle: React.PropTypes.style
    }

    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            isShowInputClear: false
        }
    }

    renderVerifyCode = (isVerfyCode) => {
        if (isVerfyCode) {
            return <TimerButton phone={this.props.phone}/>
        }
    }

    renderLeft = () => {
        return (
            <Text style={styles.title}>
                {this.props.data.key}
            </Text>)
    }

    render() {
        let data = this.props.data
        let keybordType = StringUtils.isEmpty(data.keyboard) ? 'default' : data.keyboard
        console.log(keybordType)
        let isLine = data.isLine && data.isLine
        let isVerfyCode = data.isVerfyCode && data.isVerfyCode
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>
                    {this.renderLeft}
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        placeholder={data.placeholder}
                        numberOfLines={1}
                        onChangeText={this.onChangeText}
                        keyboardType={keybordType}
                        value={this.props.editable ? this.state.inputText : this.props.noEditText}
                        onBlur={this.props.onBlur}
                        editable={this.props.editable}
                    />
                    {this.input_close_img()}
                    {this.renderVerifyCode(isVerfyCode)}
                </View>
                {this.renderLine(isLine)}
            </View>)
    }

    renderLine = (isLine) => {
        if (isLine) return <Divider style={{marginLeft: 10}}/>
    }
    onChangeText = (text) => {
        let inputText = ""
        let limitLength = this.props.data.limitlength
        if (text.length > limitLength) {
            //toast 提示
            inputText = text.substring(0, limitLength)
        } else {
            inputText = text;
        }

        this.setState({
            inputText: inputText,
            isShowInputClear: inputText.length > 0 ? true : false
        })
        this.props.onChangeText(inputText)
    }

    input_close_img = () => {
        console.log(this.state.isShowInputClear)
        if (this.state.isShowInputClear) {
            return (
                <TouchableWithoutFeedback onPress={() => this.clear_input()}>
                    <Image style={styles.close_input_img} source={close_input_img}/>
                </TouchableWithoutFeedback>
            )

        }
    }

    clear_input = () => {
        console.log("清除输入内容")
        this.setState({
            inputText: '',
            isShowInputClear: false
        })
    }


}

const styles = StyleSheet.create({
    left_img:{
        width:17,
        height:17
    },
    input: {
        marginLeft: 10,
        flex: 1,
        fontSize: 15,
        color: colors.black
    },
    title: {
        width: 80,
        marginLeft: 10,
        fontSize: 15,
        color: colors.black
    },
    close_input_img: {
        height: 18,
        width: 18,
        marginRight: 10
    },
    content_container: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.white
    }
})

export default CommonInput