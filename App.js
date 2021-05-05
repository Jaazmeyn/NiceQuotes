import React, { Component } from 'react'; //react native(mobile)basiert auf react(libary)
import { Button, Platform, SaveAreaView, StyleSheet, View } from 'react-native'; //API & Componenten 
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  state = { index: 0, showNewQuoteScreen: false, quotes: data };

  _retrieveData = async () => {
    //statt promise mit awayt syntaktisch wie synchronen ablauf umgeschrieben
    let value = await AsyncStorage.getItem('QUOTES');
      if(value != null){
        value = JSON.parse(value);
        this.setState({quotes: value});
      }
    }
  
  _storeData(Quotes){
    AsyncStorage.setItem('QUOTES', JSON.stringify(quotes)); //Asyncstorage ist textbasiert muss in 
  }
  //newQuote ausblenden
  _addQuote = (text, author) => {

    // aktuelle liste der Zitate aus State einer variable zuweisen
    //      statt let quotes = this.state.quotes;
    let { quotes } = this.state;
    if(author && text){
      // neues Zitat an ende der Liste anfügen (eigenschaft: wert) erzeuge objekt direkt bei methodenaufruf
      quotes.push({text, author});
      this._storeData(quotes)
    }
      // aktualisiere liste (this.setstate(..)) aber haben schon oben einen state also oben state erweitern mit eigenschaft quotes

      //newQuote ausblenden
      this.setState({showNewQuoteScreen: false, quotes})
  }
  render() {
    let {index, quotes} = this.state;
    const quote = quotes[index]; //data[0] = Dalai Lama
    let nextIndex = index + 1;
    if(nextIndex === quotes.length) nextIndex = 0;
    let lastIndex = index - 1; 
    if(lastIndex === -1) lastIndex = data.length -1; //zu dem letzden Zitat in der Liste
    return (
      <SaveAreaView style = {styles.container}>
        <View style = { styles.new }>
          <Button 
            title = "New" 
            onPress = {() => this.setState({showNewQuoteScreen:true})}
            />
        </View>
        <NewQuote 
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}/>
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
      </SaveAreaView>
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
  nextButton: { 
    position:'absolute', 
    bottom: Platform.OS === 'ios' ? 20 : 0,
  },
  lastButton: { 
    position:'absolute', 
    top: 40 
  },
  newButton: { 
    position: 'absolute', 
    top:30, 
    right:0
  }
});
