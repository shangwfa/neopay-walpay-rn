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


class OneButtonModal extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}
                onRequestClose={() => {
                }}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <Text style={styles.text_content}>{this.props.content}</Text>
                        <View style={styles.line}/>
                        <TouchableOpacity style={{width: 316,}} onPress={this.props.onPress}>
                            <Text style={styles.btn}>{this.props.btnTitle}</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: colors.divider,
        height: 0.5,
        width: 316,
        marginTop: 30
    },
    btn: {
        fontSize: 13,
        color: colors.black,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    text_content: {
        fontSize: 13,
        color: colors.black,
        marginTop: 30,
        marginLeft: 16,
        marginRight: 16,
        textAlign: 'center',
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

export default OneButtonModal
