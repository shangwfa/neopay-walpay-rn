import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native'
import {colors} from '../constants/index'
import ScreenUtils from "../utils/ScreenUtils";


class TwoButtonModal extends Component {

    constructor(props) {
        super(props);
    }


    renderTitle=()=>{
        if(this.props.title){
            return <Text style={styles.title}>{this.props.title}</Text>
        }
    }
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}
                onRequestClose={()=>{}}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        {this.renderTitle()}
                        <Text style={styles.text_content}>{this.props.content}</Text>
                        <View style={styles.btns_container}>
                            <TouchableOpacity style={styles.btn_container} onPress={this.props.onePress}>
                                <Text style={styles.btn}>{this.props.oneBtnText}</Text>
                            </TouchableOpacity>
                            <View style={styles.line}/>
                            <TouchableOpacity style={styles.btn_container} onPress={this.props.twoPress}>
                                <Text style={styles.btn}>{this.props.twoBtnText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        color: colors.black,
        marginTop: 20,
    },
    line: {
        backgroundColor: colors.divider,
        height: 15,
        width: 0.5,
        // marginTop:20
    },
    btn: {
        // height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        // backgroundColor:'gray',
        alignItems:'center',
    },
    btn_container: {
        height:50,
        flex: 1,
        // backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
    },
    btns_container: {
        width: 316,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    text_content: {
        fontSize: 13,
        color: colors.black,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
    },
    container: {
        width: 316,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalStyle: {
        backgroundColor: colors.mask,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

});

export default TwoButtonModal
