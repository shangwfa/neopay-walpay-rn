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
import PayMessageCell from '../components/PayMessageContentCell'
import {RefreshStatus} from "../components/RefreshList"
import RefreshList from '../components/RefreshList'
import ApiManager from '../utils/ApiManager'


class PayMessagePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            footerStatus: RefreshStatus.IDLE,
        }
    }
    componentDidMount() {
        this.loadData(1,false)
    }

    loadData = (pageNo,isLoadMore) => {
        ApiManager.queryPayMessage({pageNo: pageNo}, data => {
            if(data.length<10){
                this.setState({footerStatus:RefreshStatus.END})
            }else {
                this.setState({footerStatus:RefreshStatus.IDLE})
            }

            if(isLoadMore){
                const arrData=this.state.data
                arrData.push(...data)
                this.setState({data: arrData})
            }else {
                this.setState({data: data})
            }


        })
    }


    onLoadMore = (page) => {
        this.loadData(page,true)
    }

    onRefresh = () => {
        this.loadData(1,false)
    }
    renderItem = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <PayMessageCell createTime={item.createTime}
                               payNoticeType={item.payNoticeTypeText} payBy={item.payTypeDesc}
                               payTo={item.tradObject}
                                remark = {item.remark}
                                amount = {item.amount}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <View style={styles.dateHeader}><Text style={styles.dateHeaderText}>{item.createTime}</Text></View>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='支付消息' />
                <RefreshList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    extraData={this.state}
                    footerStatus={this.state.footerStatus}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:colors.page_background,
    },

    dateHeader:{
        height:30,
        alignItems:'center',
    },
    dateHeaderText:{
        color:'#666666',
        marginTop:13,
    }


});

export default PayMessagePage