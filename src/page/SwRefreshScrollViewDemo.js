import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    Dimensions
} from 'react-native'

import {
    SwRefreshListView,
    RefreshStatus, //刷新状态 用于自定义
    LoadMoreStatus //上拉加载状态 用于自定义
} from 'react-native-swRefresh'
import BasePage from '../page/BasePage'

const {width, height} = Dimensions.get('window')

class SwRefreshScrollViewDemo extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: this.dataSource.cloneWithRows([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        };
    }


    onLoadMore=(end)=>{
        console.log('onLoadMore')
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this._page++
            let data = []
            for (let i = 0; i < (this._page + 1) * 10; i++) {
                data.push(i)
            }
            this.setState({
                dataSource: this.dataSource.cloneWithRows(data)
            })
            end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
            // this.refs.listView.endLoadMore(this._page > 2)
        }, 2000)
    }

    onRefersh=(end)=>{
        console.log('onRefersh')
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this._page = 0
            let data = []
            for (let i = 0; i < 10; i++) {
                data.push(i)
            }
            this.setState({
                dataSource: this.dataSource.cloneWithRows(data)
            })
            this.refs.listView.resetStatus() //重置上拉加载的状态

            end()//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
        }, 1500)
    }

    renderRow=(rowData)=>{
        return(
            <View style={styles.cell}>
                <Text>{'这是第' + rowData + '行'}</Text>
            </View>
        )
    }
    render() {
        return (
            <SwRefreshListView
                dataSource={this.state.dataSource}
                ref="listView"
                renderRow={this.renderRow}
                onRefresh={this.onRefersh}
                onLoadMore={this.onLoadMore}
                //isShowLoadMore={false}
            />)
    }

}

const styles = StyleSheet.create({
    content: {
        width: width,
        height: height,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        height: 100,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1

    }
})

export default SwRefreshScrollViewDemo