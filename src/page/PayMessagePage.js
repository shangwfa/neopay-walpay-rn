import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import PayMessageCell from '../components/PayMessageContentCell'
import NetUtil from '../utils/NetUtil'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'

class PayMessagePage extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.dataSource.cloneWithRows([
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-38.00,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":0,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":1,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-45.00,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":1,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":1,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-2.00,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":1,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":1,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-38.00,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":0,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":0,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-38,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":1,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":0,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-38,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":0,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":0,
                },
                {
                    "billId":15,
                    "createTime":"2017-10-08 20:49:42",
                    "amount":-38,
                    "payNoticeType":1,
                    "payBy":'中信银行储蓄卡(9919)',
                    "payTo":'兔波波178果舍近江时代大厦店',
                    "withAttach":0,
                    "attach":'欠你的钱,还给你啦',
                    "isShowTime":0,
                }
            ])
        }
    }
    componentWillMount() {
        NetUtil.post('pay/query_user_order_page', {}, (data) => {
            this.setState({
                data: data
            })
        })
    }


    onLoadMore = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.refs.listView.resetStatus() //重置上拉加载的状态
            end(this._page > 2)//刷新成功后需要调用end结束刷新
        }, 1500)
    }

    onRefresh = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            end()//刷新成功后需要调用end结束刷新
        }, 1500)
    }
    renderRow = (item) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <PayMessageCell createTime={item.createTime}
                               payNoticeType={item.payNoticeType} payBy={item.payBy}
                               payTo={item.payTo} withAttach={item.withAttach}
                               attach={item.attach} amount = {item.amount}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.isShowTime) {
            return <View style={styles.dateHeader}><Text style={styles.dateHeaderText}>{item.createTime}</Text></View>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='支付消息' />
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="listView"
                    renderRow={this.renderRow}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    renderFooter={() => {
                        return
                        (<View style={{backgroundColor: 'blue', height: 30}}>
                            <Text>我是footer</Text>
                        </View>)
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:colors.page_background,
    },

    dateHeader:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
    dateHeaderText:{
        color:'#666666',
    }


});

export default PayMessagePage