/**
 * @author: carlos.guo
 * @data:  2017/11/8.
 * @description: 发红包--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, TextInput, TouchableOpacity,
} from 'react-native'
import Space from "./Space";
import img_arrow_right from "../res/img/img_select_add_bank_card.png";
import ScreenUtils from "../utils/ScreenUtils";
class RedPacketInputComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerTypeStyle]} activeOpacity={0.9}
                              onPress={this._handleTextInputClick.bind(this)}>
                <Text style={[styles.content_type_txt]}>{this.props.contentType}</Text>
                <Space/>
                <TextInput
                    style={[styles.text_input_txt, this.props.textInputStyle]}
                    placeholder={this.props.placeholderType}
                    placeholderTextColor="#DDD"
                    underlineColorAndroid='transparent'
                    keyboardType={this.props.keybordType}
                    value={this.props.conentValue}
                    textAlign='right'
                    editable={this.props.isEditable}
                    onChangeText={this._handleTextInputChangeText.bind(this)}
                />
                <Text style={{fontSize: 14, color: "#666"}}>{this.props.contentEndUnit}</Text>
                {this._renderRightArrow()}
            </TouchableOpacity>
        );
    }

    _renderRightArrow = () => {
        if (this.props.isShowArrow) {
            return <Image
                style={[this.props.rightArrowStyle, styles.img_arrow]}
                source={img_arrow_right}/>;
        } else {
            return <View style={[{width: 30}]}/>;
        }
    };
    _handleTextInputClick = () => {
        this.props.onTextInputClick(this.props.conentValue);
    };
    _handleTextInputChangeText = (text) => {
        this.props.textInputChangeListener(text);
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        height: 51,
        alignItems: "center"
    },
    content_type_txt: {
        marginLeft: 13,
        marginRight: 13,
        fontSize: 14,
        color: "#333"
    },
    text_input_txt: {
        flex: 3,
        fontSize: 14,
        color: "#666",
    },
    img_arrow: {
        marginLeft: 10,
        width: 7,
        height: 12,
        marginRight: 13
    }

});

export default RedPacketInputComponent