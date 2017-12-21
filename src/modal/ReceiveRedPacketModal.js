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

class ReceiveRedPacketModal extends Component {

    constructor(props) {
        super(props);
        this.isGetAnimRef=false
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
                        <Animation
                            ref={animation => {
                                if(animation&&!this.isGetAnimRef){
                                    this.isGetAnimRef=true
                                    animation.play()
                                }
                            }}
                            style={{
                                width: 315,
                                height: 200,
                            }}
                            loop={true}
                            source={this.props.action}
                        />
                    </View>

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
    container: {
        width: 315,
        height: 200,
        backgroundColor: "#FFF",
        borderRadius: 5,
    }
});

export default ReceiveRedPacketModal