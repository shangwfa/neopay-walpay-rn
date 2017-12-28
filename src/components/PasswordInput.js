/**
 * Created by chenchunyong on 12/2/15.
 */

import React, {
    Component,
    PropTypes,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
} from 'react-native';
import ScreenUtils from '../utils/ScreenUtils'

export default class PasswordInput extends Component {
    static propTypes = {
        style: View.propTypes.style,
        inputItemStyle: View.propTypes.style,
        iconStyle: View.propTypes.style,
        maxLength: TextInput.propTypes.maxLength.isRequired,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: true,
        onChange: () => {
        },
        onEnd: () => {
        },
    };

    state = {
        text: ''
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
                activeOpacity={1}
                underlayColor='transparent'>
                <View style={[styles.container, this.props.style]}>
                    <TextInput
                        style={{height: 45, zIndex: 99, position: 'absolute', width: 45 * 6, opacity: 0}}
                        ref='textInput'
                        maxLength={this.props.maxLength}
                        autoFocus={false}
                        value={this.state.text}
                        keyboardType="numeric"
                        onChangeText={
                            (text) => {
                                this.setState({text});
                                this.props.onChange(text);
                                if (text.length === this.props.maxLength) {
                                    this.props.onEnd(text);
                                }
                            }
                        }
                        onFocus={() => this.props.onTextFocus()}
                        onBlur={() => this.props.onTextBlur()}
                    />
                    {
                        this._getInputItem()
                    }
                </View>
            </TouchableHighlight>
        )

    }

    _clearTextInputContent = () => {
        this.setState({
            text: ""
        });
    };

    _getInputItem() {
        let inputItem = [];
        let {text} = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ? <View style={[styles.iconStyle, this.props.iconStyle]}/> : null}
                    </View>)
            }
            else {
                inputItem.push(
                    <View key={i}
                          style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : null}
                    </View>)
            }
        }
        return inputItem;
    }

    _onPress() {
        if (this.refs.textInput) this.refs.textInput.focus();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: ScreenUtils.isIOS ? 1.0 : 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    inputItem: {
        height: 45,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: ScreenUtils.isIOS ? 1.0 : 0.5,
        borderColor: '#ccc',
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
});
