import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../constants/colors'

class MineTopView extends Component {

    static defaultProps = {
        onPress: () => {
        }
    }

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
                <View style={styles.container}>
                    <View style={styles.content_container}>
                        <Text style={styles.title}>我的头像</Text>
                        <View style={{flex: 1}}/>
                        <Image source={{uri: this.props.imgUrl}} style={styles.img}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )

    }
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        color: colors.black
    },
    img: {
        height: 50,
        width: 50,
        marginRight: 10,
        borderRadius: 25
    },
    divider: {
        backgroundColor: colors.divider
    },
    content_container: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.white,
        marginTop: 10
    },
});

export default MineTopView