import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ListView,
    DeviceEventEmitter
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import {RouterPaths} from '../constants/RouterPaths'
import SectionHeader from '../components/SectionHeader'
import BankCardCell from '../components/BankCardCell'
import CommonButton from '../components/CommonButton'
import ApiManager from '../utils/ApiManager'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import BankCardDetailPage from "./BankCardDetailPage";

class BankCardListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            footerStatus: RefreshStatus.IDLE,
            isReq:false
        };
        console.log(props)
    }

    componentWillMount() {
        this._handleRefresh();
    }

    _handleRefresh = () => {
        ApiManager.geUserBankCardList({}, (data) => {
            this.setState({
                dataSource: data,
                isReq:true
            });
        });
    };

    _renderItem = ({item}) => {
        return <BankCardCell imgIconUrl={item.iconUrl}
                             bankNameValue={item.bankName}
                             bankTypeValue={item.cardTypeText}
                             cardNoValue={item.cardNo}
                             onPress = {()=>this.pushNext(item)}
                             imgBackGroundUrl = {item.backgroundUrl}/>
    }

    renderEmptyView = () =>{
        return (<View style = {styles.empty_container}>
            <View style = {{alignItems:'center'}}>
                <Image style = {styles.top_img} source = {require("../res/img/emptyBankCard_img.png")}></Image>
                <Text style = {styles.middle_text}>添加绑定银行卡进行实名认证</Text>
                <Text style = {styles.middle_text_bottom}>享受安全便捷的服务</Text>
            </View>
            <CommonButton value='添加绑定银行卡' style={{marginTop:50 }} onPress={()=>this.pushAddBankCard()}/>
        </View>);

    }

    renderHead=()=>{
        if(this.state.dataSource.length>0)
        {
            return <Header navigation={this.props.navigation} title='银行卡列表' rightIconStyle = {{width:25, height:25}} rightIcon={require("../res/img/add_icon.png")} onRightPress = {()=>this.addBankCard()}/>
        }else {
            return <Header navigation={this.props.navigation} title='银行卡列表' />
        }
    }

    renderMainView=()=>{
        if(!this.state.isReq && this.state.dataSource.length==0)
        {
            return (
                <View style={styles.container}>
                    {this.renderHead()}
                </View>
            );
        }else if(this.state.isReq && this.state.dataSource.length==0)
        {
            return (
                <View style={styles.container}>
                    {this.renderHead()}
                    {this.renderEmptyView()}
                </View>
            );
        }else {
            return (
                <View style={styles.container}>
                    {this.renderHead()}
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                    />

                </View>
            );
        }
    }

    emitEvent = (event) => {
        this._handleRefresh();
    }

    render() {
        return (
            this.renderMainView()
        );
    }

    pushAddBankCard = () =>{
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:1})
    }

    pushNext(item){
        this.props.navigation.navigate(RouterPaths.BANKCARD_DETAIL,item)
    }

    addBankCard() {
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:1})
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
    top_img:{
        marginTop:30,
        width:130,
        height:130,
        borderRadius:65,
    },
    empty_container:{
        flex:1,
        backgroundColor:colors.white
    },
    middle_text:{
        marginTop:30,
    },
    middle_text_bottom:{
        marginTop:15,
    }

});

export default BankCardListPage