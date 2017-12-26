import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native'
import colors from '../constants/colors'
import CommonItemThree from '../components/CommonItemThree'

class TwoBottomItemModal extends Component {

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
                visible={this.props.isShow}
                onRequestClose={()=>{}}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <CommonItemThree title={this.props.oneItemTitle} onPress={this.props.ensure} isShowArrow={false}/>
                        <View style={{height:10}}/>
                        <CommonItemThree title={this.props.twoItemTitle} onPress={this.props.close} isShowArrow={false}/>
                    </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    modalStyle: {
        backgroundColor:colors.mask,
        alignItems: 'center',
        justifyContent:'flex-end',
        flex:1,
    },

});

export default TwoBottomItemModal
