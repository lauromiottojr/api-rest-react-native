import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, AsyncStorage, Alert } from 'react-native';
import Api from './services/api';
import api from './services/api';

export default class App extends Component {

  state = {
    loggedInUser: null,
    errorMessage: null,
    projects: [],
  };

  signIn = async () => {
    try {
      const response = await Api.post('/api/products', {
        title: 'ReactJS',
        description: 'Bibliote para aplicações interativas JS',
      });
      const { user, token } = response.data;
      await AsyncStorage.multiSet([
        ['@CodeApi: token', token],
        ['@CodeApi: user', JSON.stringify(user)], // converte o objecto em string
      ]);
      this.setState({ loggedInUser: user });
      Alert.alert('Login efetuado com sucesso!');
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  getProjectList = async () => {
    try {
      const response = await api.get('/projects');
      const { projects } = response.data;
      this.setState({ projects });
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@CodeApi: token');
    const user = JSON.parse(await AsyncStorage.getItem('@CodeApi: user'));

    if (token && user)
      this.setState({ loggedInUser: user });
  }

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        {!!this.state.loggedInUser && <Text>{this.state.loggedInUser.name}</Text>}
        {this.state.loggedInUser
          ? <Button onPress={this.getProjectList} title='Carregar Projetos' />
          : <Button onPress={this.signIn} title='Entrar' />
        }
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
