import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
    FlatList,
    DeviceEventEmitter,
    NativeModules,
    ScrollView
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import RpDetailHeader from '../components/RpDetailHeader'
import CommonButton from '../components/CommonButton'
import ImageButton from '../components/ImageTitleButton'
import ButtonNormal from '../components/ButtonNormal'
import ApiManager from '../utils/ApiManager'
import ScreenUtils from '../utils/ScreenUtils'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import DateUtils from "../utils/DateUtils";
import FormatUtils from "../utils/FormatUtils";
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class RpDetailPage extends BasePage {


    constructor(props) {
        super(props);
        this.state = {
            dataDetail:{},
            dataSource:[],
            param:this.props.navigation.state.params.data?this.props.navigation.state.params.data:this.props.navigation.state.params
        }
    }

    componentDidMount() {
        this._postRpDetail();
        this._postRpReceiverList();
    }

    emitEvent = (event) => {
        switch (event.type) {
            case "RedPacketDetail"://选择红包主题
                this.setState({
                    dataDetail:event.data
                });
                console.log('^^^^'+ this.state.dataDetail.packetCode)
                // console.log('^^^^'+ event.data.areaName)
                break;
        }

    };

    _postRpDetail = () =>{
        let body = {
            packetCode: this.state.param?this.state.param.packetCode:this.state.dataDetail.packetCode
        };
        ApiManager.getRpDetail(body, (data) => {
            this.setState({
                dataDetail: data,
            });
        });
    }

    _postRpReceiverList = () => {
        let body = {
            packetCode: this.state.param?this.state.param.packetCode:this.state.dataDetail.packetCode
        };
        ApiManager.getRpReceiverList(body, (data) => {
            this.setState({
                dataSource: data,
            });
        });
    };

    _pushSendRpPage=()=>{
        this.props.navigation.navigate(RouterPaths.SEND_RED_PACKET);
    }

    _renderRow = ({item}) => {
        console.log('----xxx' + item)
        return (
            <View>
                <CommonItemTwo imgUrl={item.robberAvatar}
                               middleUpValue={item.robberName} middleBottomValue={DateUtils.mmDdHhMmDateFmt(item.createTimeMs)}
                               rightUpValue={moneyWithTag.money(item.luckyAmount)}
                               isLine={true}
                               imgIconUrl={item.luckyFlag==3?require("../res/img/rp_max_num.png"):' '} />
            </View>
        )

    }

    _renderMainView = () =>{
        return(
            <ScrollView style = {{height:ScreenUtils.height - 50}}>
                <Header
                    navigation={this.props.navigation}
                    backgroundColor="#D83E3E"
                    isShowLine={false}
                    isWhiteArrow={true}
                    textColor={colors.white}
                    rightTextColor={colors.white}
                    title='红包详情'/>
                <RpDetailHeader imgIconUrl={this.state.dataDetail.bossAvatarUrl}
                                amountValue={FormatUtils.money(this.state.dataDetail.luckyMoney)}
                                fromValue={this.state.dataDetail.bossName}
                                remarkValue={this.state.dataDetail.message}
                                stateValue={this.state.dataDetail.redPacketReceiveStatusText}
                                isMax = {this.state.dataDetail.bestLuckyBool}/>
                <View style = {styles.mid_view}>
                    <Text style = {styles.num_text}>{'已领取' + this.state.dataDetail.robberCount + '/' + this.state.dataDetail.totalCount +'个'}</Text>
                    <Text style = {styles.amount_text}>{'总额¥' + FormatUtils.money(this.state.dataDetail.amount)}</Text>
                </View>
                <FlatList
                    style={{marginTop: 0,}}
                    ref='flatList'
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    refreshing={false}
                />
            </ScrollView>
        )
    }

    _renderBottom=()=>{
        if(this.state.dataDetail.ownerBool == false){
            return (
                <Image style = {styles.bg_bottom} source = {require("../res/img/rp_shadow.png")}>
                    <ImageButton value='我也要发红包' style={{marginTop:0.5,marginBottom:0.5,flex:1,backgroundColor:'#f9f9f9'}} textColor = {colors.one_color} icon = '' onPress={()=>this._pushSendRpPage()}/>
                </Image>
            )
        }else{
            return (
                <View style = {styles.bg_bottom}>
                    <ImageButton value='我也要发红包' style={{marginTop:0.5,marginBottom:0.5,flex:1,backgroundColor:'#f9f9f9'}} textColor = {colors.one_color} icon = '' onPress={()=>this._pushSendRpPage()}/>
                    <ImageButton value='分享该红包' style={{marginTop:0,marginBottom:0,flex:1,backgroundColor:colors.one_color}} textColor = {colors.white} icon = '' onPress={()=>this.handleShare()}/>
                </View>
            )
        }

    }

    handleShare = () => {
        let packetCode = this.props.navigation.state.params.packetCode;
        let shareType = "1";
        NativeModules.commModule.rnCallNativeCallShare(packetCode, shareType);
    };


    render() {
        return (
            <View style={styles.container}>
                {this._renderMainView()}
                {this._renderBottom()}
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
    },
    mid_view: {
        backgroundColor: colors.page_background,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    num_text: {
        fontSize:15,
        marginLeft:15,
        color:colors.balck_more_light,
    },
    amount_text: {
        fontSize:15,
        marginRight:15,
        color:colors.balck_more_light
    },
    bg_bottom:{
        width:ScreenUtils.width,
        marginTop:0,
        flexDirection:'row',
        backgroundColor:colors.divider
    }
});

export default RpDetailPage