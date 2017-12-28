import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Modal,
    Animated,
    Image,
    Text,
    Easing
} from 'react-native'
import loading_icon from '../res/img/loading_icon.png'

class ImageTitleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow:this.props.isShow
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isShow:nextProps.isShow
        })
    }

    componentDidMount() {

    }


    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.isShow}
                onShow={() => {
                    setTimeout(()=>{
                        this.setState({
                            isShow:false
                        })
                    },1000)
                }}
                onRequestClose={()=>{}}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <Image style={styles.imageStyle} source = {require("../res/img/emptyBankCard_img.png")}>

                        </Image>
                        <Text style={styles.textStyle}>xxxxxx</Text>
                    </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:200,
        height:200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    modalStyle: {
        backgroundColor: '#cccccc80',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    imageStyle: {
        width:80,
        height:80,
    },
    textStyle: {
        marginTop:20,
        color:'#000000'
    },

});

export default ImageTitleModal