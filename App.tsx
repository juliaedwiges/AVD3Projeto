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
                <Text >Nome: {item.nome}</Text>
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
    background: rgb(32,36,0),
    background: linear-gradient(90deg, rgba(32,36,0,1) 0%, rgba(9,121,103,0.45702030812324934) 36%, rgba(0,219,255,0.19931722689075626) 100%),
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: #191970
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
    background-color: #4CAF50,
     border: none,
    color: white,
    text-align: center,
    text-decoration: none,
     display: inline-block,
     font-size: 16px
  }
});
