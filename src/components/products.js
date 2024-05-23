import { addDoc, collection, getDocs } from "firebase/firestore"; 
import db from "../services/firebase";
import { Button, View,Text,StyleSheet } from 'react-native';

export default function ProductManager(){
    async function Cadastrar(){
        try {
            const docRef = await addDoc(collection(db, "products"), {
              nome: "Produto 1",
              descricao: "Primeiro Produto",
              marca: "Testa Tudo LDTA",
              preco: "150,00"
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    
    async function Listar(){
        console.log("Listar");
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
     
      console.log(doc.data);
      
    })
    }
    return(
        <View>
            <Button onPress={Cadastrar} title="Cadastrar"></Button>
            <Button onPress={Listar} title="Listar"></Button>

        </View>
    )
}


