import React, {Component} from 'react'
import {
    StyleSheet,
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

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = [
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'},
    {name: 'chris', imgUrl: url, type: '储蓄卡', cardNo: '****   ****   ****   ****   8888'}
]

class BankCardListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(props)
    }

    renderItem = (item) => {
        return <BankCardCell imgIconUrl={item.item.imgUrl}
                             bankNameValue={item.item.name}
                             bankTypeValue={item.item.type}
                             cardNoValue={item.item.cardNo}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡列表'/>
                <FlatList
                    renderItem={this.renderItem}
                    data={dataSource}
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

export default BankCardListPage