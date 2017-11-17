import React, {Component} from 'react'
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import {events} from '../constants/index'
export const RefreshStatus = {
    IDLE: 'idle',
    END: 'end',
    ERROR: 'error'
}
const defaulePageSize = 10

class RefreshList extends Component {
    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props)
        this.state={
            isError:false
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener(events.REFRESH_LIST_EVENY, (value) => {
            this.setState({isError:true})
        })
    }

    errorReLoadPress = () => {
        this.setState({isError:false})
        this.onEndReached()
    }
    isEnd=()=>{
        return this.props.data.length% defaulePageSize != 0
    }

    isNoraml=()=>{
        return !this.isEnd()
    }

    renderFooter = () => {
        if(this.state.isError){
            return (
                <TouchableOpacity onPress={() => this.errorReLoadPress()}>
                    <View style={styles.footer_container}>
                        <Text style={styles.footer_text}>加载失败，点击重新加载</Text>
                    </View>
                </TouchableOpacity>

            )
        }else {
            if (this.isEnd()) {
                return (
                    <View style={styles.footer_container}>
                        <Text style={styles.footer_text}>我是有底线的</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.footer_container}>
                        <ActivityIndicator size="small" color="#888888"/>
                        <Text style={styles.footer_text}>加载更多</Text>
                    </View>)
            }
        }
    }

    onEndReached = () => {
        if ((!this.state.isError)&&this.isNoraml()) {
            let dataLength = this.props.data.length
            let curPage = dataLength % defaulePageSize ? (parseInt(dataLength / defaulePageSize + 1)) : parseInt((dataLength / defaulePageSize + 2))
            this.props.onLoadMore(curPage)
        }
    }


    render() {
        const {data, renderItem, onRefresh, extraData, ...attributes} = this.props
        if (data.length > 0) {
            return (
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    onRefresh={onRefresh}
                    onEndReached={this.onEndReached}
                    extraData={extraData}
                    refreshing={false}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                    keyExtractor={(item, index) => {
                        return index
                    }}
                    {...attributes}
                />
            )
        } else {
            return null
        }

    }
}

const styles = StyleSheet.create({
    footer_text: {
        fontSize: 14,
        color: '#555555',
        marginLeft: 10
    },
    footer_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    container: {},
})

RefreshList.propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
    onRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
}


export default RefreshList