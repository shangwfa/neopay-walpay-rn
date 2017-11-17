import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
    FlatList
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import RpDetailHeader from '../components/RpDetailHeader'
import CommonButton from '../components/CommonButton'
import ApiManager from '../utils/ApiManager'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class RpDetailPage extends BasePage {


    constructor(props) {
        super(props);
        this.state = {
            dataDetail:{},
            dataSource:[],
            param:this.props.navigation.state.params
        }
    }

    componentWillMount() {
        this._postRpDetail();
        this._postRpReceiverList();
    }

    _postRpDetail = () =>{
        let body = {
            packetCode: this.state.param.packetCode
        };
        ApiManager.getRpDetail(body, (data) => {
            this.setState({
                dataDetail: data,
            });
        });
    }

    _postRpReceiverList = () => {
        let body = {
            packetCode: this.state.param.packetCode
        };
        ApiManager.getRpReceiverList(body, (data) => {
            this.setState({
                dataSource: data,
            });
        });
    };

    renderRow = ({item}) => {
        console.log('----xxx' + item)
        return (
            <View>
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title} middleBottomValue={item.tradeTime}
                               rightUpValue={item.amount} rightBottomValue={item.status}
                               isLine={true}/>
            </View>
        )

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    backgroundColor="#D83E3E"
                    isShowLine={false}
                    isWhiteArrow={true}
                    textColor={colors.white}
                    rightTextColor={colors.white}
                    title='红包详情'/>
                <RpDetailHeader imgIconUrl={this.state.dataDetail.imgUrl}
                                amountValue={this.state.dataDetail.amount}
                                fromValue={this.state.dataDetail.bossName}
                                remarkValue={this.state.dataDetail.message}
                                stateValue={this.state.dataDetail.state}/>
                <FlatList
                    style={{marginTop: 5,}}
                    ref='flatList'
                    data={this.state.dataSource}
                    renderItem={this.renderRow}
                    refreshing={false}
                />
                <CommonButton value='确定' style={{marginBottom:15 }} onPress={()=>this.pushRecordPage()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RpDetailPage