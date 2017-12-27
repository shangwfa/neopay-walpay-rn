/**
 * @author: carlos.guo
 * @data:  2017/12/7.
 * @description:  信息验证--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, TextInput,
} from 'react-native'
import TimerButtonComponent from "./TimerButtonComponent";
class AuthMessageComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View ref="authMsg" style={[{marginLeft: 19, flexDirection: "column"}, this.props.style]}>
                <View style={{flexDirection: "row", alignItems: 'center', height: 40,}}>
                    <Image
                        style={{height: 17, width: 16, resizeMode: "contain"}}
                        source={this.props.icon}/>
                    <TextInput
                        style={styles.text_input_txt}
                        placeholder={this.props.placeholderType}
                        placeholderTextColor="#CACACF"
                        underlineColorAndroid='transparent'
                        keyboardType={this.props.keybordType}
                        value={this.props.contentValue}
                        textAlign='left'
                        editable={this.props.isEditable}
                        onChangeText={this._handleTextInputChangeText.bind(this)}
                    />
                    {this._renderTimerView()}
                </View>
                <View style={styles.line}/>
            </View>
        );
    }

    _renderTimerView = () => {
        if (this.props.isShowTimer) {
            return <TimerButtonComponent
                ref="timer"
                onPress={this._handleTimerClick.bind(this)}/>;
        } else {
            return null;
        }
    };

    startTimerClick = () => {
        this.refs.timer.startCutDownTime();
    };
    _handleTimerClick = () => {
        this.props.timerClick();
    };
    _handleTextInputChangeText = (text) => {
        this.props.textInputChangeText(text);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_input_txt: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        marginLeft: 10,
    },
    line: {
        height: 1,
        marginTop: -8,
        marginRight: 16,
        marginLeft: 20,
        backgroundColor: "#DCDCDC"
    }
});

export default AuthMessageComponent