import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image
} from 'react-native';
import {colors} from '../constants/index'
import ScreenUtils from '../utils/ScreenUtils'
import searchIcon from '../res/img/search_icon.png'
import StringUtils from '../utils/StringUtils'

class SearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: ''
        }
    }

    onChangeText = (text) => {
        this.setState({inputText: text})
        this.props.onChangeText(text)
    }

    renderSearchIcon = () => {
        if (StringUtils.isEmpty(this.state.inputText)) {
            return <Image style={styles.search_icon} source={searchIcon}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                    placeholder={this.props.placeholder}
                    numberOfLines={1}
                    onChangeText={this.onChangeText}
                />
                {this.renderSearchIcon()}
            </View>
        );
    }

};

const styles = StyleSheet.create({
    search_icon: {
        position: 'absolute',
        top: 15,
        left: ScreenUtils.width / 2 - 51,
        width: 13,
        height: 13,

    },
    input: {
        height: 36,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom:5,
        backgroundColor: colors.white,
        borderRadius: 3,
        textAlign: 'center'
    },
    container: {
        backgroundColor:'#efefef'
    },
});

export default SearchComponent
