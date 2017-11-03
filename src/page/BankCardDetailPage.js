import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    FlatList
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

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8889'}


class BankCardDetailPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isShowBottom:false
        };
        console.log(props)
    }

    close=()=>{
        this.setState({
            isShowBottom:false
        })
    }

    unBind=()=>{
        this.setState({
            isShowBottom:false
        })
        //解绑操作
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡列表' rightTitle='筛选' onRightPress={()=>this.rightClick()}/>
                <BankCardCell imgIconUrl={dataSource.imgUrl}
                              bankNameValue={dataSource.name}
                              bankTypeValue={dataSource.type}
                              cardNoValue={dataSource.cardNo}/>
                <CommonButton value='查看该张银行卡交易记录' style={{marginTop:50 }} onPress={()=>this.pushRecordPage()}/>

                <TwoBottomItemModal oneItemTitle='解绑该张银行卡' twoItemTitle='关闭弹窗' isShow={this.state.isShow} close={() => this.close()} ensure={()=>this.unBind()}/>
            </View>
        );
    }

    rightClick = () => {
        this.setState({
            isShowBottom:true
        })
    }

    pushRecordPage = () => {
        this.props.navigation.navigate(RouterPaths.BANKCARD_ORDERLIST)
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