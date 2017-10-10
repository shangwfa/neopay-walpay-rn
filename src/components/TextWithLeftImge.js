import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import colors from '../constants/colors'


class TextWithLeftImge extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.left_icon} source={this.props.left_icon}/>
                <Text style={styles.text}>{this.props.value}</Text>
            </View>)
    }

}

const styles = StyleSheet.create({
    text: {
        marginLeft: 2,
        color: colors.black_light,
        fontSize:12
    },
    left_icon: {
        width: 8,
        height: 8,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:10,
        marginTop:10
    },
});

export default TextWithLeftImge