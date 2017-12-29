import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    DeviceEventEmitter,
    NativeModules
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from '../constants/index'
import SearchComponent from '../components/SearchComponent'
import CommonItemTwo from '../components/CommonItemTwo'
import Contacts from 'react-native-contacts'
import StringUtils from "../utils/StringUtils";
import Pinyin from '../utils/Pinyin'
import ScreenUtils from "../utils/ScreenUtils";
import {events} from '../constants/index'

const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'


class ContactsPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            keyMap: new Map(),
            selectedData: new Set(),
        };
        this.pinyin = new Pinyin({charCase: 0});
    }

    emitEvent = () => {

    }

    componentDidMount() {
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                console.log(err)
            } else {
                console.log(contacts)
                this.setState({data: this.getContacts(contacts)})
            }
        })
    }

    getContacts = (contacts) => {
        let filterData = []
        contacts.map(item => {
            if (this.isContact(item)) {
                let familyName = StringUtils.isNoEmpty(item.familyName) ? item.familyName : ''
                let middleName = StringUtils.isNoEmpty(item.middleName) ? item.middleName : ''
                let givenName = StringUtils.isNoEmpty(item.givenName) ? item.givenName : ''
                let name = familyName + middleName + givenName
                let key = this.pinyin.getCamelChars(name)[0]
                for(let phoneItem of item.phoneNumbers){
                    filterData.push({
                        uri: StringUtils.isNoEmpty(item.thumbnailPath) ? item.thumbnailPath : url,
                        name: name,
                        phone:phoneItem.number.replace(/[^\w]/g,'').replace(/-/g,''),
                        isSelected: false,
                        key: key
                    })
                }

            }

        })
        filterData.sort((itemA, itemB) => {
            return itemA.key >= itemB.key ? 1 : -1
        })

        for (let i = 0; i < filterData.length; i++) {
            let item = filterData[i]
            let map = this.state.keyMap
            if (!map.has(item.key)) {
                map.set(item.key, i)
                this.setState({keyMap: map})
            }
        }
        return filterData
    }

    formatePhone(value) {

        let result = StringUtils.replaceAll(value, ' ')
        result = StringUtils.replaceAll(result, '-')
        return result
    }

    isContact = (item) => {
        return (StringUtils.isNoEmpty(item.familyName) || StringUtils.isNoEmpty(item.middleName) || StringUtils.isNoEmpty(item.givenName) ) && item.phoneNumbers.length > 0
    }

    renderItem = ({item, index}) => (
        <CommonItemTwo imgUrl={item.uri} middleUpValue={item.name} middleBottomValue={item.phone} isContacts={true}
                       isSelected={item.isSelected} isLine={true} onPress={() => {
            let data = this.state.data
            let set = this.state.selectedData
            if (data[index].isSelected) {
                set.delete(item)
                this.updateItemStatus(index,set,data)
            } else {
                if (item.phone.length == 11) {
                    set.add(item)
                    this.updateItemStatus(index,set,data)
                } else {
                    NativeModules.commModule.toast('手机号不正确')
                }

            }


        }}/>
    )

    updateItemStatus = (index,set,data) => {
        this.setState({selectedData: set})
        data[index].isSelected = !data[index].isSelected
        this.setState({data: data})
    }


    shortcutBarItemPress = (key) => {
        if (this.state.keyMap.has(key)) {
            this.list.scrollToIndex({viewPosition: 0, index: this.state.keyMap.get(key)});
        }

    }
    renderShortcutBar = () => {
        let arrViews = []
        let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let key of arr) {
            arrViews.push(<Text key={key} style={styles.shortcut_bar_item}
                                onPress={() => this.shortcutBarItemPress(key)}>{key}</Text>)
        }
        return arrViews
    }

    renderSearchBar = () => {
        if (false) {
            return <SearchComponent placeholder='搜索联系人' onChangeText={(text) => {
                console.log('输出' + text)
                //模糊查询
            }}/>
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包领取人' rightTitle='确定' onRightPress={() => {
                    this.props.navigation.goBack();
                    DeviceEventEmitter.emit(events.CONTACTS_EVENT, this.state.selectedData); //显示弹窗
                    console.log(this.state.selectedData)
                }}/>
                {this.renderSearchBar()}
                <Text style={styles.title}>全部联系人</Text>
                <View style={styles.list_container}>
                    <FlatList
                        ref={(c) => this.list = c}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        initialNumToRender={500}
                        getItemLayout={(data, index) => ( {length: 68, offset: 68 * index, index} )}
                        keyExtractor={(item, index) => {
                            return index
                        }}
                    />
                    <View style={styles.shortcut_bar}>
                        {this.renderShortcutBar()}
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    shortcut_bar_item: {
        width: 20,
        fontSize: 10,
        color: colors.black,
        textAlign: 'center'
    },
    shortcut_bar: {
        position: 'absolute',
        width: 20,
        marginLeft: ScreenUtils.width - 20,
        marginTop: 50,
        alignItems: 'center'

    },
    list_container: {
        flex: 1
    },
    title: {
        height: 25,
        color: colors.black,
        fontSize: 12,
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default ContactsPage