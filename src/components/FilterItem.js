import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    FlatList
} from 'react-native';
import {colors} from '../constants/index'
import ScreenUtils from "../utils/ScreenUtils";
import img_select_shape from "../res/img/img_selecte_shape.png"
import img_unselect_shape from "../res/img/img_unselecte_shape.png"
class FilterItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    onPress = (item) => {

        var items = this.state.data
        items[item.index].selected = !items[item.index].selected
        this.setState({
            data: items
        })
        if (this.props.callback) {
            let filterData = ''
            this.state.data.map(item => {
                if (item.selected) {
                    filterData += (item.type + ',')
                }
            })
            this.props.callback(filterData)
        }
    }
    renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={1} onPress={() => this.onPress(item)}>
            <Image style={styles.button_container} source={item.selected ? img_select_shape : img_unselect_shape}>
                <Text style={item.selected ? styles.button_selected : styles.button}>{item.name}</Text>
            </Image>
        </TouchableOpacity>

    )

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_container}>
                    <Image style={styles.title_icon} source={this.props.source}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={{height: 4}}/>
                <FlatList
                    style={{marginLeft: ScreenUtils.width / 25}}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    numColumns={4}
                    extraData={this.state}
                    keyExtractor={(item) => item.index}
                />
                <View style={{height: 15}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button_container: {
        width: (ScreenUtils.width / 25 * 5),
        height: 34,
        marginRight: (ScreenUtils.width / 25),
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "contain"
    },
    button_selected: {
        color: colors.one_color,
    },
    button: {
        color: colors.black_light,
    },
    title: {
        fontSize: 15,
        color: colors.black,
        marginLeft: 10
    },
    title_icon: {
        width: 22,
        height: 20,
        marginLeft: 10
    },
    title_container: {
        flexDirection: 'row',
        marginTop: 20,
    },
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
});

export default FilterItem
