
import { ImageBackground,StyleSheet,View,Text,TouchableOpacity,Image,FlatList, ScrollView} from 'react-native';
import {NativeBaseProvider,HStack,Stack,VStack} from "native-base";
import {useEffect, useState} from 'react';
import{onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase.js";
import {db} from "../firebase.js";
import { collection, doc,getDoc,query,where,getDocs, updateDoc,addDoc  } from "firebase/firestore";

export default function TransferDetails({route,navigation }){
  const[getAmount,setAmount] = useState('');
  const[getTitle,setTitle] = useState('');
  const[getReceiver,setReceiver] = useState('');
  const[getSender,setSender] = useState('');
  const[getDateOfOperation,setDateOfOperation] = useState('');
  const[getDateOfReckoning,setDateOfReckoning] = useState('');
  const[getType,setType] = useState('');
  const[getToWhoName,setToWhoName] = useState('');
  const[getFromWhoName,setFromWhoName] = useState('');
  const[userData,setUserData] = useState(-1);
  const[getTransferAccount,setTransferAccount] = useState(-1);

  //console.log(route.params.transferId);


  /*onAuthStateChanged(auth, (user) => {
    if (user) 
    {
      setUserData(user.email);
      
    } 
    else {
      // User is signed out
      // ...
    }  

  });*/
  useEffect(()=>{
    //if(userData!=-1)
    //{
      const docRef = doc(db,"transfers",route.params.transferId);
      getDoc(docRef).then(docSnap=>{
      if (docSnap.exists()) {
          setTitle(docSnap.data().title)
          setAmount(docSnap.data().amount)
          setSender(docSnap.data().fromAccount)
          setReceiver(docSnap.data().toAccount)
          setDateOfOperation(docSnap.data().operationDate)
          setDateOfReckoning(docSnap.data().postingDate)
          setType(docSnap.data().type)
          setToWhoName(docSnap.data().toName)
          setFromWhoName(docSnap.data().fromName)
          //console.log(docSnap.data());
      }
      },[]);  
/*

      const q = query(collection(db,"transfers"),where("fromAccount","==",userData));
    getDocs(q).then(querySnapshot=>{
        const tmpTab = [];
        querySnapshot.forEach((doc) => {
              tmpTab.push({ key: doc.id, value: accountElement(doc.data().name,doc.data().money,doc.id)});
        });
        setAccountList(tmpTab);
    });




      const docRef = doc(db,"transfers",userData);
      getDoc(docRef).then(docSnap=>{
      if (docSnap.exists()) {
          setTitle(docSnap.data().title)
          setAmount(docSnap.data().amount)
          setSender(docSnap.data().fromAccount)
          setReceiver(docSnap.data().toAccount)
          setDateOfOperation(docSnap.data().operationDate)
          setDateofReckoning(docSnap.data().postingDate)
          setType(docSnap.data().type)
      }
      });*/  
   // }
  },[userData])

    return (
            
            <View style={styles.container}>
                <NativeBaseProvider>
                    <ImageBackground 
                      source={require('../assets/euro.jpg')} 
                      style={styles.image}>
                    <View style={styles.backElement}>
                        <Text style={styles.header}>Szczegóły przelewu</Text>
                        <ScrollView>
                          <VStack space={4} style={styles.vstack}>
                            <Text style={styles.vitem}>Tytuł: {getTitle}</Text>
                            <Text style={styles.vitem}>Kwota: {getAmount}</Text>
                            <Text style={styles.vitem}>Nadawca: {getFromWhoName} || Nr: {getSender}</Text>
                            <Text style={styles.vitem}>Odbiorca: {getToWhoName} || Nr: {getReceiver}</Text>
                            <Text style={styles.vitem}>Data operacji: {getDateOfOperation}</Text>
                            <Text style={styles.vitem}>Data rozliczenia: {getDateOfReckoning}</Text>
                            <Text style={styles.vitem}>Typ transakcji: {getType}</Text>
                          </VStack>
                        </ScrollView>
                    </View>
                    </ImageBackground>  
                </NativeBaseProvider>
              </View>
              
      );
}

const styles = StyleSheet.create({
  
  image: {
      width: '100%',
      height: '100%'
  },
  backElement:{
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: "40%",
    height: "90%",
    borderTopLeftRadius: 38,
    borderTopRightRadius:38,
    position: "absolute",
    
    bottom: 0,
    
  },
  content:{

    marginTop: "10%"
  },
  header:{
    color: "#D45500",
    fontWeight: "bold",
    fontSize: 32,
    padding: "10%"
  },
  container: {
    flex: 1,
    
  },
  vitem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
