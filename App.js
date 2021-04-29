import React, { Component } from 'react'; //react native(mobile)basiert auf react(libary)
import { Button, StyleSheet, View } from 'react-native'; //API & Componenten 

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

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
  state = { index: 0, showNewQuoteScreen: false };
  render() {
    let index = this.state.index;
    const quote = data[index]; //data[0] = Dalai Lama
    let nextIndex = index + 1;
    if(nextIndex === data.length) nextIndex = 0;
    let lastIndex = index - 1; 
    if(lastIndex === -1) lastIndex = data.length -1; //zu dem letzden Zitat in der Liste
    return (
      <View style = {styles.container}>
        <View style = { styles.new }>
          <Button 
            title = "New" 
            onPress = {() => this.setState({showNewQuoteScreen:true})}
            />
        </View>
        <NewQuote visible={this.state.showNewQuoteScreen}/>
        <Quote text = {quote.text} author={quote.author}/>
        <View style = {styles.nextButton}>
          <Button 
              title = "Nächstes Zitat" 
              onPress = {() => this.setState({ index: nextIndex })}
            />
        </View>
        <View style = { styles.lastButton }>
          <Button 
            title = "Voriges Zitat" 
            onPress = {() => this.setState({ index: lastIndex })}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',

  },
  nextButton: { position:'absolute', bottom:30 },
  lastButton: { position:'absolute', top: 40 },
  newButton: { position: 'absolute', top:30, right:0}
});
