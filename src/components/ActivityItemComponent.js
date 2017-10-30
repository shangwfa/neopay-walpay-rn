import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import ScreenUtils from '../utils/ScreenUtils'
import colors from "../constants/colors";
import activity_tip_icon from '../res/img/activity_tip_icon.png'
import {RouterPaths} from '../constants/RouterPaths'

class ActivityItemComponent extends Component {

    static defaultProps = {
        itemData: {},
    }

    onPress=()=>{
        //TODO 处理点击事件
        console.log("点击Item")
        this.props.navigation.navigate(RouterPaths.HOME_PAGE)
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>this.onPress()}>
                <View style={styles.container}>
                    <View style={styles.content_container}>
                        <Image style={styles.img}
                               source={{uri: this.props.itemData.imgUrl}}/>
                        <View style={styles.content_tip}>
                            <Image style={styles.tip_img} source={activity_tip_icon}/>
                            <Text style={styles.tip_text}>{this.props.itemData.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    tip_text: {
        marginLeft: 16,
        fontSize: 13,
        color: colors.black,
    },
    tip_img: {
        width: 20,
        height: 18,
        marginLeft: 10
    },
    content_tip: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    img: {
        width: ScreenUtils.width - 26,
        height: 149,
        backgroundColor: colors.page_background,
    },
    content_container: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 8,
        marginBottom:8,
        borderRadius: 8,
    },
    container: {
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.page_background
    }
})

export default ActivityItemComponent