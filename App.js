import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react' 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'

import Api from './src/services/api';

export default function App(){

  const[cep, setCep] = useState("") // CEP começa vazio
  const[logradouro, setLogradouro] = useState("") // rua começa vazio
  const[bairro, setBairro] = useState("") // bairro começa vazio
  const[localidade, setLocalidade] = useState("") // cidade começa vazio
  const[uf, setUf] = useState("") // Estado começa vazio

  // Botão de Buscar o CEP (função assíncrona pq vai buscar dados em um servidor e o app n pode parar por isso)
  async function buscarCep(){
    if(cep === ""){
      Alert.alert("Cep inválido.")
      setCep("")
    }
    try { // Para garantir uma segurança nos dados a serem buscados no servidor
      // response: armazena a resposta da api (await vai esperar a resposta do servidor)
      const response = await Api.get(`/${cep}/json/`) // método get vai buscar todos os dados do servidor
      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setLocalidade(response.data.localidade)
      setUf(response.data.uf)

    } catch (error) {
      console.log("Erro: " + error)

    }
  }
  
  return(
    <View style={styles.containerPrincipal}>
      <StatusBar style="auto" />
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>
      <View style={styles.containerCep}>
        <TextInput 
          style={{borderColor: "#000000", borderWidth: 2, width: 200, fontSize: 18, marginTop: 20, marginEnd: 20, padding: 10, borderRadius: 10}}
          value={cep}
          onChangeText={(texto)=>{setCep(texto)}} // vai receber o que for digitado e alterar o estado
          placeholder='cep'
        />

        <TouchableOpacity style={styles.botao} onPress={buscarCep}>
          <Text style={styles.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
          style={styles.caixasDeTexto}
          value={logradouro}
          onChangeText={(texto)=>{setLogradouro(texto)}}
          placeholder='logradouro'
      />
      <TextInput 
          style={styles.caixasDeTexto}
          value={bairro}
          onChangeText={(texto)=>{setBairro(texto)}}
          placeholder='bairro'
      />
      <TextInput 
          style={styles.caixasDeTexto}
          value={localidade}
          onChangeText={(texto)=>{setLocalidade(texto)}}
          placeholder='cidade'
      />
      <TextInput 
          style={{borderColor: "#000000", borderWidth: 2, width: 100, fontSize: 18, marginTop: 10, marginEnd: 20, padding: 10, borderRadius: 10, marginHorizontal: 20}}
          value={uf}
          onChangeText={(texto)=>{setUf(texto)}}
          placeholder='Estado'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  topBar:{
    flexDirection: "row",
    height: 70,
    backgroundColor: "#018786"
  },
  title:{
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
  },
  containerCep:{
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20,
    // backgroundColor: "yellow"
  },
  botao: {
    backgroundColor: "#018786",
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotaoBuscar: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: 'center'
  },
  caixasDeTexto: {
    borderColor: "#000000",
    borderWidth: 2,
    padding: 15,
    fontSize: 18, 
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20
  }
})