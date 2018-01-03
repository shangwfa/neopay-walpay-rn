/**
 * @author: carlos.guo
 * @data:  2017/11/23.
 * @description: 大红包--修改页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, ScrollView, TouchableOpacity,
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
import colors from "../constants/colors";
import {RouterPaths} from "../constants/RouterPaths";
import img_big_red_packet_container from "../res/img/img_big_red_packet_container.png"
import img_red_packet_num from "../res/img/img_red_packet_num.png"
import ScreenUtils from "../utils/ScreenUtils";
import Space from "../components/Space";
import ApiManager from "../utils/ApiManager";
class BigRedPacketSimplePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            redPacketNum: 0,
        }
    }

    componentDidMount() {
        this._handleRefresh();
    }

    _handleRefresh() {
        ApiManager.getUserNotReceivedCount({}, (data) => {
            this.setState({redPacketNum: data.count})
        })
    }

    emitEvent = (event) => {
        switch (event.type) {
            case "bigRedPacketRefresh":
                this._handleRefresh();
                break;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/*标题*/}
                <Header
                    navigation={this.props.navigation}
                    backgroundColor="#CF3950"
                    isShowLine={false}
                    isWhiteArrow={true}
                    textColor={colors.white}
                    rightTextColor={colors.white}
                    rightTitle="红包记录"
                    onRightPress={this._handleHeaderRightClick.bind(this)}
                    title='大红包'/>
                <View
                    showsVerticalScrollIndicator={false}>
                    <View style={[styles.children_container, {marginTop: 46,}]}>
                        <Image
                            source={img_big_red_packet_container}
                            style={styles.big_red_packet_img}
                        />
                    </View>
                    <View style={[styles.children_container, {marginTop: 33,}]}>
                        <TouchableOpacity
                            onPress={this._handleSendRedPacketClick.bind(this)}
                            style={styles.send_red_packet}>
                            <Text style={{fontSize: 15, color: "#C3304A"}}>我要发红包</Text>
                        </TouchableOpacity>
                        <View style={styles.redPacket_container}>
                            <TouchableOpacity
                                onPress={this._handleGetRedPacketClick.bind(this)}
                                style={[styles.send_red_packet,]}>
                                <Text style={{fontSize: 15, color: "#C3304A"}}>我要领红包</Text>
                            </TouchableOpacity>
                            <Image
                                style={styles.img}
                                source={img_red_packet_num}>
                                <Text
                                    style={styles.text}>{`${this.state.redPacketNum > 99 ? "99+" : this.state.redPacketNum}`}</Text>
                            </Image>
                        </View>
                    </View>
                    <Space/>
                </View>
            </View>
        );
    }

    _handleGetRedPacketClick = () => {
        this.props.navigation.navigate(RouterPaths.RECEIVE_RED_PACKET);
    };
    _handleSendRedPacketClick = () => {
        this.props.navigation.navigate(RouterPaths.SEND_RED_PACKET);
    };
    _handleHeaderRightClick = () => {
        this.props.navigation.navigate(RouterPaths.RED_PACKET_RECORD);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CF3950',
    },
    big_red_packet_img: {
        width: ScreenUtils.width - 120,
        height: (ScreenUtils.width - 120) * 1.4,
        resizeMode: "contain"
    },
    children_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    send_red_packet: {
        width: ScreenUtils.width - 170,
        height: 40,
        borderRadius: 2,
        backgroundColor: "#FAD49D",
        alignItems: "center", justifyContent: "center"
    },
    text: {
        color: "#C02642",
        fontSize: 13
    },
    img: {
        width: 30,
        height: 30,
        marginTop: -60,
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "stretch",
    },
    redPacket_container: {
        marginLeft: 30,
        height: 90,
        flexDirection: "row",
        marginBottom: 67,
        alignItems: "center"
    }
});

export default BigRedPacketSimplePage