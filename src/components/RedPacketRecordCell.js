import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import ScreenUtils from '../utils/ScreenUtils'


class RedPacketRecordCell extends Component {

    static defaultProps = {
        cellType:true,
        item:'10',
        num:'100.00',
    };

    constructor(props){
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImg} source={this.props.cellType?require('../res/img/HomePage/sy_shoudao.png'):require('../res/img/HomePage/sy_fachu.png')}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleViewText}>
                            {this.props.cellType?'共收到'+this.props.item+'个红包':'共发出'+this.props.item+'个红包'}
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberViewRMB}>
                            ¥
                        </Text>
                        <Text style={styles.numberViewText}>
                            {this.props.num}
                        </Text>
                    </View>
                    <View style={styles.bottomBtnView}>
                        <TouchableWithoutFeedback onPress={()=>this.detailBtnClicked()}>
                        <View style={styles.bottomBtn}>
                            <Text style={styles.bottomBtnText}>
                                {this.props.cellType?'收到大红包明细':'发出大红包明细'}
                            </Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Image>
            </View>
        );
    }

    detailBtnClicked=()=>{
        if(this.props.cellType){
            console.log('点击了收到大红包明细按钮')
        }else{
            console.log('点击了发出大红包明细按钮')
        }

    }

}

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        width:ScreenUtils.width,
        height:ScreenUtils.width*197.0/375.0,
    },
    backgroundImg:{
        width:ScreenUtils.width,
        height:ScreenUtils.width*197.0/375.0,
    },
    titleView:{
        backgroundColor:'transparent'
    },
    titleViewText:{
        marginLeft:13,
        marginTop:20,
        fontSize:15,
        color:'#FFFFFF',
    },
    numberView:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        marginTop:50,
        backgroundColor:'transparent'
    },
    numberViewRMB:{
        fontSize:15,
        color:'#FFFFFF',
    },
    numberViewText:{
        fontSize:27,
        color:'#FFFFFF',
    },
    bottomBtnView:{
        alignItems:'center',
        marginTop:35,
    },
    bottomBtn:{
        height:28,
        width:158,
        borderRadius:14,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
    },
    bottomBtnText:{
        color:'#F34646',
        fontSize:13,
    }


});

export default RedPacketRecordCell