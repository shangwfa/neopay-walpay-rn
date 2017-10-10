import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors'
import header_back_img from '../res/img/header_back.png'

class Header extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={styles.container}>
                {/*header左侧*/}
                <TouchableWithoutFeedback style={styles.header_left} onPress={()=>this.goback()}>
                    <View style={styles.header_left}>
                        <Image style={styles.header_back_img} source={header_back_img}/>
                    </View>
                </TouchableWithoutFeedback>

                {/*header中间*/}
                <View style={styles.header_middle}>
                    <Text style={styles.title}> {this.props.title}</Text>
                </View>
                {/*header右侧*/}
                <View style={styles.header_right}>

                </View>

            </View>)
    }

    goback = () => {
        console.log("回退")
        console.log(this.props.navigation)
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    header_back_img: {
        width: 18,
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
        fontSize: 15,
        color: colors.one_color,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: 48,

    },
});

export default Header