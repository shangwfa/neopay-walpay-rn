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
import {StackNavigator, NavigationActions} from 'react-navigation'
class AccountWithdrawResultPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            retResult:true,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'提现结果'} onLeftPress={()=>{
                    nav.goBack(backKey)
                }}/>
                <FlatList
                    data={[{key: '付款方式',data:'余额'}, {key: '收款方式',data:'中信银行信用卡(9889)'},{key: '提现服务费',data:'1.23元'}]}
                    renderItem={this._renderItemComponent}
                    ListHeaderComponent ={this.state.retResult?this._renderListHeaderComponentSuc:this._renderListHeaderComponentFail}
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
    _renderListHeaderComponentFail = ()=>{
        return(
            <View style={styles.headerView}>
                <Image source={require("../res/img/HomePage/sy_shibai.png")} style={styles.headerViewImg}/>
                <Text style={styles.headerViewText}>
                    提现申请提交失败
                </Text>
            </View>
        );
    }
    _renderListHeaderComponentSuc =()=>{
        return(
            <View style={styles.headerView}>
                <View style={sucStyles.headerViewTitle}>
                    <Image source={require("../res/img/HomePage/sy_chulizhong.png")} style={sucStyles.headerViewImg}/>
                    <View>
                        <Text style={sucStyles.headerViewText1}>
                            提现申请提交成功
                        </Text>
                        <View style={sucStyles.headerViewTextSep}>
                        </View>
                        <Text style={sucStyles.headerViewText2}>
                            处理中
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={sucStyles.headerViewNoText}>
                        +38.00
                    </Text>
                </View>
                    <Text style={sucStyles.headerViewDesText}>
                        申请成功后,金额最迟2个小时之内到账,请注意查收
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
    },
});

const sucStyles = StyleSheet.create({
    headerViewTitle:{
        flexDirection:'row',
        marginTop:22,
    },
    headerViewImg:{
        marginRight:13,
        width:20,

    },
    headerViewText1:{
        marginTop:2,
        fontSize:14,
        color:'#333333',
    },
    headerViewTextSep:{
        flex:1,
    },
    headerViewText2:{
        marginBottom:2,
        fontSize:14,
        color:'#999999',
    },
    headerViewNoText:{
        fontSize:30,
        marginTop:33,
        marginBottom:26,
    },
    headerViewDesText:{
        fontSize:14,
        color:'#999999',
        marginBottom:21,
    }


});

export default AccountWithdrawResultPage