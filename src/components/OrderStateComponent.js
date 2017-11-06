import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
/**
 * @author: carlos.guo
 * @data:  2017/11/6.
 * @description: 订单状态 处理中、成功、失败、--页面
 */
class OrderStateComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[styles.order_state_view]}>
                    <View style={styles.order_state_title_container}>
                        <Image
                            style={{width: 20, height: 82}}
                            source={{uri: this.props.imgId}}/>
                        <View style={{height: 82}}>
                            <Text style={[styles.order_state_content, {marginTop: 3}]}>{this.props.stateStart}</Text>
                            <Text style={[styles.order_state_content, {marginTop: 37}]}>{this.props.stateEnd}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    order_state_view: {
        marginTop: 25,
        marginBottom: 7,
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    order_state_title_container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    order_state_content: {
        marginLeft: 13,
        fontSize: 14,
        color: "#333333"
    }
});

export default OrderStateComponent