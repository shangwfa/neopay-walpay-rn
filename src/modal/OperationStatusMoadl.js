import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Modal,
    Text,
    Image
} from 'react-native'
import colors from '../constants/colors'
class OperationStatusMoadl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <Image style={styles.icon} source={this.props.icon}/>
                        <Text style={styles.text}>{this.props.tip}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        marginTop:20,
        fontSize:18,
        color:colors.black
    },
    icon:{
        width:44,
        height:44,
        marginTop:30
    },
    container:{
        width:203,
        height:143,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        borderRadius:5
    },
    modalStyle: {
        backgroundColor:'#cccccc80',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },

});

export default OperationStatusMoadl
/*
* 弹窗：用于解绑成功，解绑失败
* */