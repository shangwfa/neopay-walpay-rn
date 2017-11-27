import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import RedPacketRecordCell from '../components/RedPacketRecordCell'
import {RouterPaths} from '../constants/RouterPaths'
import ApiManager from '../utils/ApiManager'



class RpMonthDetailRecord extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                "receiveAmount": 0,
                "receiveCount": 0,
                "sendAmount": 0,
                "sendCount": 0
            },
            param:this.props.navigation.state.params
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.state.param.createTime.slice(5,7) + '月红包记录'} header_middleStyle={{flex:1.4}}/>
                <RedPacketRecordCell isShowBtn = {false} cellType={true} amount={this.state.data.receiveAmount} count={this.state.data.receiveCount}/>
                <RedPacketRecordCell isShowBtn = {false} cellType={false} amount={this.state.data.sendAmount} count={this.state.data.sendCount}/>
            </View>
        );
    }

    componentDidMount(){
        let days = 31;
        if(this.state.param.createTime.slice(5,7) == '04' || this.state.param.createTime.slice(5,7) == '06' || this.state.param.createTime.slice(5,7) == '09'
            ||this.state.param.createTime.slice(5,7) == '11')
        {
            days = 30;
        }else if(this.state.param.createTime.slice(5,7) == '2')
        {
            if(this.state.param.createTime.slice(0,3)%100 == 0 )
            {
                if(this.state.param.createTime.slice(0,3)%400 == 0)
                {
                    days = 29;
                }else
                {
                    days = 28;
                }
            }else{
                if(this.state.param.createTime.slice(0,3)%4 == 0)
                {
                    days = 29;
                }else
                {
                    days = 28;
                }
            }
        }
        let params = {
            startTime:this.state.param.createTime.slice(0,7) + '-01 00:00:00',
            endTime:this.state.param.createTime.slice(0,7) + '-' + days + ' 23:59:59',
        };

        console.log('-->' + params.startTime + '---' +params.endTime)
        ApiManager.getUserRedPacketStats(params,(data)=>{
            console.log(data)
            this.setState({
                data:data
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RpMonthDetailRecord