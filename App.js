import React, { Component } from 'react'; //react native(mobile)basiert auf react(libary)
import { 
  Alert, 
  Text, 
  Button, 
  Platform, 
  SaveAreaView, 
  StyleSheet, 
  View } from 'react-native'; //API & Componenten 
import * as SQLite from 'expo-sqlite';

import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

const database = SQLite.openDatabase('quotes.db');

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
    
    }
  
  _saveQuoteToDB(quotes){
  }
  //newQuote ausblenden
  _addQuote = (text, author) => {
    // TODO neues Zitat in der Datenbank abspeichern
    // Zitate aus State wernen einer variable zugewiesen
    //      statt let quotes = this.state.quotes;
    let { quotes } = this.state;
    if(author && text){
      // neues Zitat an ende der Liste anfügen (eigenschaft: wert) erzeuge objekt direkt bei methodenaufruf
      quotes.push({text, author});
    }
      // aktualisiere liste vorhandenes state erweitern mit eigenschaft quotes
      // newQuote ausblenden
      this.setState({
        index: quotes.length -1,
        showNewQuoteScreen: false, 
        quotes})
  }
  _displayNextQuote() {
    let {index, quotes} = this.state;
    let nextIndex = index + 1;
    if(nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }
  _displayLastQuote() {
    let {index, quotes} = this.state;
    let lastIndex = index - 1; 
    if(lastIndex === -1) lastIndex = quotes.length -1; //zu dem letzden Zitat in der Liste
    this.setState({ index: lastIndex })

  }
  _deleteButton(){
    Alert.alert('Zitat löschen?', 'Dies kann nicht rückgängig gemacht werden', 
    [
      { text:'Abbrechen', style:'cancel'}, //style für iOs
      { text: 'Löschen', style: 'destructive', onPress: ()=>{
        this._deleteQuote()
      }}
    ]);

  }
  _deleteQuote(){
    // Zitat aus datenbank löschen
    let {index, quotes} = this.state;
    //aktuelles zitat aus liste/ array löschen
    quotes.splice(index, 1);//aber wie funktioniert das mim local storage? ist das immer array zusammenhängend?
    //geändertes Zitat array ablegen und wieder an anfang der liste springen
    this.setState({ index: 0, quotes })
  }
  componentDidMount(){
    this._retrieveData();
  }

  render() {
    let {index, quotes} = this.state;
    const quote = quotes[index]; //data[0] = Dalai Lama
    //keine zitate vorhanden
    let content = <Text style={{fontSize:36}}>Keine Zitate</Text>;

    if (quote) {
      content = <Quote text ={quote.text} author={quote.author}/>;
    }
    
    return (
      <View style = {styles.container}>
         <StyledButton 
          style = { styles.deleteButton }
          visible={quotes.length >= 1}
          title = "Löschen" 
          onPress = {() => this._deleteButton()}
        />
        <StyledButton
          style={styles.newButton}
          title = "New" 
          visible={true}
          onPress = {() => this.setState({showNewQuoteScreen:true})}
          />
        <NewQuote 
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        {content}
        <StyledButton
          style={styles.nextButton}
          title = "Nächstes Zitat" 
          visible={quotes.length >= 2}
          onPress = {() => this._displayNextQuote()}
        />
        <StyledButton 
          style = { styles.lastButton }
          title = "Voriges Zitat" 
          visible={quotes.length >= 2}
          onPress = {() => this._displayLastQuote()}
        />
      </View>
    );
  }
}
function StyledButton(props){
  let button = null;
  if(props.visible) 
    button = (
      <View style={props.style}>
        <Button
          title={props.title}
          onPress={props.onPress}
        />
      </View>
    );
    return button;
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
    bottom: Platform.OS === 'ios' ? 20 : 25,
    right:30
  },
  lastButton: { 
    position:'absolute', 
    bottom: Platform.OS === 'ios' ? 20 : 25,
    left: 30
  },
  newButton: { 
    position: 'absolute', 
    top:90, 
    right:30
  },
  deleteButton: {
    position:'absolute',
    right: 30,
    top: 40,
    backgroundColor: 'yellow'  }
});
