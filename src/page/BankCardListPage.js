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
import {RouterPaths} from '../constants/RouterPaths'
import SectionHeader from '../components/SectionHeader'
import BankCardCell from '../components/BankCardCell'
import CommonButton from '../components/CommonButton'
import BankCardDetailPage from "./BankCardDetailPage";

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
                             cardNoValue={item.item.cardNo}
                             onPress = {()=>this.pushNext()}/>
    }

    renderEmptyView = () =>{
        return (<View style = {styles.empty_container}>
            <View style = {{alignItems:'center'}}>
                <Image style = {styles.top_img} source = {require("../res/img/emptyBankCard_img.png")}></Image>
                <Text style = {styles.middle_text}>添加绑定银行卡进行实名认证</Text>
                <Text style = {styles.middle_text_bottom}>享受安全便捷的服务</Text>
            </View>
            <CommonButton value='添加绑定银行卡' style={{marginTop:50 }} onPress={()=>this.pushAddBankCard()}/>
        </View>);

    }

    render() {
        if(0)
        {
            return (
                <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='银行卡列表' rightIconStyle = {{width:20, height:20}} rightIcon={require("../res/img/add_icon.png")} onRightPress = {()=>this.addBankCard()}/>

                    <FlatList
                        renderItem={this.renderItem}
                        data={dataSource}
                    />

                </View>
            );
        }else
        {
            return (
                <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡列表' rightIconStyle = {{width:20, height:20}} rightIcon={require("../res/img/add_icon.png")} onRightPress = {()=>this.addBankCard()}/>
                {this.renderEmptyView()}
                </View>
            );
        }
    }

    pushAddBankCard = () =>{

    }

    pushNext(){
        this.props.navigation.navigate(RouterPaths.BANKCARD_DETAIL)
    }

    addBankCard() {
        this.props.navigation.navigate(RouterPaths.BIND_BANK_CARD_PAGE)
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
    },
    top_img:{
        marginTop:30,
        width:130,
        height:130,
        borderRadius:65,
    },
    empty_container:{
        flex:1,
        backgroundColor:colors.white
    },
    middle_text:{
        marginTop:30,
    },
    middle_text_bottom:{
        marginTop:15,
    }

});

export default BankCardListPage