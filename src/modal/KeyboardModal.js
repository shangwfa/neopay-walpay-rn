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


class KeyboardModal extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <View style={styles.number_container}>

                        </View>
                        <View style={styles.special_key_container}>

                        </View>
                    </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    special_key_container: {
        flex: 1,
        backgroundColor: 'blue'
    },
    number_container: {
        flex: 3,
        backgroundColor: 'yellow'
    },
    container:{
        height: 216,
        backgroundColor: colors.white,
        flexDirection: 'row',
    },
    modalStyle: {
        alignItems: 'center',
        justifyContent:'flex-end',
        flex:1,
    },

});

export default KeyboardModal
