/**
 * @author: carlos.guo
 * @data:  2017/10/23.
 * @description: 红包列表--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet, View, Text, Image, SectionList, RefreshControl,
} from 'react-native'
import Header from "../components/Header";
import BasePage from "./BasePage";
import LoadMoreFooter from "../components/LoadMoreFooter";
const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const data = [
    {
        data: [
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
        data: [
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

class RedListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            isLoadMoreEnd: true
        }
    }

    componentWillMount() {
        //请求数据
        this.setState({
            sourceData: data,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='红包来了！'/>
                {/*消息列表*/}
                <SectionList
                    ListFooterComponent={<LoadMoreFooter isShow={true} isEnd={this.state.isLoadMoreEnd}/>}
                    renderItem={this._renderItem}
                    sections={this.state.sourceData}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh}
                            tintColor="red"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="withe"/>
                    }
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>
        );
    }

    _onRefresh = () => {
        console.log("_onRefresh");
    }
    _onLoadMore = () => {
        console.log("_onLoadMore");
    }
    _renderItem = ({item}) => {
        return (
            <View>
                <Text>red {item.name}</Text>
                <Text>red {item.name}</Text>
                <Text>red {item.name}</Text>
                <Text>red {item.name}</Text>
                <Text>red {item.name}</Text>
                <Text>red {item.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default RedListPage