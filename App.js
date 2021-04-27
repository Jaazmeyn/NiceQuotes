import React, { Component } from 'react'; //react native(mobile)basiert auf react(libary)
import { StyleSheet, Text, View } from 'react-native'; //API & Componenten 

// klassen erweiterung
export default class App extends Component { //statt React.Component oben auch importieren App dateiname
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
