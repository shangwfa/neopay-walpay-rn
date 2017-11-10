import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from '../constants/index'
import Swiper from 'react-native-swiper'
import ViewPager from '../components/ViewPager'
class ViewpageDemoPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data:[
                {text:'Hello Swiper'},
                {text:'Beautiful'},
                {text:'And simple'}
            ]
        };
    }


    renderViewPageItem=(item)=>{
        return (
            <View style={styles.slide1}>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='ViewpageDemo'/>
                <ScrollView  style={styles.scrollview} showsVerticalScrollIndicator={false}>
                    <ViewPager style={{height:200,marginTop:10}} arrayData={this.state.data} autoplay={true} renderItem={(item)=>this.renderViewPageItem(item)}/>
                    <ViewPager style={{height:200,marginTop:10}} arrayData={this.state.data} dotColor='red' activeDotColor ='yellow'
                               renderItem={(item)=>this.renderViewPageItem(item)}/>
                    <ViewPager style={{height:200,marginTop:10}} arrayData={this.state.data} dotStyle={{height:10,width:10,borderRadius:5}}
                               activeDotStyle={{height:10,width:20,borderRadius:3}} renderItem={(item)=>this.renderViewPageItem(item)}/>
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollview:{
      flex:1
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default ViewpageDemoPage