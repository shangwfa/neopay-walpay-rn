import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native'
/**
 * @author: carlos.guo
 * @data:  2017/11/7.
 * @description: 大红包--页面
 */
import img_red_packet_bg from "../res/img/img_red_packet_bg.png";
import img_send_red_packet from "../res/img/img_send_red_packet.png";
import img_get_red_packet from "../res/img/img_get_red_packet.png";
import img_red_packet_square from "../res/img/img_red_packet_square.png";
import img_red_packet_right_arrow from "../res/img/img_red_packet_right_arrow.png";
import img_money from "../res/img/img_money.png";
import Header from "../components/Header";
import colors from "../constants/colors";
import BasePage from "./BasePage";
import ScreenUtils from "../utils/ScreenUtils";
import Space from "../components/Space";
import ApiManager from "../utils/ApiManager";
import RedPacketTypeComponent from "../components/RedPacketTypeComponent";
import {RouterPaths} from "../constants/RouterPaths";
import ViewPager from "../components/ViewPager";
class BigRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceViewPage: []
        };
    }

    componentDidMount() {
        ApiManager.getSquareRedPacketList({}, (data) => {
            this.setState({
                dataSourceViewPage: data.slice(0, 5)
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题*/}
                <Header
                    navigation={this.props.navigation}
                    backgroundColor="#D83E3E"
                    isShowLine={false}
                    isWhiteArrow={true}
                    textColor={colors.white}
                    rightTextColor={colors.white}
                    rightTitle="红包记录"
                    onRightPress={this._handleHeaderRightClick.bind(this)}
                    title='大红包'/>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {/*上部分视图*/}
                    {this._renderTopView()}
                    {/*中部视图*/}
                    {this._renderMiddleView()}
                    {/*下部分视图*/}
                    {this._renderBottomView()}
                </ScrollView>
            </View>
        );
    }

    _renderPage = (item) => {
        return (
            <TouchableOpacity
                style={[styles.page]}
                activeOpacity={0.7}
                onPress={this._handleViewPageItemClick.bind(this, item)}>
                <RedPacketTypeComponent
                    redPacketData={item}/>
            </TouchableOpacity>
        );
    };
    _renderTopView = () => {
        return <View>
            <Image
                style={styles.img_bg}
                source={img_red_packet_bg}/>
            <View style={{alignItems: "center", marginTop: -29}}>
                <Image style={styles.img_money}
                       source={img_money}/>
            </View>
        </View>
    };
    _renderMiddleView = () => {
        return (<View>
            {/*发红包*/}
            <TouchableOpacity
                activeOpacity={0.7} style={{alignItems: "center", marginTop: 68}}
                onPress={this._handleSendRedPacketClick.bind(this)}>
                <Image
                    style={styles.img_send}
                    source={img_send_red_packet}
                />
            </TouchableOpacity>
            {/*领红包*/}
            <TouchableOpacity
                activeOpacity={0.7} style={{alignItems: "center", marginTop: 19, marginLeft: -20}}
                onPress={this._handleGetRedPacketClick.bind(this)}>
                <Image
                    style={styles.img_send}
                    source={img_get_red_packet}
                />
            </TouchableOpacity>
        </View>);
    };
    _renderBottomView = () => {
        return (
            <View>
                <View style={{flexDirection: 'row', marginTop: 36}}>
                    <Space/>
                    <Image style={styles.img_square}
                           source={img_red_packet_square}/>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._handleAllRedPacketClick.bind(this)}
                        style={styles.all_red_packet_to}>
                        <Text style={styles.all_red_packet_txt}>所有红包</Text>
                        <Image style={styles.img_right_arrow}
                               source={img_red_packet_right_arrow}/>
                    </TouchableOpacity>
                </View>
                {/*轮播*/}
                <View style={[styles.page, styles.container_view_pager]}>
                    <ViewPager
                        style={[styles.page]}
                        dotStyle={{height: 6, width: 6}}
                        activeDotStyle={{height: 6, width: 12, borderRadius: 6}}
                        dotColor='#FFF'
                        activeDotColor='#F00'
                        arrayData={this.state.dataSourceViewPage}
                        renderItem={this._renderPage}
                        autoplay={true}
                    />
                </View>
            </View>
        );
    };
    _handleViewPageItemClick = (item) => {
        this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, item);
    };
    _handleAllRedPacketClick = () => {
        this.props.navigation.navigate(RouterPaths.RED_PACKET_SQUARE);
    };
    _handleSendRedPacketClick = () => {
        this.props.navigation.navigate(RouterPaths.SEND_RED_PACKET);
    };
    _handleGetRedPacketClick = () => {
        this.props.navigation.navigate(RouterPaths.RECEIVE_RED_PACKET);
    };
    _handleHeaderRightClick = () => {
        this.props.navigation.navigate(RouterPaths.RED_PACKET_RECORD);
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEAD0',
    },
    page: {
        width: ScreenUtils.width,
        height: 154,
    },
    img_money: {
        width: 55,
        height: 58,
        resizeMode: "cover"
    },
    img_bg: {
        width: ScreenUtils.width,
        height: 115,
        resizeMode: "cover"
    },
    img_send: {
        width: 262,
        height: 72,
        resizeMode: "cover"
    },
    img_square: {
        width: 107,
        height: 46,
        resizeMode: "cover"
    },
    all_red_packet_to: {
        flexDirection: 'row',
        alignItems: "flex-end",
        marginBottom: 10,
        marginLeft: 53
    },
    all_red_packet_txt: {
        fontSize: 12,
        color: "#D83E3E",
        marginRight: 13
    },
    img_right_arrow: {
        width: 6,
        height: 11,
        marginBottom: 2,
        resizeMode: "cover",
        marginRight: 14
    },
    container_view_pager: {
        marginTop: 11,
        marginBottom: 13,
        marginLeft: 13,
        marginRight: 13
    }
});

export default BigRedPacketPage