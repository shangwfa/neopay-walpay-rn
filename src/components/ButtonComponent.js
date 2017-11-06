/**
 * @author: carlos.guo
 * @data:  2017/10/31.
 * @description:
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, TouchableWithoutFeedback,
} from 'react-native'
import right_arrow from '../res/img/right_arrow.png';
import Space from "./Space";
class ButtonComponent extends Component {
    static defaultProps = {
        isShowRightArrows: true,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.btnClick}>
                <View style={styles.container_item}>
                    <Text style={[styles.title, {color: "#999999", marginLeft: 13}]}>{this.props.leftTitle}</Text>
                    <Space/>
                    <Text style={[styles.title, {color: "#666666", marginRight: 10}]}>{this.props.rightTitle}</Text>
                    {this._arrowImg(this.props.isShowRightArrows)}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _arrowImg = (isShow) => {
        if (isShow) {
            return <Image style={styles.img} source={right_arrow}/>;
        } else {
            return <View style={{width: 22}}/>;
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container_item: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    img: {
        width: 7,
        height: 12,
        marginRight: 13
    },
    title: {
        fontSize: 14,
    },
});

export default ButtonComponent