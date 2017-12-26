import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import ScreenUtils from '../utils/ScreenUtils'
import {RouterPaths} from '../constants/RouterPaths'


const sizeRatio = ScreenUtils.width/375.0;

class RedPacketRecordCell extends Component {

    static defaultProps = {
        cellType:true,
        isShowBtn:true
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
                            {this.props.cellType?'共收到'+this.props.count+'个红包':'共发出'+this.props.count+'个红包'}
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberViewRMB}>
                            {`¥ `}
                        </Text>
                        <Text style={styles.numberViewText}>
                            {this.props.amount}
                        </Text>
                    </View>
                    <View style={{flex:1}}/>
                    {this.renderView()}
                </Image>
            </View>
        );
    }

    renderView=()=>{
        if(this.props.isShowBtn){
            return  <View style={styles.bottomBtnView}>
                <TouchableWithoutFeedback onPress={()=>this.detailBtnClicked()}>
                    <View style={styles.bottomBtn}>
                        <Text style={styles.bottomBtnText}>
                            {this.props.cellType?'收到大红包明细':'发出大红包明细'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        }else {
            return null;
        }
    }
    detailBtnClicked=()=>{
        if(this.props.cellType){
            nav.navigate(RouterPaths.RED_PACKET_RECORD_LIST,{QueryType:2})
        }else{
            nav.navigate(RouterPaths.RED_PACKET_RECORD_LIST,{QueryType:1})
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
        marginLeft:13*sizeRatio,
        marginTop:20*sizeRatio,
        fontSize:15,
        color:'#FFFFFF',
    },
    numberView:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        marginTop:45*sizeRatio,
        backgroundColor:'transparent'
        // backgroundColor:'gray'
    },
    numberViewRMB:{
        fontSize:15,
        color:'#FFFFFF',
        marginBottom:3,
        // backgroundColor:'yellow'
    },
    numberViewText:{
        fontSize:27,
        color:'#FFFFFF',
        // backgroundColor:'red',
    },
    bottomBtnView:{
        alignItems:'center',
        marginBottom:28*sizeRatio,

    },
    bottomBtn:{
        height:28*sizeRatio,
        width:158*sizeRatio,
        borderRadius:14*sizeRatio,
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