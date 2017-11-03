/**
 * @author: carlos.guo
 * @data:  2017/11/1.
 * @description: 头像--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import img_default_photo from "../res/img/img_default_photo.png"
import StringUtils from "../utils/StringUtils";
class AvatarComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.avatar) {
            return (
                <Image
                    style={styles.img}
                    source={{uri: this.props.avatar}}/>
            );
        } else {
            return (
                <Image
                    style={styles.img}
                    source={img_default_photo}/>
            );
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
    img: {
        width: 86,
        height: 86,
        borderRadius: 43,
    }
});

export default AvatarComponent