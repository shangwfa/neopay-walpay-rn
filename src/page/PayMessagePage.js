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

class PayMessagePage extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.dataSource.cloneWithRows([
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": true,
                    "id": 100,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 99,
                    "payNoticeType": 1,
                    "payNoticeTypeText": "扫一扫付款",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000

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