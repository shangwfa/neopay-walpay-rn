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
import RpTitleStyleItem from '../components/RpTitleStyleItem'
import RedPacketItemComponent from '../components/RedPacketItemComponent'
import CommonButton from '../components/CommonButton'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = [
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'}
]
class RpTitleStylePage extends BasePage {
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

    _renderFlatListItem = ({item, index}) => {
        return (
            <View>
                <RpTitleStyleItem style={{flexDirection: "column"} }>
                </RpTitleStyleItem>
            </View>
        );
    };

    render() {
        return (
            <View style = {styles.container}>
                <Header navigation={this.props.navigation} title='红包主题'/>
                <RedPacketItemComponent/>
                <Text style ={styles.middle_text}>选择主题</Text>
                <FlatList
                    style={{marginTop: 5,}}
                    ref='flatList'
                    horizontal={false}
                    numColumns={2}
                    // ItemSeparatorComponent={this._renderItemLine}
                    renderItem={this._renderFlatListItem}
                    // keyExtractor={this._keyExtractor}
                    data={dataSource}
                    refreshing={false}
                />
                <CommonButton value='确定' style={{marginBottom:15 }} onPress={()=>this.pushRecordPage()}/>
            </View>
        );
    }

    pushRecordPage = () =>{

    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    middle_text:{
        fontSize:16,
        color:colors.black,
        marginTop:50,
        marginLeft:15,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});

export default RpTitleStylePage