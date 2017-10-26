import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    ListView,
    TouchableWithoutFeedback,
} from 'react-native'

import ActivityList from './MyLotteryRecordActiList'
import RedPacketList from './MyLotteryRecordRedpList'
import ScreenUtils from '../utils/ScreenUtils'

const SDimensions = require('Dimensions');
const {width} = SDimensions.get('window');
const {height} = SDimensions.get('window');


class MyLotteryRecordContent extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activePage: 0,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    _scroll;

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.sectionController}>
                        {this.renderSectionHeader()}
                    </View>

                    <View style={styles.indicatorViewStyle}>
                        {this.renderIndicator()}
                    </View>
                </View>
                <ScrollView
                            ref={(scroll)=>this._scroll = scroll}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={(e) => {this.onScrollAnimationEnd(e)}}
                            style={styles.actScrollView}>
                    <View style={styles.page1}>
                        <RedPacketList/>
                    </View>
                    <View style={styles.page2}>
                        <ActivityList/>
                    </View>

                </ScrollView>

            </View>
        );
    }

    onScrollAnimationEnd(e) {
        //求出当前的页码
        let currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);//取整
        //更新状态机
        console.log('current page is ' + currentPage)

        this.setState({activePage:currentPage})

    }

    //头部按钮
    renderSectionHeader(){
        //指示器数组
        let indicatorArr = [], style;
        const sectionTitleArr = ['大红包','活动'];

        //遍历创建组件
        for (let i = 0; i < 2; i++) {
            //设置圆点的样式
            style = (i === this.state.activePage) ? {color: 'red'} : {color: 'gray'}
            indicatorArr.push(
                <TouchableWithoutFeedback key={i} onPress={()=>{this._scroll.scrollTo({x:width*i,y:0,animated:true})}}>
                <View key={i} style = {[{height:50,width:width/2.0,alignItems:'center',justifyContent:'center'}]} >
                    <Text style = {[{fontSize:15},style]}>{sectionTitleArr[i]}</Text>
                </View>
                </TouchableWithoutFeedback>
            );
        }
        //返回数组
        return indicatorArr;
    }

    //页码（指示器）
    renderIndicator() {
        //指示器数组
        let indicatorArr = [], style;
        //遍历创建组件
        for (let i = 0; i < 2; i++) {
            //设置圆点的样式
            style = (i === this.state.activePage) ? {backgroundColor: 'red'} : {backgroundColor: 'transparent'}
            indicatorArr.push(
                <View key={i} style = {[{height: 2, width: width / 2.0}, style]}/>
            );
        }
        //返回数组
        return indicatorArr;
    }

}

const styles = StyleSheet.create({



    sectionController:{
        flexDirection:'row',
        height:50,
    },

    sectionItem:{
        height:50,
        width:width/2.0,
        alignItems:'center',
        justifyContent:'center',
    },


    indicatorLine:{
        height:2,
        marginLeft:this.activePage*100,
        width:width/2.0,
        backgroundColor:'red',
    },

    actScrollView:{
        height:height -ScreenUtils.headerHeight-208,
    },
    page1:{
        width:width,
        height:height -ScreenUtils.headerHeight-220,
    },
    page2:{
        width:width,
        height:height -ScreenUtils.headerHeight-220,

    },

    indicatorViewStyle: {
        //设置主轴方向，横向
        flexDirection: 'row',
        //水平居中
        justifyContent: 'center'
    }

});

export default MyLotteryRecordContent