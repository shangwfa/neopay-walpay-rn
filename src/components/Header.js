import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Divider from '../components/Divider'
import colors from '../constants/colors'
import ScreenUtils from '../utils/ScreenUtils'
import img_left_arrow from '../res/img/img_left_arrow.png'

class Header extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View>
                <View style={styles.container}>
                    {/*header左侧*/}
                    <TouchableWithoutFeedback style={styles.header_left} onPress={()=>this.goback()}>
                        <View style={styles.header_left}>
                            <Image style={styles.header_back_img} source={img_left_arrow}/>
                        </View>
                    </TouchableWithoutFeedback>

                    {/*header中间*/}
                    <View style={styles.header_middle}>
                        <Text style={styles.title}> {this.props.title}</Text>
                    </View>
                    {/*header右侧*/}
                    <View style={styles.header_right}>

                    </View>

                </View>
                <Divider/>
            </View>
            )
    }

    goback = () => {
        console.log("回退")
        console.log(this.props.navigation)
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    header_back_img: {
        width: 10,
        height: 18,
    },
    header_left: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    header_middle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_right: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10
    },
    title: {
        fontSize: 16,
        color: colors.black,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: ScreenUtils.headerHeight,
        paddingTop:ScreenUtils.statusBarHeight

    },
});

export default Header