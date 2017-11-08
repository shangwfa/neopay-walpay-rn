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
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'

class RpRecordListPage extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.dataSource.cloneWithRows([
                {
                    iconUrl: url,
                    title: '大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: true
                },
                {
                    iconUrl: url,
                    title: '来自毛主席的大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: false
                },
                {
                    iconUrl: url,
                    title: '大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: false
                },
                {
                    iconUrl: url,
                    title: '大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: false
                },
                {
                    iconUrl: url,
                    title: '大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: false
                },
                {
                    iconUrl: url,
                    title: '大红包',
                    tradeTime: '本月',
                    amount: '+88.00',
                    isShowTime: false
                },
            ])
        }
    }

    // componentWillMount() {
    //     NetUtil.post('pay/query_user_order_page', {}, (data) => {
    //         this.setState({
    //             data: data
    //         })
    //     })
    // }


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
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title} middleBottomValue={item.tradeTime}
                               rightUpValue={item.amount} rightBottomValue={item.status}
                               isLine={true}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.isShowTime) {
            return <SectionHeader title={item.tradeTime} value='查看月账单'/>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包交易明细' onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.FILTER_PAGE)
                }}/>
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
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RpRecordListPage