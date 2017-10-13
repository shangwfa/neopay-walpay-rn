import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native'
import {events} from '../constants/index'
class DemoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener(events.DEMO_MODAL_EVENT, (ishow) => {
            this.setState({
                show:ishow
            })
        })
    }
    setModalVisible=()=>{
        this.setState({
            show:!this.state.show
        });
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.show}
                onShow={() => {}}
                onRequestClose={() => {}} >
                <View style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <Text style={styles.titleText}>
                            提示
                        </Text>
                        <Text style={styles.contentText}>
                            Modal显示的View 多行了超出一行了会怎么显示，就像这样显示了很多内容该怎么显示，看看效果
                        </Text>
                        <View style={styles.horizontalLine} />
                        <View style={styles.buttonView}>
                            <TouchableHighlight underlayColor='transparent'
                                                style={styles.buttonStyle}
                                                onPress={()=>this.setModalVisible()}>
                                <Text style={styles.buttonText}>
                                    取消
                                </Text>
                            </TouchableHighlight>
                            <View style={styles.verticalLine} />
                            <TouchableHighlight underlayColor='transparent'
                                                style={styles.buttonStyle}
                                                onPress={()=>this.setModalVisible()}>
                                <Text style={styles.buttonText}>
                                    确定
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    // modal的样式
    modalStyle: {
        backgroundColor:'#cccccc80',
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
    },
    // modal上子View的样式
    subView:{
        marginLeft:60,
        marginRight:60,
        backgroundColor:'#fff',
        alignSelf: 'stretch',
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#ccc',
    },
    // 标题
    titleText:{
        marginTop:10,
        marginBottom:5,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    // 内容
    contentText:{
        margin:8,
        fontSize:14,
        textAlign:'center',
    },
    // 水平的分割线
    horizontalLine:{
        marginTop:5,
        height:0.5,
        backgroundColor:'#ccc',
    },
    // 按钮
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle:{
        flex:1,
        height:44,
        alignItems: 'center',
        justifyContent:'center',
    },
    // 竖直的分割线
    verticalLine:{
        width:0.5,
        height:44,
        backgroundColor:'#ccc',
    },
    buttonText:{
        fontSize:16,
        color:'#3393F2',
        textAlign:'center',
    },
});

export default DemoModal