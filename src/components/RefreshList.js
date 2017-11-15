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
import StringUtils from "../utils/StringUtils";
export const RefreshStatus = {
    IDLE: 'idle',
    END: 'end',
    ERROR: 'error'
}
const defaulePageSize = 10
class RefreshList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    errorReLoadPress = () => {
        this.onEndReached()
    }
    renderFooter = () => {
        switch (this.props.footerStatus) {
            case RefreshStatus.END:
                return (
                    <View style={styles.footer_container}>
                        <Text style={styles.footer_text}>我是有底线的</Text>
                    </View>
                )
                break
            case RefreshStatus.ERROR:
                return (
                    <TouchableOpacity onPress={() => this.errorReLoadPress()}>
                        <View style={styles.footer_container}>
                            <Text style={styles.footer_text}>加载失败，点击重新加载</Text>
                        </View>
                    </TouchableOpacity>

                )
                break
            default:
                return (
                    <View style={styles.footer_container}>
                        <ActivityIndicator size="small" color="#888888"/>
                        <Text style={styles.footer_text}>加载更多</Text>
                    </View>)
                break
        }

    }

    onEndReached = () => {
        if (StringUtils.equals(this.props.footerStatus, RefreshStatus.IDLE)) {
            let dataLength = this.props.data.length
            let curPage = dataLength % defaulePageSize ? (dataLength / defaulePageSize + 1) : (dataLength / defaulePageSize + 2)
            this.props.onLoadMore(curPage)
        }
    }

    render() {
        const {data, renderItem, onRefresh, extraData, ...attributes} = this.props
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