import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Modal,
    Animated,
    Easing
} from 'react-native'
import loading_icon from '../res/img/loading_icon.png'

class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotateValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.startAnimation();
    }


    startAnimation = () => {
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            Animated.timing(this.state.rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
            }),
        ]).start(() => this.startAnimation());
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={true}
                onRequestClose={()=>{}}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <Animated.Image source={loading_icon}
                                        style={{
                                            width: 80, height: 80,
                                            transform: [
                                                {
                                                    rotateZ: this.state.rotateValue.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['0deg', '360deg'],
                                                    })
                                                },
                                            ]
                                        }}/>
                    </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:150,
        height:150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaaaaa80',
    },
    modalStyle: {
        backgroundColor: '#cccccc80',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

});

export default LoadingModal
