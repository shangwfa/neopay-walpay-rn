/**
 * @author: carlos.guo
 * @data:  2017/11/7.
 * @description:  拆红包--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, Modal, Animated
} from 'react-native'
import Animation from 'lottie-react-native'
import demo from '../data/data.json'
import CommonButton from "../components/CommonButton";
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
                    <Animation
                        ref={animation => {
                            if (this.props.isShow) {
                                animation.play();
                            }
                        }}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={demo}
                        loop={true}
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