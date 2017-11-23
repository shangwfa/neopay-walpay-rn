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
import ImageButton from '../components/ImageTitleButton'
import ApiManager from '../utils/ApiManager'
import ScreenUtils from '../utils/ScreenUtils'
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

    _pushSendRpPage=()=>{
        this.props.navigation.navigate(RouterPaths.SEND_RED_PACKET);
    }

    _renderRow = ({item}) => {
        console.log('----xxx' + item)
        return (
            <View>
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.robberName} middleBottomValue={item.createTime}
                               rightUpValue={item.luckyMoney}
                               isLine={true}
                               imgIconUrl={item.luckyFlag==1?require("../res/img/rp_max_num.png"):' '} />
            </View>
        )

    }

    _renderMainView = () =>{
        return(
            <View style = {{height:ScreenUtils.height - 50}}>
                <Header
                    navigation={this.props.navigation}
                    backgroundColor="#D83E3E"
                    isShowLine={false}
                    isWhiteArrow={true}
                    textColor={colors.white}
                    rightTextColor={colors.white}
                    title='红包详情'/>
                <RpDetailHeader imgIconUrl={this.state.dataDetail.bossAvatarUrl}
                                amountValue={this.state.dataDetail.luckyMoney}
                                fromValue={this.state.dataDetail.bossName}
                                remarkValue={this.state.dataDetail.message}
                                stateValue={this.state.dataDetail.redPacketReceiveStatusText}
                                isMax = {this.state.dataDetail.bestLuckyBool}/>
                <View style = {styles.mid_view}>
                    <Text style = {styles.num_text}>{this.state.dataDetail.robberCount + '/' + this.state.dataDetail.totalCount}</Text>
                    <Text style = {styles.amount_text}>{'总额¥' + this.state.dataDetail.amount}</Text>
                </View>
                <FlatList
                    style={{marginTop: 0,}}
                    ref='flatList'
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    refreshing={false}
                />
            </View>
        )
    }

    _renderBottom=()=>{
        if(!this.state.dataSource.ownerBool){
            return (
                <View style = {styles.bg_bottom}>
                    <ImageButton value='我也要发红包' style={{marginBottom:0,flex:1}} textColor = {colors.one_color} icon = {require("../res/img/rp_giveRp.png")} onPress={()=>this._pushSendRpPage()}/>
                </View>
            )
        }else{
            return (
                <View style = {styles.bg_bottom}>
                    <ImageButton value='分享该红包' style={{marginBottom:0 , flex:1}} textColor = {colors.one_color} icon = {require("../res/img/rp_share.png")} onPress={()=>this._pushSendRpPage()}/>
                    <View style={{width:1,backgroundColor:colors.divider }}/>
                    <ImageButton value='我也要发红包' style={{marginBottom:0 , flex:1}} textColor = {colors.one_color} icon = {require("../res/img/rp_giveRp.png")} onPress={()=>this.pushRecordPage()}/>
                </View>
            )
        }

    }


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
        marginTop:0,
        flexDirection:'row'

    }
});

export default RpDetailPage