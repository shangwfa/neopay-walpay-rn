import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native'
import BasePage from "../page/BasePage"
import ScreenUtils from "../utils/ScreenUtils"
import Header from '../components/Header'


const occupationList = [{index:0,key:'政',des:'公务员'},{index:1,key:'事',des:'事业单位员工'},{index:2,key:'管',des:'企业高管'},{index:3,key:'私',des:'私营业主'},{index:4,key:'金',des:'金融从业人员'},{index:5,key:'法',des:'律师'},{index:6,key:'会',des:'会计师'},{index:7,key:'医',des:'医护人员'},{index:8,key:'学',des:'学生'},{index:9,key:'员',des:'公司员工'},{index:10,key:'商',des:'商业服务人员'},{index:11,key:'工',des:'工人'},{index:12,key:'农',des:'农林牧副渔'},{index:13,key:'军',des:'军人民警'},{index:14,key:'文',des:'问题工作者'},{index:15,key:'家',des:'家庭主妇'},{index:16,key:'退',des:'退休'},{index:17,key:'自',des:'自由职业者'},{index:18,key:'其',des:'其他'}];

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
            <TouchableWithoutFeedback onPress={()=>this.pressItem(item.index)}>
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


    pressItem =(index)=>{
        this.setState({
            selectedIndex:index,
        });
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