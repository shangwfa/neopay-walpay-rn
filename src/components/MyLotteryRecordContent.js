import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    ListView,
} from 'react-native'

const SDimensions = require('Dimensions');
const {width} = SDimensions.get('window');


class MyLotteryRecordContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.sectionController}>
                        {this.renderSectionHeader()}
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionTitle}>
                                大红包
                            </Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionTitle}>
                                活动
                            </Text>
                        </View>
                    </View>

                    <View style={styles.indicatorViewStyle}>
                        {this.renderIndicator()}
                    </View>
                </View>
                <ScrollView horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={true}
                            onMomentumScrollEnd={(e) => {this.onScrollAnimationEnd(e)}}
                            style={styles.actScrollView}>
                    <View style={styles.page1}>

                    </View>
                    <View style={styles.page2}>

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
                <View key={i} style = {[{height:2,width:width/2.0},style]}></View>
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
    sectionTitle:{
        fontSize:15,
        color:'red',
    },

    indicatorLine:{
        height:2,
        marginLeft:this.activePage*100,
        width:width/2.0,
        backgroundColor:'red',
    },

    actScrollView:{
        backgroundColor:'green',
    },
    page1:{
        backgroundColor:'yellow',
        width:width,
        height:300,
    },
    page2:{
        backgroundColor:'blue',
        width:width,
        height:300,

    },

    indicatorViewStyle: {
        //设置主轴方向，横向
        flexDirection: 'row',
        //水平居中
        justifyContent: 'center'
    }

});

export default MyLotteryRecordContent