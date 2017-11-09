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
                    "createTime": "2000-01-01 00:00:00",
                    "msgTypeText": "付款未知",
                    "payDirectionText": "未知",
                    "payNoticeTypeText": "未知",
                    "isShowTime": true,
                    "withAttach": true,
                    "amount": 0.0,
                    "attachText": "备注"
                }
            ])
        }
    }
    componentDidMount() {
        NetUtil.post('message/query_pay_msg_page', {}, (data) => {
            this.setState({
                dataSource: this.dataSource.cloneWithRows(data)
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
                               payNoticeType={item.msgTypeText} payBy={item.payNoticeTypeText}
                               payTo={item.payDirectionText} withAttach={item.withAttach}
                               attach={item.attachText} amount = {item.amount}/>
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
        height:30,
        alignItems:'center',
    },
    dateHeaderText:{
        color:'#666666',
        marginTop:13,
    }


});

export default PayMessagePage