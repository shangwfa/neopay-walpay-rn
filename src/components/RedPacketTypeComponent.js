import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import ScreenUtils from "../utils/ScreenUtils";
/**
 * @author: carlos.guo
 * @data:  2017/11/3.
 * @description: 红包所有类型--组件
 */
class RedPacketTypeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={{uri: this.props.redPacketData.themeUrl}}>
                    {this._renderTypeView(this.props.redPacketData)}
                </Image>
            </View>
        );
    }

    //渲染那种类型的红包
    _renderTypeView = (redPacketData) => {
        switch (redPacketData.receiveStatus) {
            case 1://未领取
                return this._renderRobRedPacketView(redPacketData);
                break;
            case 2://已过期、已经领取
                return this._renderOverdueRedPacketView(redPacketData);
                break;
            case 3://普通
                return this._renderGeneralRedPacketView(redPacketData);
                break;

        }
    };

    /*待抢红包--类型*/
    _renderRobRedPacketView = (redPacketData) => {
        let isTheme = true;
        return <View style={{marginLeft: 97}}>
            <Text
                style={[isTheme ? styles.message : styles.message_general, {fontSize: 17}]}>{redPacketData.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 23, paddingLeft: 5}]}>
                <View style={[styles.line]}/>
                <Text
                    style={[isTheme ? styles.message : styles.message_general, {fontSize: 14,}]}>来自{redPacketData.bossName}的红包</Text>
            </View>

        </View>;
    };
    /*红包过期/已领完--类型*/
    _renderOverdueRedPacketView = (redPacketData) => {
        return <View style={{marginLeft: 76}}>
            <Text style={[styles.message, {fontSize: 14}]}>{redPacketData.message}</Text>
            <Text style={[styles.message, {fontSize: 17, paddingLeft: 22, marginTop: 48}]}>啊哦，这个红包过期了~</Text>
            <View style={[styles.message_from_container, {paddingLeft: 22, marginTop: 17}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{redPacketData.bossName}的红包</Text>
            </View>
        </View>;
    };
    /*普通红包--类型*/
    _renderGeneralRedPacketView = (redPacketData) => {
        return <View style={{marginLeft: 97}}>
            <Text style={[styles.message_general, {fontSize: 27, paddingLeft: 33}]}>$898.78</Text>
            <Text style={[styles.message, {fontSize: 17, marginTop: 18}]}>{redPacketData.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 16}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{redPacketData.bossName}的红包</Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: ScreenUtils.width - 26,
        height: 155,
        resizeMode: "cover",
        justifyContent: 'center',
    },
    message: {
        color: "#FBDEB0",
        backgroundColor: "transparent"
    },
    message_general: {
        color: "#FFFFFF",
        backgroundColor: "transparent"
    },
    message_from_container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 0,
    },
    line: {
        width: 31,
        height: 1,
        backgroundColor: "#FBDEB0"
    }
});

export default RedPacketTypeComponent