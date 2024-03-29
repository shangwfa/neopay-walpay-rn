import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    DeviceEventEmitter,
    TouchableWithoutFeedback
} from 'react-native'
import BasePage from "../page/BasePage"
import ScreenUtils from "../utils/ScreenUtils"
import Header from '../components/Header'


const occupationList = [{index:'01',key:'政',des:'公务员',type:'OFFICIAL'},{index:'02',key:'事',des:'事业单位员工',type:'PUBLIC_SECTOR_EMPLOYEES'},{index:'03',key:'管',des:'企业高管',type:'ENTERPRISE_SENIOR_MANAGER'},{index:'04',key:'私',des:'私营业主',type:'PRIVATE_BUSINESS_OWNER'},{index:'05',key:'金',des:'金融从业人员',type:'EMPLOYEE_IN_FINANCE'},{index:'06',key:'法',des:'律师',type:'LAWYER'},{index:'07',key:'会',des:'会计师',type:'ACCOUNTANT'},{index:'08',key:'医',des:'医护人员',type:'MEDICAL_WORKERS'},{index:'09',key:'学',des:'学生',type:'STUDENT'},{index:'10',key:'员',des:'公司员工',type:'EMPLOYEES'},{index:'11',key:'商',des:'商业服务人员',type:'COMMERCIAL_SERVICE_WORKERS'},{index:'12',key:'工',des:'工人',type:'WORKERS'},{index:'13',key:'农',des:'农林牧副渔',type:'AGRICULTURE_SECTOR'},{index:'14',key:'军',des:'军人民警',type:'SOLDIER'},{index:'15',key:'文',des:'问题工作者',type:'LITERATURE_SPORTS_WORKERS'},{index:'16',key:'家',des:'家庭主妇',type:'HOUSEWIFE'},{index:'17',key:'退',des:'退休',type:'RETIRE'},{index:'18',key:'自',des:'自由职业者',type:'FREELANCERS'},{index:'19',key:'其',des:'其他',type:'OTHER'}];

class OccupationSelectionPage extends BasePage {

    constructor(props){
        super(props);
        this.state ={
            selectedIndex:null,
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='职业'/>
                <FlatList
                data={occupationList}
                renderItem={this.renderItem}
                ListHeaderComponent = {this.renderListHeader}
                extraData = {this.state}
                />
            </View>

        );
    }

    renderListHeader=()=>{
        return(
            <View style={{height:10}}/>
        )

    }

    renderItem =({item})=>{
        let iconColor = '#ADE0FD';
        if(item.index>=4&&item.index<=12){
            iconColor = '#F6E781';
        }else if(item.index>=13&&item.index<=17){
            iconColor = '#FFCEAF';
        }else if(item.index>17){
            iconColor ='#C3C3C3';
        }
        return(
            <TouchableWithoutFeedback onPress={()=>this.pressItem(item)}>
                <View style={styles.cellContainer}>
                    <View style={styles.cellContainerView}>
                        <View style={[styles.iconView,{backgroundColor:iconColor}]}>
                            <Text style={styles.iconText}>{item.key}</Text>
                        </View>
                        <Text style={styles.desText}>
                            {item.des}
                        </Text>
                        <View style={{flex:1}}/>
                        {item.index===this.state.selectedIndex?this.renderCheckedIcon(item):null}
                    </View>
                    <View style={styles.underLine}>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderCheckedIcon =()=>{
        return (
            <Image source={require('../res/img/HomePage/sy_gou3.png')} style={styles.checkedImg}/>
        )}


    pressItem =(item)=>{
        this.setState({
            selectedIndex:item.index,
        });
        DeviceEventEmitter.emit('userInfoCerfity', {type: 'choseOccupation', data: item})
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cellContainer:{
        height:51,
        width:ScreenUtils.width,
        backgroundColor:'#FFFFFF',
    },
    cellContainerView:{
        flexDirection:'row',
        height:50,
        alignItems:'center',
    },
    iconView:{
        height:29,
        width:29,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:11,
    },
    iconText:{
        fontSize:23,
        color:'#FFFFFF',
    },
    underLine:{
        height:1,
        backgroundColor:'#EEEEEE',
        marginLeft:50,
    },
    desText:{
        fontSize:14,
        color:'#333333',
        marginLeft:32,

    },
    checkedImg:{
        width:18,
        height:18,
        marginRight:13,
    }

});

export default OccupationSelectionPage