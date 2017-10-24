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
        if(this.props.callback){
            let filterData=''
            this.state.data.map(item=>{
                if(item.selected){
                    filterData+=(item.type+',')
                }
            })
            this.props.callback(filterData)
        }
    }
    renderItem = ({item}) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.onPress(item)}>
            <Text style={item.selected ? styles.button_selected : styles.button}>{item.name}</Text>
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
                    data={this.state.data}
                    renderItem={this.renderItem}
                    numColumns={4}
                    extraData={this.state}
                    keyExtractor={(item)=>item.index}
                />
                <View style={{height: 15}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button_selected: {
        width: 80,
        height: 34,
        color: colors.one_color,
        borderColor: colors.one_color,
        borderWidth: 0.5,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    button: {
        width: 80,
        height: 34,
        borderColor: colors.balck_more_light,
        borderWidth: 0.5,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
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
