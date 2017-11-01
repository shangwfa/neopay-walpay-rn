/**
 * @author: carlos.guo
 * @data:  2017/10/31.
 * @description: 支持通宝汇--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import img_tbh_icon from '../res/img/scan_bottom_icon.png'

class SupportTongBaoComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={img_tbh_icon}/>
                <Text style={styles.text}>支持扫描通宝汇APP付款码付钱</Text>
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F6F5FA",
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 21,
        height: 21,
        resizeMode: "cover"
    },
    text: {
        color: '#E07275',
        fontSize: 14,
        marginLeft: 5
    }
});
export default SupportTongBaoComponent