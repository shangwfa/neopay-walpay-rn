import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    NativeModules,
    DeviceEventEmitter
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import CommonButton from '../components/CommonButton'
import {colors} from '../constants/index'
import FilterItem from '../components/FilterItem'
import Divider from '../components/Divider'
import CommonItemOne from '../components/CommonItemOne'
import trade_icon from '../res/img/filter_trade.png'
import income_icon from '../res/img/filter_income.png'
import TimePicker from '../modal/TimePicker'
import {RouterPaths} from '../constants/RouterPaths'
import DateUtils from '../utils/DateUtils'
import StringUtils from "../utils/StringUtils";
class FilterPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            tradeTypes: [
                {
                    index: 0,
                    name: '新光币',
                    type: "1",
                    selected: false
                },
                {
                    index: 1,
                    name: '余额',
                    type: "2",
                    selected: false
                },
                {
                    index: 2,
                    name: '账户提现',
                    type: "3",
                    selected: false
                },
                {
                    index: 3,
                    name: '账户充值',
                    type: "4",
                    selected: false
                },
                {
                    index: 4,
                    name: '大红包',
                    type: "5",
                    selected: false
                },
            ],
            incomeTypes: [
                {
                    index: 0,
                    name: '收入',
                    type: "1",
                    selected: false
                },
                {
                    index: 1,
                    name: '支出',
                    type: "2",
                    selected: false
                },
            ],
            tradeType: '',
            incomeType: '',
            startTime: '设置时间',
            endTime: DateUtils.dateFmt(),
            startTimeValue:0,
            endTimeValue:0,
        }
    }

    commit = () => {
        const params={
            type:'filter',
            data:{
                tradeType:this.state.tradeType,
                incomeType:this.state.incomeType,
                startTime:StringUtils.equals(this.state.startTime,'设置时间')?'':this.state.startTime+" 00:00:00",
                endTime:this.state.endTime+ " 23:59:59",
                isResult:true
            }
        }
        // DeviceEventEmitter.emit(RouterPaths.MY_ORDER_PAGE,params)
        // nav.goBack()
        nav.navigate(RouterPaths.MY_ORDER_PAGE,params.data)
    }
    pickStartTime = () => {
        TimePicker.showTimePicker((value) => {
            const time=value.join('-')
            const timeValue=value.join('')
            if(0!==this.state.endTimeValue&&timeValue>this.state.endTimeValue){
                NativeModules.commModule.toast('开始时间不能大于结束时间')
            }else {
                this.setState({startTime:time,startTimeValue:timeValue})
            }
        })
    }
    pickEndTime = () => {
        TimePicker.showTimePicker((value) => {
            const time=value.join('-')
            const timeValue=value.join('')
            if(0!==this.state.startTimeValue&&timeValue<this.state.startTimeValue){
                NativeModules.commModule.toast('结束时间不能小于开始时间')
            }else {
                this.setState({endTime:time,endTimeValue:timeValue})
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title='筛选'/>
                <View style={{height:10}}/>
                <FilterItem
                    title='交易方式'
                    source={trade_icon}
                    data={this.state.tradeTypes}
                    callback={(filter) => {
                        this.setState = {tradeType: filter}
                    }}/>
                <Divider/>
                <FilterItem
                    title='支付方式'
                    source={income_icon}
                    data={this.state.incomeTypes}
                    callbacck={(filter) => {
                        this.setState = {incomeType: filter}
                    }}/>
                <View style={{height: 15}}/>
                <CommonItemOne
                    name='开始时间'
                    value={this.state.startTime}
                    isShowArrow={true}
                    onPress={() => this.pickStartTime()}/>
                <Divider/>
                <CommonItemOne
                    name='结束时间'
                    value={this.state.endTime}
                    isShowArrow={true}
                    onPress={() => this.pickEndTime()}/>
                <CommonButton
                    value='提交'
                    style={{marginTop: 70}}
                    onPress={()=>this.commit()}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default FilterPage