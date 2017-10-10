import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import ScreenUtils from '../utils/ScreenUtils'
import colors from '../constants/colors'

class ButtonNormal extends Component {

    static defaultProps = {
        onPress:() => {}, //不写这个，父控件向子组件传递点击事件（传递不成功）
    }

    constructor(props) {
        super(props)
    }


    render() {
        return (
                <TouchableWithoutFeedback onPress={()=>this.props.onPress()}>
                    <View>
                        <Text style={styles.container}>
                            {this.props.value}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.one_color,
        height: 48,
        width: ScreenUtils.width - 20,
        marginLeft: 10,
        marginRight: 10,
        color: colors.white,
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});

export default ButtonNormal

//使用说明：
// <ButtonNormal  style={styles.button} value='确定' onPress={()=>this.onEnsure()}/>