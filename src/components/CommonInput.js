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
import {Divider} from '../components/index'

class CommonInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            isShowInputClear: false
        }
    }


    render() {
        let data = this.props.data
        let keybordType = data.keyboard ? 'default' : data.keyboard
        let isLine=data.isLine&&data.isLine
        return (
            <View style={styles.container}>
                <View style={styles.content_container}>
                    <Text style={styles.title}>
                        {data.key}
                    </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        placeholder={data.placeholder}
                        numberOfLines={1}
                        onChangeText={this.onChangeText}
                        keyboard={keybordType}
                        value={this.state.inputText}
                    />
                    {this.input_close_img()}
                </View>
                {this.renderLine(isLine)}
            </View>)
    }

    renderLine=(isLine)=>{
        if(isLine) return <Divider style={{marginLeft:10}}/>
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
    input:{
        marginLeft: 10,
        flex: 1,
        fontSize:15,
        color:colors.black
    },
    title:{
        width:80,
        marginLeft: 10,
        fontSize:15,
        color:colors.black
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
    container:{
        backgroundColor:colors.white
    }
})

export default CommonInput