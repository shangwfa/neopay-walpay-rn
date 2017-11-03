import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import ScrnUtil from '../utils/ScreenUtils'

class AccountTopupResultPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "amount": 13,
                "createTime": "2017-10-18 21:33:28",
                "createTimeMs": 1508333608275,
                "feeCal": 19,
                "feePay": 11,
                "incomeTypeDesc": "qcEuJdD",
                "orderNo": "eCEqL",
                "orderStatus": 19,
                "remark": "hDXgWV",
                "tradeTime": "2017-09-29 14:41:39",
                "tradeTimeMs": 1506667299053,
                "updateTime": "2017-10-19 23:53:15",
                "updateTimeMs": 1508428395950,
                "uuid": "pmsAohHw"
            },
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'充值结果'}/>
                <FlatList
                    data={[{key: '付款方式',data:'余额'}, {key: '收款方式',data:'中信银行信用卡(9889)'}]}
                    renderItem={this._renderItemComponent}
                    ListHeaderComponent ={this._renderListHeaderComponent}
                />

            </View>
        );
    }
    _renderItemComponent = ({item}) => {
        return (
            <View>
                <View style={styles.contentCell}>
                    <Text style={styles.cellItem}>
                        {item.key}
                    </Text>
                    <View style={styles.cellflex}>

                    </View>
                    <Text style={styles.cellDes}>
                        {item.data}
                    </Text>
                </View>
                <View style={styles.separatorLineView}>
                    <View style={styles.separatorLine}>

                    </View>
                </View>
            </View>
        );
    }
    _renderListHeaderComponent = ()=>{
        return(
            <View style={styles.headerView}>
                <Image source={require("../res/img/HomePage/sy_shibai.png")} style={styles.headerViewImg}/>
                <Text style={styles.headerViewText}>
                    充值失败
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    contentCell:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
        backgroundColor:'#FFFFFF',
    },
    cellItem:{
        marginLeft:13,
        color:'#666666',
    },
    cellflex:{
        flex:1,
    },
    cellDes:{
        marginRight:13,
    },
    separatorLineView:{
        alignItems:'flex-end',
        backgroundColor:'#FFFFFF',
    },
    separatorLine:{
        backgroundColor:'#DCDCDC',
        height:1,
        width:ScrnUtil.width-12,
    },
    headerView:{
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        marginBottom:10,
    },
    headerViewImg:{
        marginTop:16,
        marginBottom:14,
    },
    headerViewText:{
        color:'#E94D3D',
        fontSize:16,
        marginBottom:23,
    }
});

export default AccountTopupResultPage