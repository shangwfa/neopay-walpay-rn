import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native'
import BasePage from './BasePage'
import DemoModal from '../modal/DemoModal'
import {events} from '../constants/index'

class ModalDemoPage extends BasePage {

    constructor(props) {
        super(props);
    }

    setModalVisible=()=>{
        DeviceEventEmitter.emit(events.MODAL_TYPE_EVENT,events.DEMO_MODAL_EVENT); //显示弹窗
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor='transparent' style={styles.buttonStyle} onPress={()=>this.setModalVisible()}>
                    <Text style={styles.buttonText}>
                        点击弹窗
                    </Text>
                </TouchableHighlight>
                <DemoModal/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ECECF0',
    },

    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
});

export default ModalDemoPage