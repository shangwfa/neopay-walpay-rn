import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import RpTitleStyleItem from '../components/RpTitleStyleItem'
import RedPacketItemComponent from '../components/RedPacketItemComponent'
import CommonButton from '../components/CommonButton'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import ApiManager from '../utils/ApiManager'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class RpTitleStylePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            choseItem:{}
        }
    }

    componentWillMount() {
        ApiManager.getRedPacketThemeList((data) => {
            if (data) {
                let allData = data;
                this.setState({
                    dataSource: allData,
                    choseItem:allData[0]
                });
            } else {

            }
        });
    }

    _choseRpTheme=(item)=> {
        this.setState({
            choseItem:item
        })


    }

    _renderFlatListItem = ({item, index}) => {
        return (
            <View>
                <RpTitleStyleItem style={{flexDirection: "column"} } imgBackGroundUrl={item.imageUrl} click = {()=> this._choseRpTheme(item)}>
                </RpTitleStyleItem>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='红包主题'/>
                <RedPacketItemComponent imgUrl = {this.state.choseItem.imageUrl}/>
                <Text style={styles.middle_text}>选择主题</Text>
                <FlatList
                    style={{marginTop: 5,}}
                    ref='flatList'
                    horizontal={false}
                    numColumns={2}
                    renderItem={this._renderFlatListItem}
                    data={this.state.dataSource}
                    refreshing={false}
                />
                <CommonButton value='确定' style={{marginBottom: 15}} onPress={() => this.pushRecordPage()}/>
            </View>
        );
    }

    pushRecordPage = () => {
        DeviceEventEmitter.emit('sendRedPacket',{type:'redTheme',data:this.state.choseItem})
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    middle_text: {
        fontSize: 16,
        color: colors.black,
        marginTop: 50,
        marginLeft: 15,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    }
});

export default RpTitleStylePage