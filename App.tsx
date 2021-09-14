import { StatusBar } from 'expo-status-bar'; 
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IDados {
  nome: string,
  email: string,
  telefone: string
}

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [cadastros, setCadastros] = useState<IDados[]>([]);

  useEffect(() => {
    async function loadData() {
      const storagedDados = await AsyncStorage.getItem('data');
      if (storagedDados) {
        setCadastros(JSON.parse(storagedDados));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('data', JSON.stringify(cadastros));
    }
    saveData();
  }, [cadastros]);

  function handlePress() {
    setCadastros([...cadastros, { nome, email, telefone }]);
    setNome("");
    setEmail("");
    setTelefone("");
  }

   function deletarCadastro(nome: string) {
    const i = cadastros.filter(i => i.nome !== nome);
    setCadastros(i);
  }

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title} >Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o nome"
          onChangeText={text => setNome(text)}
          defaultValue={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Informe o e-mail"
          onChangeText={text => setEmail(text)}
          defaultValue={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Informe o telefone"
          onChangeText={text => setTelefone(text)}
          defaultValue={telefone}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={cadastros}
          renderItem={({ item }) => {
            return (
              <View key={item.nome}>
                <Text onPress={() => { deletarCadastro(item.nome) }} >Nome: {item.nome}</Text>
                <Text >E-mail: {item.email}</Text>
                <Text >Telefone: {item.telefone}</Text>
              </View>
            )
          }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#191970'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 5
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderWidth: 0,
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  }
});[]
