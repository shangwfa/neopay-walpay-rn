import React from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import {colors} from '../constants/index'


const LoadMoreFooter = props => {
    const {
        isShow,
        isEnd,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        text:{
          fontSize:15,
          color:colors.black
        },
        container: {
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const renderView=()=>{
        if(isShow){
            if(isEnd){
                return <Text style={styles.text}> 正在加载更多...</Text>
            }else {
                return <Text style={styles.text}> 我是有底线的</Text>
            }
        }

    }
    return (
        <View style={styles.container} {...attributes}>
            {renderView()}
        </View>


    );
};


export default LoadMoreFooter