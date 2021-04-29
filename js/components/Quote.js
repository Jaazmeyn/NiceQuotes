import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Quote(props){
    const { text, author} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.author}>– { author }</Text>
            <Text style={styles.text}>{ text }</Text>
        </View>
    );
}
// const style = { fontSize: 36, fontStyle: 'italic'};
// const style2 = {fontSize: 20};


const styles = StyleSheet.create({
    container : {
        paddingHorizontal: 40,
        backgroundColor: 'white',
        borderRadius:4,
        margin:5,
        padding: 5,

        //Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2, //erhöhung nur für android

        //iOs
        shadowOpacity:0.25,
        shadowOffset: {
            width: 0,
            height: 0.75,
        },
        shadowRadius: 1.5,
    },
    text: {
        fontSize: 36, 
        fontStyle: 'italic',
        margin:10
    },
    author: {
        fontSize: 20,
        textAlign:'right'
    }
});