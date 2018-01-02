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
import ApiManager from "../utils/ApiManager"
import Contacts from 'react-native-contacts'
import Divider from "../components/Divider";

class RedPacketReceiverPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            inputPhone: '',
            data: [],
            tip: 0
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener(events.CONTACTS_EVENT, (contacts) => {
            let arr = []
            for (let item of contacts.values()) {
                if (!this.isExistPhone(item.phone)) {
                    arr.push({name: item.name, phone: item.phone})
                }
            }
            this.state.data.map(item => {
                arr.push(item)
            })
            this.setState({data: arr, tip: arr.length})
        })
    }

    isExistPhone(phone) {
        let result = false
        for (let item of this.state.data) {
            if (StringUtils.equals(phone, item.phone)) {
                result = true
                break
            } else {
                result = false
            }
        }
        return result
    }

    addPhone = () => {
        if (StringUtils.isNoEmpty(this.state.inputPhone)) {
            if (regular.phone.test(this.state.inputPhone)) {
                if (this.isAddedPhone()) {
                    NativeModules.commModule.toast('该手机号已被添加')
                } else {
                    let arr = this.state.data
                    arr.push({name: '', phone: this.state.inputPhone})
                    this.setState({
                        data: arr,
                        inputPhone: '',
                        tip: arr.length
                    })
                    const dismissKeyboard = require('dismissKeyboard')
                    dismissKeyboard()
                    NativeModules.commModule.toast('添加成功')
                }


            } else {
                NativeModules.commModule.toast('输入的手机号不正确')
            }
        } else {
            NativeModules.commModule.toast('手机号不能为空')
        }
    }

    isAddedPhone = () => {
        let isResult = false
        for (let item of this.state.data) {
            if (StringUtils.equals(item.phone, this.state.inputPhone)) {
                isResult = true
                break
            }
        }
        return isResult
    }

    clearPhone = (item) => {
        let arr = this.state.data.filter(value => {
            return !StringUtils.equals(value.phone, item.phone)
        })
        this.setState({data: arr, tip: arr.length})
    }

    clearAllPhones = () => {
        this.setState({data: [], tip: 0})
    }

    renderHeader = () => {
        return (
            <View style={{height: 44, justifyContent: 'center', backgroundColor: 'white', paddingLeft: 10}}>
                <Text>{`领取人列表(${this.state.tip}人)`}</Text>
            </View>)
    }

    renderFooter = () => {
        return (
            <View style={{backgroundColor: 'white', alignItems: 'center', paddingTop: 17, paddingBottom: 18}}>
                <Text style={styles.clear_btn} onPress={() => this.clearAllPhones()}>清空列表</Text>
            </View>)
    }

    renderItemName = (name) => {
        if (StringUtils.isNoEmpty(name)) {
            return <Text style={{flex: 2, fontSize: 14, color: colors.black}} numberOfLines={1}>{name}</Text>
        }
    }
    renderItem = ({item}) => {
        return (
            <View style={{height: 45, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{height: 44, width: 30, justifyContent: 'center', marginLeft: 10, marginRight: 10}}
                        onPress={() => this.clearPhone(item)}>
                        <Image style={{height: 20, width: 20,}} source={clear_contacts_icon}/>
                    </TouchableOpacity>
                    {this.renderItemName(item.name)}
                    <Text style={{flex: 5, fontSize: 14, color: colors.black_light}}>{item.phone}</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: '#DADADA', marginLeft: 38}}/>
            </View>)
    }
    //ListFooterComponent={this.renderFooter()}
    renderList = () => {
        if (this.state.data.length > 0) {
            return (
                <FlatList
                    style={{marginTop: 20}}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => {
                        return index
                    }}
                    extraData={this.state}
                    ListHeaderComponent={this.renderHeader()}
                />
            )
        } else {
            return <View style={{flex: 1}}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包领取人'/>
                <RedPaketReceiverInput
                    value={this.state.inputPhone}
                    style={{marginTop: 10}}
                    onChangeText={(phone) => {
                        this.setState({inputPhone: phone})
                    }}
                    onRightBtnPress={() => {
                        this.addPhone()
                    }}/>
                <CommonItemThree
                    style={{marginTop: 10}}
                    source={contacts_icon}
                    title='手机通讯录选择添加'
                    onPress={() => {
                        Contacts.checkPermission((err, permission) => {
                            if (permission === 'authorized') {
                                this.props.navigation.navigate(RouterPaths.CONTACTS_PAGE)
                            } else {
                                Contacts.requestPermission((err, permission) => {
                                    if (permission === 'authorized') {
                                        this.props.navigation.navigate(RouterPaths.CONTACTS_PAGE)
                                    } else {
                                        NativeModules.commModule.toast('设置查看联系人权限')
                                    }
                                })
                            }

                        })

                    }}/>
                {this.renderList()}


                <View style={{justifyContent: "flex-end"}}>
                    <Divider/>
                    <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                        <TouchableOpacity
                            style={[{backgroundColor: "#F9F9F9"}, styles.send_red_packet_btn]}
                            onPress={this.handleClearRedPacketContacts}>
                            <Text style={[styles.send_red_packet_txt, {color: "#F34646"}]}>清空列表</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{backgroundColor: "#F34646"}, styles.send_red_packet_btn]}
                            onPress={this.handleSendWithRedPacketContacts}>
                            <Text style={[styles.send_red_packet_txt, {color: "#FFF"}]}>确定发送</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }

    handleSendWithRedPacketContacts = () => {
        let redPacketPhones = "";
        this.state.data.map((item) => {
            let phone = item.phone.toString().replace(/\s/g, "");
            redPacketPhones += phone + ",";
        });
        let request = {
            packetCode: this.props.navigation.state.params.packetCode,
            phones: redPacketPhones,
        };
        ApiManager.addRedPacketReceiver(request, (data) => {
            let phone = this.state.data[0].phone.toString().replace(/\s/g, "");
            let name = this.state.data[0].name.toString().replace(/\s/g, "");
            let msg = phone === name ? phone : phone + name;
            let desMsg = `${msg}${this.state.data.length === 1 ? "" : `等${this.state.data.length}个人`}`;
            this.props.navigation.navigate(RouterPaths.RED_PACKETS_RESULT_PAGE, {
                desMsg: desMsg,
                isReady: true,
                amount: this.props.navigation.state.params.amount,
                payTypeDesc: this.props.navigation.state.params.payTypeDesc,
                packetCode: this.props.navigation.state.params.packetCode,
            })
        }, (errorData) => {
            this.handleError(errorData);
        });
    };

    handleError(errorData) {
        //1、成功 2、失败 3、提醒
        if (2 === errorData.retCode) {
            let desMsg = `${this.state.data[0].phone + this.state.data[0].name}${this.state.data.length === 1 ? "" : `等${this.state.data.length}个人`}`;
            nav.navigate(RouterPaths.RED_PACKETS_RESULT_PAGE, {
                desMsg: desMsg,
                isReady: false,
                amount: this.props.navigation.state.params.amount,
                payTypeDesc: this.props.navigation.state.params.payTypeDesc,
                packetCode: this.props.navigation.state.params.packetCode,
            })
        } else {
            NativeModules.commModule.toast(errorData.retMsg)
        }
    }

    handleClearRedPacketContacts = () => {
        this.clearAllPhones();
    };
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
    },
    send_red_packet_btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    send_red_packet_txt: {
        marginTop: 18,
        marginBottom: 18,
        fontSize: 15,
    }
});

export default RedPacketReceiverPage