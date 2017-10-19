import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    RefreshControl
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import LoadMoreFooter from '../components/LoadMoreFooter'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = [
    {
        data:
            [
                {
                    name: 'nader',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'chris',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'anader',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'bchris',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'cnader',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'dchris',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'ndader',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                },
                {
                    name: 'cehris',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                    rightBottomValue: '付款处理中'
                }],
        key: '本月'
    },
    {
        data:
            [
                {
                    name: 'nick',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'amanda',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'enick',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'ramanda',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'tnick',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'yamanda',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'fnick',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'amranda',
                    imgUrl: url,
                    middleUpValue: '胡萝卜的兔子店',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                }],
        key: '9月'
    },
]

class MyOrderPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = (item) => {
        return <CommonItemTwo imgUrl={item.item.imgUrl}
                              middleUpValue={item.item.middleUpValue} middleBottomValue={item.item.middleBottomValue}
                              rightUpValue={item.item.rightUpValue} rightBottomValue={item.item.rightBottomValue}
                              isLine={true}/>
    }

    renderHeader = (headerItem) => {
        return <SectionHeader title={headerItem.section.key} value='查看月账单'/>
    }
    loadMoreData=()=>{
        console.log('加载更多')
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的账单' rightTitle='筛选' onRightPress={() => {
                    console.log('筛选')
                }}/>
                <SectionList
                    ListFooterComponent={<LoadMoreFooter isShow={true} isEnd={false}/>}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderHeader}
                    sections={dataSource}
                    keyExtractor={(item) => item.name}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                console.log('下拉刷新')
                            }}
                            tintColor="red"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="gray"/>
                    }
                    onEndReached={()=>this.loadMoreData()}
                    onEndReachedThreshold={0.5}
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

export default MyOrderPage