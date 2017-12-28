import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    NativeModules,
    FlatList,
    DeviceEventEmitter
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import BankCardCell from '../components/BankCardCell'
import CommonButton from '../components/CommonButton'
import TwoBottomItemModal from '../modal/TwoBottomItemModal'
import BankCardOrderList from './TradeRecordListPage'
import {RouterPaths} from '../constants/RouterPaths'
import PayPwdModal from '../modal/PayPwdModal'
import ApiManager from '../utils/ApiManager'
import ImageTitleModal from '../modal/ImageTitleModal'
import TwoButtonModal from "../modal/TwoButtonModal";

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8889'}


class BankCardDetailPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            payPassword:'',
            isShowBottom:false,
            isPayShow:false,
            isHUDShow:false,
            param:this.props.navigation.state.params,
            imagePath:'',
            showTitle:'',
            showTwoBtnModal:false
        };
        console.log('xxx'+props)
    }

    close=()=>{
        this.setState({
            isShowBottom:false
        })
    }

    unBind=()=>{
        this.setState({
            showTwoBtnModal:true
        })
    }

    onEnd=(text) =>{
        console.log('223322');
        let params = {
            cardId: this.state.param.id,
            payPassword:text
        };
        ApiManager.postUnBindBankCard(params, (data) => {
            setTimeout(()=>{
                this.setState({
                    isShowBottom:false,
                    isPayShow:false,
                    isHUDShow:true,
                    imagePath:require("../res/img/wd_chengong.png"),
                    showTitle:'绑定成功'
                })
                DeviceEventEmitter.emit(RouterPaths.BANKCARD_LIST,{type:'bankCardDetail'})
                this.props.navigation.goBack();
            },100)
        },(errorData)=>{

            setTimeout(()=>{
                this.setState({
                    isShowBottom:false,
                    isPayShow:false,
                    isHUDShow:true,
                    imagePath:require("../res/img/wd_shibai.png"),
                    showTitle:'绑定失败'
                })
            },100)
        });
    }

    forgetPayPwdBtnClicked =()=>{
        this.setState({
            isPayShow:false
        })
        const params = {page: 'resetPayPwd'};
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    }

    back=()=>{
        DeviceEventEmitter.emit(RouterPaths.BANKCARD_LIST,{type:'bankCardDetail'})
    }

    showTwoBtnModal=()=>{
        this.setState({
            showTwoBtnModal:false
        })
    }

    handleSureClick=()=>{
        this.setState({
            isShowBottom:false,
            isPayShow:true,
            showTwoBtnModal:false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡列表' rightIcon={require("../res/img/moreItemsIcon.png")} onRightPress={()=>this.rightClick()} back={()=>this.back()}/>
                <BankCardCell imgIconUrl={this.state.param.iconUrl}
                              imgBackGroundUrl = {this.state.param.backgroundUrl}
                              bankNameValue={this.state.param.bankName}
                              bankTypeValue={this.state.param.cardTypeText}
                              cardNoValue={this.state.param.cardNo}/>
                <CommonButton value='查看该张银行卡交易记录' style={{marginTop:50 }} onPress={()=>this.pushRecordPage()}/>

                <TwoBottomItemModal oneItemTitle='解绑该张银行卡' twoItemTitle='关闭弹窗' isShow={this.state.isShowBottom} close={() => this.close()} ensure={()=>this.unBind()}/>
                <TwoButtonModal
                    isShow={this.state.showTwoBtnModal}
                    content={`\n解绑后该卡的银行服务将不可用\n`}
                    oneBtnText="关闭弹窗"
                    twoBtnText="确定解绑"
                    onePress={this.handleCloseClick}
                    twoPress={this.handleSureClick}
                />
                <PayPwdModal isShow={this.state.isPayShow} onClose={()=>this.setState({isPayShow:false})}
                             onForgetPwd={()=>{this.forgetPayPwdBtnClicked()}} onEnd={(text)=>this.onEnd(text)} isHiddenBottom={true}/>
                <ImageTitleModal  isShow={this.state.isHUDShow} title = {this.state.showTitle} imagePath = {this.state.imagePath}/>
            </View>
        );
    }

    rightClick = () => {
        this.setState({
            isShowBottom:true
        })
    }

    pushRecordPage = () => {
        console.log('xxxxxx'+this.state.param.id)
        this.props.navigation.navigate(RouterPaths.TRADE_RECORD_LIST_PAGE,{pageType:1,cardId:this.state.param.id})
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
});

export default BankCardDetailPage