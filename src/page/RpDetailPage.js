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
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataDetail= {remark: '欠你的钱还上了蛤', imgUrl:url, backGroundImg:url, amount: '88.88', fromTo: '来自毛主席的大红包',state:'来晚了，红包被林彪领完了'}
const dataSource = [
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-20 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: true
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-20 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-20 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-20 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-20 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: true
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: true
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
    {
        iconUrl: url,
        title: '胡萝卜的兔子店',
        tradeTime: '2017-10-10 15:31:16',
        amount: '-38.00',
        status: '付款处理中',
        isShowTime: false
    },
]

class RpDetailPage extends BasePage {


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // componentWillMount() {
    //     NetUtil.post('pay/query_user_order_page', {}, (data) => {
    //         this.setState({
    //             data: data
    //         })
    //     })
    // }

    renderRow = (item) => {
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
                <Header navigation={this.props.navigation} title='红包详情'/>
                <RpDetailHeader imgBackGroundUrl={dataDetail.backGroundImg}
                                imgIconUrl={dataDetail.imgUrl}
                                amountValue={dataDetail.amount}
                                fromValue={dataDetail.fromTo}
                                remarkValue={dataDetail.remark}
                                stateValue={dataDetail.state}/>
                <FlatList
                    style={{marginTop: 5,}}
                    ref='flatList'
                    data={dataSource}
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