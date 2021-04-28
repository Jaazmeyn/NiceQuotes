import React, { Component } from 'react'; //react native(mobile)basiert auf react(libary)
import { Button, StyleSheet, Text, View } from 'react-native'; //API & Componenten 

const data = [
  {
    text:
      'Be kind whenever possible. It is always possible.',
    author: 
      'Dalai Lama'
  },
  {
    text:
      'text2',
    author: 
      'author2'
  },
  {
    text:
      'text3',
    author: 
      'author3'
  },
]
// klassen erweiterung
export default class App extends Component { //statt React.Component oben auch importieren App dateiname
  state = { index: 0 };
  render() {
    let index = this.state.index;
    const quote = data[index]; //data[0] = Dalai Lama
    let nextIndex = index + 1;
    if(nextIndex === data.length) nextIndex = 0;
    let lastIndex = index - 1; 
    if(lastIndex === -1) lastIndex = data.length -1; //zu dem letzden Zitat in der Liste
    return (
      <View style={styles.container}>
        <Text>{quote.author}</Text>
        <Text>--{quote.text}</Text>
        <Button 
          title="Nächstes Zitat" 
          onPress = {() => this.setState({ index: nextIndex })}
          />
          <Button 
          title="Voriges Zitat" 
          onPress = {() => this.setState({ index: lastIndex })}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
