import React, {Component} from 'react';
import { Button, TextInput} from 'react-native';

export default class NewQuote extends Component {
    render(){
        if(this.props.visible === false){
            return null;
        }
        return <Button title="speichern" onPress={()=> alert('OK')} />
    }
}