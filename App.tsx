import { useEffect, useState } from 'react';
import {Text, View, TextInput } from 'react-native';
import { Container } from './App.styles';
import axios from 'axios';

export default function App() {
const [cep, setCep] = useState('')
const [street, setStreet] = useState('')
const [number, setNumber] = useState('')
const [complement, setComplement] = useState('')
const [neighborhood, setNeighborhood] = useState('')
const [city, setCity] = useState('')
const [uf, setUf] = useState('')

const loadCep = async () => {
//validação de cep antes de fazer a chamada para api, principio EARLY RETURNS/GUARD CLAUSES 
  const isValidCep = cep.length === 8 
  if (!isValidCep) return null 

//o try só vai ocorrer caso o cep seja válido
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    setStreet(data.logradouro)
    setNeighborhood(data.bairro)
    setCity(data.localidade)
    setUf(data.uf)
  } catch(error){
    console.log(error)
  }
}

  useEffect(() => {
    loadCep()
  },[cep])

 return (
    <Container>
      <View>
        <Text>CEP:</Text>
        <TextInput
          value={cep}
          onChangeText={setCep}
        />
      </View>

      <View>
        <Text>Logradouro:</Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
          />
      </View>

      <View>
        <Text>Número:</Text>
          <TextInput 
            value={number}
            onChangeText={setNumber}
            />
        </View>

      <View>
        <Text>Complemento:</Text>
          <TextInput 
            value={complement}
            onChangeText={setComplement}
          />
      </View>
    
      <View>
        <Text>Bairro:</Text>
          <TextInput 
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
      </View>

      <View>
        <Text>Cidade:</Text>
          <TextInput
            value={city}
            onChangeText={setCity}
          />
      </View>

      <View>
        <Text>Estado:</Text>
          <TextInput 
            value={uf}
            onChangeText={setUf}
            />
      </View>
    </Container>
 );
}

