import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Api from './services/api';

export default class App extends Component {

  signIn = async () => {
    const response = await api.post('/auth/authenticate', {
      email: 'lauro@rocketseat.com.br',
      password: '123456',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.signIn} title='Entrar'></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
