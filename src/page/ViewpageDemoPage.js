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
class ViewpageDemoPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='ViewpageDemo'/>
                <ScrollView  style={styles.scrollview} showsVerticalScrollIndicator={false}>
                    <View style={{height:200}}>
                        <Swiper style={styles.wrapper}   autoplay>
                            <View style={styles.slide1}>
                                <Text style={styles.text}>Hello Swiper</Text>
                            </View>
                            <View style={styles.slide2}>
                                <Text style={styles.text}>Beautiful</Text>
                            </View>
                            <View style={styles.slide3}>
                                <Text style={styles.text}>And simple</Text>
                            </View>
                        </Swiper>
                    </View>
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