import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
export default function ProductsList({ data, deleteItem, editItem }){
  return(
<View style={styles.container}>
    <Text style={styles.text}>Nome: {data.nome}</Text>
    <Text style={styles.text}>Marca: {data.marca}</Text>
    <Text style={styles.text}>Preço: {data.preco}</Text>
    <View style={styles.item}>
        <TouchableOpacity onPress={()=> deleteItem(data.key)}>
        <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editItem(data)}>
        <Icon name="create" color="blue" size={20}>Editar</Icon>
        </TouchableOpacity>
    </View>
    
</View>

  )
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 1,
    marginBottom: 5,
    width:"95vw",
    padding: 10,
    backgroundColor: '#fff',
  },
  text:{
    color:'black',
    fontSize: 17
  },
  item: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around'
  }
});