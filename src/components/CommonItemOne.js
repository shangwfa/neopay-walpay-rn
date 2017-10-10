import React, {Component,PropTypes,} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import colors from '../constants/colors'
import Space from '../components/Space'
import right_arrow from '../res/img/right_arrow.png'

class CommonItemOne extends Component {
    static defaultProps = {
        onPress: ()=>{}
    }


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>this.props.onPress()}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <Space/>
                    <Text style={styles.title}>{this.props.value}</Text>
                    {this.arrowImg()}

                </View>
            </TouchableWithoutFeedback>
        )
    }

    arrowImg = () => {
        if (this.props.isShowArrow) {
            return <Image style={styles.img} source={right_arrow}/>
        } else {
            return null
        }
    }
    emptyPress=()=>{

    }
}

const styles = StyleSheet.create({
    img: {
        width: 10,
        height: 15,
        marginRight: 10
    },
    title: {
        fontSize: 15,
        color: colors.black,
        marginLeft: 10,
        marginRight: 10
    },
    container: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
});

export default CommonItemOne