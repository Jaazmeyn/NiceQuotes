import React, { Component } from 'react';
import { Button, TextInput, Modal, View, StyleSheet} from 'react-native';

export default class NewQuote extends Component {
    state = { content: null, author: null };

    render(){
        const { visible, onSave } = this.props;
        const { content, author } = this.state;
        //das erledigt der visible prop der Modal komponente
        // if(this.props.visible === false){
        //     return null;
        // }

        return (
            <Modal
                visible={visible}
                onRequestClose={()=>{
                    this.setState({content: null, author: null})
                    onSave(null, null); //d.h hier wird nichts gespeichert!
                }}//prop nur für android backbutton und AppleTv
                animationType="slide"
            >
                <View style={styles.container}>
                    <TextInput 
                        style = {[styles.input, { height: 150 }]} 
                        multiline={true}
                        placeholder="Inhalt des Zitats" 
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ content: text })}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Autor"  
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ author: text })}
                    />
                    <Button title="speichern" onPress={() => {
                        this.setState({content: null, author: null})
                        onSave(content, author);
                    }} />
                </View>
            </Modal>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:40
      },
      input: {
          borderWidth: 1,
          borderColor: 'deepskyblue',
          borderRadius: 4,
          width: '80%',
          marginBottom: 20,
          fontSize: 20,
          padding:10,
          height: 50
      }
});