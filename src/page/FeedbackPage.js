import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from '../constants/index'
import CommonButton from '../components/CommonButton'
import NetUtil from '../utils/NetUtil'

class FeedbackPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: '请写下您的意见。您的意见对我们非常重要，我们将积极采纳。',
            inputText: ''
        };
    }

    commit = () => {
        NetUtil.post('assist/add_feedback', {content:this.state.inputText}, (data) => {
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='意见反馈'/>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    placeholder={this.state.placeholder}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState = {
                            inputText: text
                        }
                    }}
                />
                <CommonButton value='提交' style={{marginTop:50}} onPress={this.commit()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 220,
        backgroundColor: colors.white,
        fontSize:14,
        padding:10,
        color:'#999',
        textAlignVertical:'top'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default FeedbackPage