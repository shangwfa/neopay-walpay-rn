import React, {Component, PropTypes} from 'react';
import {
    TouchableOpacity,
} from 'react-native';

class MoreClickComponet extends Component {

    // 构造
    constructor(props) {
        super(props)
        // 初始状态
        this.state = {
            isDisable: false
        };
    }

    componentWillMount() {

    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }


    ToPress = async () => {
        const {onPress} = this.props;
        if(onPress){
            onPress && onPress();
            await this.setState({isDisable: true})
            this.timer = setTimeout(async () => {
                await this.setState({isDisable: false})
            }, 500)
        }
    }

    render() {
        const {onPress, ...attributes} = this.props
        return (
            <TouchableOpacity
                disabled={this.state.isDisable}
                onPress={this.ToPress} {...attributes}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

export default MoreClickComponet
