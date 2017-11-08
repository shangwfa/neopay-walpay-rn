/**
 * @author: carlos.guo
 * @data:  2017/10/30.
 * @description: 卡包--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, FlatList, TouchableOpacity, ScrollView, TouchableWithoutFeedback,
} from 'react-native'
import Header from "../components/Header";
import ViewPager from "react-native-viewpager";
import ScreenUtils from "../utils/ScreenUtils";
import BasePage from "./BasePage";
import img_activity from "../res/img/img_activity.png"
import ApiManager from "../utils/ApiManager";
import {RouterPaths} from "../constants/RouterPaths";

class CardPackPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSourceViewPage: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            }),
            sourceDataFlatList: []
        };
    }

    componentWillMount() {
        ApiManager.getMerchantBannerList({}, (data) => {
            this.setState({
                dataSourceViewPage: this.state.dataSourceViewPage.cloneWithPages(data)
            });
        });
        ApiManager.getUserMerchantList({}, (data) => {
            this.setState({
                sourceDataFlatList: data
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='卡包'/>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {/*轮播*/}
                    <View style={[styles.page]}>
                        <ViewPager
                            dataSource={this.state.dataSourceViewPage}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}/>
                    </View>
                    {/*热门活动*/}
                    <View style={styles.title_activity}>
                        <Image
                            source={img_activity}
                            style={styles.img_activity}/>
                        <Text style={styles.title_txt}>热门活动</Text>
                    </View>
                    <View style={{marginLeft: 13, marginRight: 4}}>
                        <FlatList
                            style={{marginTop: 16,}}
                            ref='flatList'
                            horizontal={false}
                            numColumns={3}
                            ItemSeparatorComponent={this._renderItemLine}
                            renderItem={this._renderFlatListItem}
                            keyExtractor={this._keyExtractor}
                            data={this.state.sourceDataFlatList}
                            refreshing={false}
                        />
                    </View>
                </ScrollView >
            </View>
        );
    }

    _renderPage = (data, pageID) => {
        if (!data) {
            return null;
        }
        return (
            <TouchableWithoutFeedback
                style={styles.page}
                activeOpacity={0.9}
                onPress={this._handleImageClick.bind(this, pageID)}>
                <Image
                    style={[styles.page, {resizeMode: "cover"}]}
                    source={{uri: data.imageUrl}}/>
            </TouchableWithoutFeedback>
        );
    };
    _handleImageClick = (pageID) => {
        alert("pageID= " + pageID);
    };
    _renderViewPageIndicator = () => {

    };
    _renderFlatListItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback
                activeOpacity={0.9}
                onPress={this._handleFlatListItemClick.bind(this, item, index)}>
                <View style={{flexDirection: "column", height: 95, marginBottom: 1}}>
                    <Image
                        style={[styles.img_item, {marginRight: 9}]}
                        source={{uri: item.merchantImageUrl}}/>
                    <Text style={styles.img_txt}>{item.merchantName}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    _handleFlatListItemClick = (item, index) => {
        console.log("index= " + index);
        //活动跳转详情
        switch (index) {
            case 0://余额交易记录、银行卡交易记录
                this.props.navigation.navigate(RouterPaths.TRADE_RECORD_LIST_PAGE, {"pageType": 1});
                break;
            case 1://话费、流量充值记录
                this.props.navigation.navigate(RouterPaths.CHARGE_FLUX_RESULT, {"pageTitle": "手机充值"});
                break;
            case 2://大红包
                this.props.navigation.navigate(RouterPaths.BIG_RED_PACKET);
                break;
            case 3://收红包
                this.props.navigation.navigate(RouterPaths.RECEIVE_RED_PACKET);
                break;
            case 4://发红包
                this.props.navigation.navigate(RouterPaths.SEND_RED_PACKET);
                break;
        }

    };
    _keyExtractor = (item, index) => {
        return index;
    };
    _renderItemLine = () => {
        return (
            <View style={[{height: 25}]}/>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    page: {
        width: ScreenUtils.width,
        height: 167,
    },
    img_activity: {
        width: 18,
        height: 18,
        resizeMode: "cover"
    },
    title_activity: {
        flexDirection: "row",
        marginTop: 16,
        marginLeft: 13
    },
    title_txt: {
        fontSize: 15,
        color: "#333333",
        marginLeft: 10
    },
    img_item: {
        width: (ScreenUtils.width - 44) / 3,
        height: 73,
        resizeMode: "cover"
    },
    img_txt: {
        fontSize: 12,
        marginTop: 9,
        color: "#000",
    }

});

export default CardPackPage