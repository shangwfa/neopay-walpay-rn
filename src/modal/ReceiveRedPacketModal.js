/**
 * @author: carlos.guo
 * @data:  2017/11/7.
 * @description:
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, Modal,
} from 'react-native'
import img_get_red_packet_process from "../res/img/img_get_red_packet_process.gif"
import img_money from "../res/img/img_money.png"
class ReceiveRedPacketModal extends Component {
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
                    <Image
                        style={{width: 100, height: 100}}
                        source={img_get_red_packet_process}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: '#cccccc80',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default ReceiveRedPacketModal