import { addDoc, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import db from "../services/firebase";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, Button, Pressable} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import ProductsList from "./productsList";
import { Dialog } from 'react-native-simple-dialogs';


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
const [telaListar, setTelaListar] = useState(true);
const [key, setKey] = useState('');
const [toEdit, setToEdit] = useState(false);
const [keytoDelet ,setKeytoDelet] = useState('');
const [showDialog,setShowDialog] = useState(false);
    async function Cadastrar(){
        try {
            const docRef = await addDoc(collection(db, "products"), {
              nome: nome,
              descricao: descricao,
              marca: marca,
              preco: preco
            });
            clearData();
            
            setProducts(prevProducts => [{
                key: docRef.id,
                nome: nome,
                descricao: descricao,
                marca: marca,
                preco: preco
            }, ...prevProducts]);

       
            await Listar();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setTelaListar(true);
    }

async function Editar(){
    console.log(nome);
    console.log(descricao);
    console.log(marca);
    console.log(preco);
    
    try {
        const docRef = doc(db, "products", key) 
        await setDoc(docRef, {
                nome:nome,
                descricao: descricao,
                marca: marca,
                preco: preco
            });
            clearData();


            const index = products.indexOf(docRef.id);
            products.splice(index, 1);
            setProducts(prevProducts => [{
                key: docRef.id,
                nome: nome,
                descricao: descricao,
                marca: marca,
                preco: preco
            }, ...prevProducts]);

       
            await Listar();
        
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setTelaListar(true);
}

function clearData(){
    setNome("");
    setDescricao("");
    setMarca("");
    setPreco("");
}

function handleIdit(data) {
    setToEdit(true);
    setTelaListar(false);
    setKey(data.key);
    setNome(data.nome);
    setDescricao(data.descricao);
    setMarca(data.marca);
    setPreco(data.preco);
}
    const Listar = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "products"));
        const produtos = [];
        querySnapshot.forEach((doc) => {
            produtos.push({
                key: doc.id,
                nome: doc.data().nome,
                descricao: doc.data().descricao,
                marca: doc.data().marca,
                preco: doc.data().preco
            });
        });
        setProducts(produtos.reverse());
        setLoading(false);
    };

    useEffect(() => {
        Listar();
    }, []);

    // função para setar o id que vai ser deletado e mostrar o dialogo de confirmação
const handleDeleteItem = (key) => {
    setKeytoDelet(key)
    setShowDialog(true); 
  };
      //função para excluir um item 
async function handleDelete(keytoDelet) {
    await deleteDoc(doc(db, "products", keytoDelet));
      setShowDialog(false);
      setKeytoDelet(""); 
  }

    return (
        telaListar ? ( <View style={styles.listar}>
                <Pressable onPress={() => setTelaListar(false)}>
                    <Text>Novo Produto</Text>
                </Pressable>
                <View style={styles.flatList}>
                        {loading ?
                                (<ActivityIndicator color="#121212" size={45} />) :
                                (<FlatList
                                        keyExtractor={item => item.key}
                                        data={products}
                                        renderItem={({ item }) => (
                                                <ProductsList data={item}  editItem={() => handleIdit(item)} deleteItem={() => handleDeleteItem(item.key)}/>//deleteItem={() => handleDeleteItem(item.key)}editItem={handleEdit}/>
                                        )}
                                    />
                                )
                            }
                </View>
                    <Dialog
                    visible={showDialog}
                    onTouchOutside={() => setShowDialog(false)}
                    title="Confirmar Exclusão"
                    animationType="fade"
                    contentStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                    
                        <View>
                            <Text>Deseja realmente excluir este item?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <Button title="Cancelar" onPress={() => setShowDialog(false)} />
                            <Button title="Confirmar" onPress={() => {handleDelete(keytoDelet)}} />
                            </View>
                        
                    </View>
                </Dialog>
                        </View>) : ( <View style={styles.container}>

                <TextInput
                    placeholder="Nome do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setNome(texto)}
                    value={nome}
                />
                <TextInput
                    placeholder="Descrição do Produto"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={100}
                    style={styles.input}
                    onChangeText={(texto) => setDescricao(texto)}
                    value={descricao}
                />
                <TextInput
                    placeholder="Marca"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setMarca(texto)}
                    value={marca}
                />
                <TextInput
                    placeholder="Preço"
                    left={<TextInput.Icon icon="book-open" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={(texto) => setPreco(texto)}
                    value={preco}
                />
                <Separator />
                {toEdit ? (
                    <TouchableOpacity onPress={Editar} style={styles.button} activeOpacity={0.5}>
                        <Text style={styles.buttonTextStyle}>Salvar</Text>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={Cadastrar} style={styles.button} activeOpacity={0.5}>
                        <Text style={styles.buttonTextStyle}>Cadastrar</Text>
                    </TouchableOpacity>
                )}
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
    width:"100%",
    height:"auto",
    alignItems:"center",
    justifyContent:"center",
  },
}); 


