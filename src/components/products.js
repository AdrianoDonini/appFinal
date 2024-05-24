import { addDoc, collection, getDocs } from "firebase/firestore"; 
import db from "../services/firebase";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button, Pressable} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import ProductsList from "./productsList";

const Separator = () => {
  return <View style={StyleSheet.separator} />
}


export default function ProductManager(){
const [nome, setNome] = useState("");
const [descricao, setDescricao] = useState("");
const [marca, setMarca] = useState("");
const [preco, setPreco] = useState("");
const [products, setProducts] = useState([]);
const [loading, setLoading] =  useState(true);
let [telaCadastro, setTelaCadastro] = useState(false);
    async function Cadastrar(){
        try {
            const docRef = await addDoc(collection(db, "products"), {
              nome: nome,
              descricao: descricao,
              marca: marca,
              preco: preco
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    useEffect(() => {
        async function Listar(){
            console.log("Listar");
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
        const produtos = {
            key:doc.id,
            nome: doc.data().nome,
            descricao: doc.data().descricao,
            marca: doc.data().marca,
            preco: doc.data().preco

        }
        setProducts(oldArray => [...oldArray, produtos].reverse());
        });
        setLoading(false);
        console.log("Data Array"+dataArray);
        console.log("Products"+products);
        }
        Listar();
    }, []);
    return(
        telaCadastro ? 
        (

            <View style={styles.container}>

                <TextInput
                    placeholder="Nome do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setNome(texto)}
                    
                />
                <TextInput
                    placeholder="Descrição do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setDescricao(texto)}
                    
                />
                <TextInput
                    placeholder="Marca"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setMarca(texto)}
                    
                />
                <TextInput
                    placeholder="Preço"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setPreco(texto)}
                    
                />
                <Separator />
                    <TouchableOpacity onPress={Cadastrar} style={styles.button} activeOpacity={0.5}>
                        <Text style={styles.buttonTextStyle}>Cadastrar</Text>
                    </TouchableOpacity> 
            </View>
        )
            :
            (
                <View style={styles.listar}>
                    <Pressable onPress={setTelaCadastro(true)}>
                        <Text>Novo Produto</Text>
                    </Pressable>
                    <View style={styles.flatList}>
                            {loading ?
                                    (<ActivityIndicator color="#121212" size={45} />) :
                                    (<FlatList
                                            keyExtractor={item => item.key}
                                            data={products}
                                            renderItem={({ item }) => (
                                                    <ProductsList data={item} deleteItem={() => handleDeleteItem(item.key)}editItem={handleEdit}/>
                                            )}
                                        />
                                    )
                                }
                    </View>
                </View>
            )
    )
    
    
}
const styles = StyleSheet.create({

  button1: {
    padding: 10,
    backgroundColor: '#2196F3',
    color: 'white',
    borderRadius: 5,
  },
container: {
    flex: 1,
    margin: 0,
    backgroundColor:"#bbb",
},
input: {
    borderWidth: 1,
    height: 40,
    fontSize: 13,
    borderRadius: 12,
    margin: 5,
    backgroundColor:"white",
    border:"none",
},
separator: {
    marginVertical: 5,
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3838ed',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
},
buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
},
buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    width:"100%",
    fontSize: 20,
    textAlign: 'center',
},
buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 20,
},
lista: {
    fontSize: 20,
    textAlign: 'center',
    margin:10,
    
},
listar:{
    width:"100%",
    flex:1,
    flexDirection:"column",
    alignItems:"center",
},
flatList:{
    flex: 1,
    width:"90%",
    height:"auto",
    backgroundColor:"gray",
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10,
  },
}); 


