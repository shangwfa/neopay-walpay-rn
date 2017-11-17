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
import ScreenUtils from "../utils/ScreenUtils";
import BasePage from "./BasePage";
import img_activity from "../res/img/img_activity.png"
import ApiManager from "../utils/ApiManager";
import {RouterPaths} from "../constants/RouterPaths";
import ViewPager from "../components/ViewPager";

class CardPackPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSourceViewPage: [],
            sourceDataFlatList: [],
        };
    }

    componentWillMount() {
        ApiManager.getMerchantBannerList({}, (data) => {
            this.setState({
                dataSourceViewPage: data
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
                    {/*热门活动*/}
                    <View style={styles.title_activity}>
                        <Image
                            source={img_activity}
                            style={styles.img_activity}/>
                        <Text style={styles.title_txt}>热门商户</Text>
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

    _renderPage = (item) => {
        return (
            <TouchableWithoutFeedback
                style={styles.page}
                activeOpacity={0.9}
                onPress={this._handleImageClick.bind(this, item)}>
                <Image
                    style={[styles.page, {resizeMode: "cover"}]}
                    source={{uri: item.imageUrl}}/>
            </TouchableWithoutFeedback>
        );
    };
    _handleImageClick = (item) => {
        alert("活动H5:" + item.linkUrl);
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
        let params = {
            merchantNo: item.merchantNo,
            merchantName: item.merchantName,
        };
        this.props.navigation.navigate(RouterPaths.MERCHANT_ACTIVITY_LIST, params);
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

export default CardPackPage //已废弃