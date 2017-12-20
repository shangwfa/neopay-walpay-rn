import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import ScreenUtils from "../utils/ScreenUtils";
import FormatUtils from "../utils/FormatUtils";
/**
 * @author: carlos.guo
 * @data:  2017/11/3.
 * @description: 红包所有类型--组件
 */
class RedPacketTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redThemeTxtColor: "#000",
            lineBgColor: "#000"
        };
    }

    componentWillMount() {
        this._handleRedThemeTypeStyle(this.props.redPacketData);
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
            case 2://已领取
                return this._renderGeneralRedPacketView(redPacketData);
                break;
            case 3://已过期，已领完
            case 4://已过期，已领完
                return this._renderOverdueRedPacketView(redPacketData);
                break;
        }
    };

    /*未领取--类型*/
    _renderRobRedPacketView = (redPacketData) => {
        return <View style={{marginLeft: 97}}>
            <Text
                style={[{color: this.state.redThemeTxtColor}, styles.rob_red_packet_txt]}>{redPacketData.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 23, paddingLeft: 5}]}>
                <View style={[styles.line, {backgroundColor: this.state.lineBgColor}]}/>
                <Text
                    style={[{color: this.state.redThemeTxtColor}, styles.rob_red_packet_from_txt]}>来自{redPacketData.bossName}的红包</Text>
            </View>
        </View>;
    };
    /*红包过期/已领完--类型*/
    _renderOverdueRedPacketView = (redPacketData) => {
        let txtContent = redPacketData.receiveStatus === 3 ? "过期" : "抢完";
        return <View style={{marginLeft: 76}}>
            <Text
                style={[{color: this.state.redThemeTxtColor}, styles.overdue_red_packet_txt]}>{redPacketData.message}</Text>
            <Text style={[{color: this.state.redThemeTxtColor}, styles.overdue_red_packet_msg_txt]}>啊哦，这个红包{txtContent}了~</Text>
            <View style={[styles.message_from_container, {paddingLeft: 22, marginTop: 17}]}>
                <View style={[styles.line, {backgroundColor: this.state.lineBgColor}]}/>
                <Text
                    style={[{color: this.state.redThemeTxtColor}, styles.overdue_red_packet_from_txt]}>来自{redPacketData.bossName}的红包</Text>
            </View>
        </View>;
    };
    /*普通红包--类型*/
    _renderGeneralRedPacketView = (redPacketData) => {
        return <View style={{marginLeft: 97}}>
            <Text
                style={[{color: this.state.redThemeTxtColor}, styles.general_red_packet_txt]}>￥{FormatUtils.money(redPacketData.luckyAmount)}</Text>
            <Text
                style={[{color: this.state.redThemeTxtColor}, styles.general_red_packet_msg_txt]}>{redPacketData.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 16}]}>
                <View style={[styles.line, {backgroundColor: this.state.lineBgColor}]}/>
                <Text
                    style={[{color: this.state.redThemeTxtColor,}, styles.general_red_packet_from_txt]}>来自{redPacketData.bossName}的红包</Text>
            </View>
        </View>;
    };
    _handleRedThemeTypeStyle = (redPacketData) => {
        let colorTxt = "#000";
        switch (redPacketData.themeType) {
            case 2://生日主题
                colorTxt = "#FFFFFF";
                break;
            case 3://春节主题
                colorTxt = "#FBDEB0";
                break;
        }
        this.setState({
            redThemeTxtColor: colorTxt,
            lineBgColor: colorTxt
        });
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
    message_from_container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 0,
    },
    line: {
        width: 31,
        height: 1,
        opacity: 0.65,

    },
    rob_red_packet_txt: {
        fontSize: 17,
        backgroundColor: "transparent"
    },
    rob_red_packet_from_txt: {
        fontSize: 14,
        opacity: 0.65,
        backgroundColor: "transparent"
    },
    overdue_red_packet_txt: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
    overdue_red_packet_from_txt: {
        fontSize: 14,
        opacity: 0.65,
        backgroundColor: "transparent"
    },
    overdue_red_packet_msg_txt: {
        fontSize: 17,
        paddingLeft: 22,
        marginTop: 48,
        backgroundColor: "transparent"
    },
    general_red_packet_txt: {
        fontSize: 27,
        paddingLeft: 33,
        backgroundColor: "transparent"
    },
    general_red_packet_from_txt: {
        fontSize: 14,
        opacity: 0.65,
        backgroundColor: "transparent"
    },
    general_red_packet_msg_txt: {
        fontSize: 17,
        marginTop: 18,
        backgroundColor: "transparent"
    },
});

export default RedPacketTypeComponent