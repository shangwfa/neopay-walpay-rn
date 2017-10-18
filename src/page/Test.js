import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import {colors} from '../constants/index'
import {Divider} from '../components/index'
import ScreenUtils from '../utils/ScreenUtils'

class CommonKeyValueItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.content_container}>

                </View>
                <Divider/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content_container: {
        height: 56,
        width: ScreenUtils.width
    },
    container: {
        backgroundColor: colors.white
    }
});

export default Co
