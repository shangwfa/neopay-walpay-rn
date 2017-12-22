import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import {colors} from '../constants/index'


const ImageTitleButton = props => {
    const {
        value,
        backgroundColor,
        textColor,
        borderRadius,
        icon,
        ...attributes
    } = props

    const styles = StyleSheet.create({
        value:{
            color: textColor?textColor:colors.white,
            fontSize: 15,
        },
        container:{
            backgroundColor:colors.backgroundColor,
            height: 50,
            flexDirection:'row',
            justifyContent:'center',
            alignItems: 'center',
        },
        imgIcon:{
            marginRight:10,
            width:20,
            height:20,
        },
        bg_container:{
            flexDirection:'row',
            alignItems:'center'
        }
    });

    renderImage=()=>{
        if(icon == '')
        {
            return null;
        }else
        {
            console.log('<~~~~~>');
           return <Image style = {styles.imgIcon} source={icon}></Image>

        }
    }

    return (
        <TouchableOpacity {...attributes}>
            <View style={styles.container}>
                {this.renderImage()}
                <Text style={styles.value}>
                    {value}
                </Text>
            </View>
        </TouchableOpacity>
    );
};



export default ImageTitleButton