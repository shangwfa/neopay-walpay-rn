import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ListView
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
            });
        });
    };

    _onRefresh = () => {
        this._handleRefresh();
    };

    _onLoadMore = (pageSize) => {
        let params = {
            pageSize: pageSize
        };
        ApiManager.geUserBankCardList(params, (data) => {
            if (data) {
                let allData = this.state.dataSource;
                allData.push(...data);
                this.setState({
                    dataSource: allData,
                });
            } else {
                this.setState({
                    footerStatus: RefreshStatus.END
                });
            }
        });
    };

    _renderItem = ({item}) => {
        return <BankCardCell imgIconUrl={item.iconUrl}
                             bankNameValue={item.bankName}
                             bankTypeValue={item.cardType}
                             cardNoValue={item.cardNo}
                             onPress = {()=>this.pushNext(item)}/>
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

    render() {
        if(this.state.dataSource)
        {
            return (
                <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='银行卡列表' rightIconStyle = {{width:20, height:20}} rightIcon={require("../res/img/add_icon.png")} onRightPress = {()=>this.addBankCard()}/>
                    <RefreshList
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        onRefresh={this._onRefresh}
                        onLoadMore={this._onLoadMore}
                        footerStatus={this.state.footerStatus}
                    />

                </View>
            );
        }else
        {
            return (
                <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡列表' rightIconStyle = {{width:20, height:20}} rightIcon={require("../res/img/add_icon.png")} onRightPress = {()=>this.addBankCard()}/>
                {this.renderEmptyView()}
                </View>
            );
        }
    }

    pushAddBankCard = () =>{

    }

    pushNext(item){
        this.props.navigation.navigate(RouterPaths.BANKCARD_DETAIL,item)
    }

    addBankCard() {
        this.props.navigation.navigate(RouterPaths.BIND_BANK_CARD_PAGE)
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