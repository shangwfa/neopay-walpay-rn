import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter,
    NativeModules
} from 'react-native'
import Header from "../components/Header";
import BasePage from "./BasePage";
import {colors} from '../constants/index'
import RedPaketReceiverInput from '../components/RedPaketReceiverInput'
import CommonItemThree from '../components/CommonItemThree'
import contacts_icon from '../res/img/contacts_icon.png'
import clear_contacts_icon from '../res/img/clear_contacts_icon.png'
import StringUtils from '../utils/StringUtils'
import {RouterPaths} from '../constants/RouterPaths'
import {events} from '../constants/index'
import regular from '../constants/regular'

class RedPacketReceiverPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            inputPhone: '',
            data: [],
            tip:'领取人列表(0人)'
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener(events.CONTACTS_EVENT, (contacts) => {
            let arr=[]
            console.log('contacts:'+contacts);
            for (let item of contacts.values()) {
                console.log(item);
                arr.push({name:item.name,phone:item.phone})
            }
            this.setState({data:arr,tip:'领取人列表('+arr.length+'人)'})
        })
    }
    addPhone = () => {
        console.log('添加手机号')
        if(StringUtils.isNoEmpty(this.state.inputPhone)){
            if(regular.phone.test(this.state.inputPhone)){
                let arr=this.state.data
                arr.push({name:'--',phone:this.state.inputPhone})
                this.setState({data:arr,inputPhone:''})
                const dismissKeyboard = require('dismissKeyboard')
                dismissKeyboard()
                NativeModules.commModule.toast('添加成功')
            }else {
                NativeModules.commModule.toast('输入的手机号不正确')
            }

        }else {
            NativeModules.commModule.toast('手机号不能为空')
        }
    }

    clearPhone=(item)=>{
        let arr=this.state.data.filter(value=>{
            return !StringUtils.equals(value.phone,item.phone)
        })
        this.setState({data:arr})
    }

    clearAllPhones=()=>{
        this.setState({data:[]})
    }

    renderHeader = () => {
        return (
            <View style={{height: 44, justifyContent: 'center', backgroundColor: 'white',paddingLeft:10}}>
                <Text>{this.state.tip}</Text>
            </View>)
    }

    renderFooter = () => {
        return (
            <View style={{backgroundColor: 'white', alignItems: 'center', paddingTop: 17, paddingBottom: 18}}>
                <Text style={styles.clear_btn} onPress={()=>this.clearAllPhones()}>清空列表</Text>
            </View>)
    }

    renderItemName=(name)=>{
        if(StringUtils.isNoEmpty(name)){
            return <Text style={{flex:1,fontSize:14,color:colors.black}}>{name}</Text>
        }
    }
    renderItem = ({item}) => {
        return (
            <View style={{height:45,backgroundColor:'white'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={{height:44,width:30,justifyContent:'center',marginLeft:10,marginRight:10}} onPress={()=>this.clearPhone(item)}>
                        <Image style={{height:20,width:20,}} source={clear_contacts_icon}/>
                    </TouchableOpacity>
                    {this.renderItemName(item.name)}
                    <Text style={{flex:5,fontSize:14,color:colors.black_light}}>{item.phone}</Text>
                </View>
                <View style={{height:0.5,backgroundColor:'#DADADA',marginLeft:38}}/>
            </View>)
    }

    renderList=()=>{
        if(this.state.data.length>0){
            return(
                <FlatList
                    style={{marginTop: 20}}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => {
                        return index
                    }}
                    extraData={this.state}
                    ListHeaderComponent={this.renderHeader()}
                    ListFooterComponent={this.renderFooter()}
                />
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包领取人'/>
                <RedPaketReceiverInput value={this.state.inputPhone} style={{marginTop: 10}} onChangeText={(phone) => {this.setState({inputPhone: phone})}}
                                       onRightBtnPress={() => {this.addPhone()}}/>
                <CommonItemThree style={{marginTop: 10}} source={contacts_icon} title='手机通讯录选择添加' onPress={()=>{
                    this.props.navigation.navigate(RouterPaths.CONTACTS_PAGE)
                }}/>
                {this.renderList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    clear_btn: {
        width: 133,
        height: 32,
        borderColor: colors.black_light,
        borderWidth: 0.5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default RedPacketReceiverPage