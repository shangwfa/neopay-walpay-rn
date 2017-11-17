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
import {RouterPaths} from '../constants/RouterPaths'

class RedPacketItemComponent extends Component {

    static defaultProps = {
        itemData: {},
    }

    constructor(props) {
        super(props)
    }

    onPress=()=>{
        //TODO 处理点击事件
        console.log("点击Item")

    }


    render() {

        const sourceImgs = [
            require( '../res/img/LotteryRecord/xx_hongbao7.png'),
            require( '../res/img/LotteryRecord/xx_hongbao6.png')];

        if (this.props.itemData)

        return (
            <TouchableWithoutFeedback onPress={()=>this.onPress()}>
                    <View style={styles.content_container}>
                        <Image style={styles.backgroundImg}
                               source={{uri:this.props.imgUrl}}>
                        <Text style={styles.desText}>{this.props.itemData.descText}</Text>
                        <Text style={styles.shopText}>
                            <Text style = {styles.shopdesText}>——来自</Text>
                            {this.props.itemData.shop}
                            <Text style = {styles.shopdesText}>的红包</Text>
                            </Text>
                        </Image>
                    </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    content_container: {
        backgroundColor: colors.white,
        marginTop: 10,
        marginBottom:0,
        marginLeft:12,
        marginRight:12,
        borderRadius: 8,
    },
    backgroundImg:{
        height:(ScreenUtils.width-24)*310/700.0,
        width:ScreenUtils.width-24,
    },


    desText: {
        // alignItems:'center',
        // justifyContent:'center',
        fontSize:16,
        marginLeft:100,
        marginTop:54 *(ScreenUtils.width/375.0),
        backgroundColor:'transparent',
        color:'#FBDEB0',
    },
    shopText:{
        marginLeft:100,
        marginTop:16,
        color:'#F2BE9A',
        fontSize:14,
        backgroundColor:'transparent',
    },
    shopdesText:{
        fontSize:12,
    }

})

export default RedPacketItemComponent