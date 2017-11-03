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

class PayResultPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            retResult:true,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={'付款结果'}/>
                <FlatList
                    data={[{key: '交易对象',data:'胡萝卜的兔子店'}, {key: '付款方式',data:'中信银行信用卡(9889)'}]}
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
                <Image source={require("../res/img/HomePage/sy_shibai.png")} style={sucStyles.headerViewImg}/>
                <Text style={sucStyles.headerViewText1}>
                    付款失败
                </Text>
            </View>
        );
    }
    _renderListHeaderComponentSuc =()=>{
        return(
            <View style={styles.headerView}>
                <Image source={require("../res/img/HomePage/sy_fasong.png")} style={styles.headerViewImg}/>

                <Text style={styles.headerViewText1}>
                    付款成功
                </Text>
                <Text style={styles.headerViewText2}>
                    -890.89元
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
    headerViewText1:{
        fontSize:16,
        color:'#09BB07',
    },
    headerViewText2:{
        fontSize:27,
        marginTop:16,
        marginBottom:12,
    },

});

export default PayResultPage