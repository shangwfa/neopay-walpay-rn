import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
    FlatList,
    DeviceEventEmitter,
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemOne from '../components/CommonItemOne'
import RpDetailHeader from '../components/RpDetailHeader'
import CommonButton from '../components/CommonButton'
import ImageButton from '../components/ImageTitleButton'
import ApiManager from '../utils/ApiManager'
import ScreenUtils from '../utils/ScreenUtils'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class ChoseCityPage extends BasePage {


    constructor(props) {
        super(props);
        this.state = {
            dataDetail:{provinceName:'',provinceCode:'',cityName:'',cityCode:'',areaName:'',areaCode:''},
            dataSource:[],
            param:this.props.navigation.state.params,
            type:1
        }
    }

    componentDidMount() {
        if(this.state.type == 1)
        {
            this._postGetProvinceList();
        }else
        {
            this._postGetCityList();
        }
    }

    _postGetProvinceList = () => {
        ApiManager.getProvinceList((data) => {
            this.setState({
                dataSource: data,
            });
        });
    };

    _postGetCityList = () =>{

        let code = ''
        if(this.state.type == 2)
        {
            console.log('<---->')
            code = this.state.dataDetail.provinceCode
        }else {
            console.log('<--11-->')
            code = this.state.dataDetail.cityCode
        }
        let body = {
            parentAreaCode: code
        };

        console.log('---->' + code)
        ApiManager.getCityList(body,(data) => {
            this.setState({
                dataSource: data,
            });
        });
    }

    _clickItem =(item)=>{
        if(this.state.type == 1)
        {
            this.state.dataDetail.provinceName = item.provinceName;
            this.state.dataDetail.provinceCode = item.provinceCode;
            this.state.type = 2;
            this._postGetCityList();
            // this.props.navigation.navigate(RouterPaths.CHOSE_CITY,{type:2,provinceName:item.provinceName,provinceCode:item.provinceCode})
        }else if(this.state.type == 2)
        {
            this.state.dataDetail.cityName = item.areaName;
            this.state.dataDetail.cityCode = item.areaCode;
            this.state.type = 3;
            this._postGetCityList();
            // this.props.navigation.navigate(RouterPaths.CHOSE_CITY,{type:3,provinceName:item.provinceName,provinceCode:item.provinceCode,cityName:item.areaName,cityCode:item.areaCode})
        }else if(this.state.type == 3)
        {
            this.state.dataDetail.areaName = item.areaName;
            this.state.dataDetail.areaCode = item.areaCode;
            DeviceEventEmitter.emit('userInfoCerfity', {type: 'choseCity', data: this.state.dataDetail})
            this.props.navigation.goBack();
        }
    }

    _renderRow = ({item}) => {
        let name = ''
        if(this.state.type == 1)
        {
            name = item.provinceName
        }else
        {
            name = item.areaName
        }
        console.log('----xxx' + item)
        return (
            <View>
                <CommonItemOne
                    name={name}
                    onPress = {()=>this._clickItem(item)}
                />
            </View>
        )

    }

    _renderMainView = () =>{
        return(
            <View style = {{height:ScreenUtils.height}}>
                <Header
                    navigation={this.props.navigation}
                    title='选择省市区'/>

                <FlatList
                    style={{marginTop: 0,}}
                    ref='flatList'
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    refreshing={false}
                />
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                {this._renderMainView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    mid_view: {
        backgroundColor: colors.page_background,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    num_text: {
        fontSize:15,
        marginLeft:15,
        color:colors.balck_more_light,
    },
    amount_text: {
        fontSize:15,
        marginRight:15,
        color:colors.balck_more_light
    },
    bg_bottom:{
        marginTop:0,
        flexDirection:'row'

    }
});

export default ChoseCityPage